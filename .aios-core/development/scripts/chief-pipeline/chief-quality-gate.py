#!/usr/bin/env python3
"""
Chief Quality Gate — Hybrid Validator Engine
=============================================
Generic quality gate engine for squad chief pipelines.
Validates specialist output against JSON schemas + custom validators.

Usage:
    python chief-quality-gate.py --chief copy --phase diagnosis --file outputs/chief/slug/00-diagnosis.md
    python chief-quality-gate.py --chief copy --phase audit --file outputs/chief/slug/02-audit.md
    python chief-quality-gate.py --list-phases --chief copy

Structure:
    .aios-core/development/scripts/chief-pipeline/
    ├── chief-quality-gate.py      ← this file (generic engine)
    ├── schemas/                   ← declarative JSON schemas per chief
    │   └── copy-chief.json
    └── validators/                ← custom Python validators per chief
        └── copy_validators.py
"""

import argparse
import importlib.util
import json
import re
import sys
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
SCHEMAS_DIR = SCRIPT_DIR / "schemas"
VALIDATORS_DIR = SCRIPT_DIR / "validators"


def load_schema(chief_name: str) -> dict:
    """Load JSON schema for a chief."""
    schema_path = SCHEMAS_DIR / f"{chief_name}.json"
    if not schema_path.exists():
        print(f"⚠️  No schema found for '{chief_name}' at {schema_path}")
        return {}
    with open(schema_path, "r", encoding="utf-8") as f:
        return json.load(f)


def load_custom_validator(chief_name: str):
    """Dynamically load custom validator module if it exists."""
    validator_name = chief_name.replace("-", "_") + "_validators"
    validator_path = VALIDATORS_DIR / f"{validator_name}.py"
    if not validator_path.exists():
        return None
    spec = importlib.util.spec_from_file_location(validator_name, validator_path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def validate_generic(content: str, phase_schema: dict) -> list[str]:
    """Run generic validations from JSON schema."""
    errors = []

    # Required fields check
    for field in phase_schema.get("required_fields", []):
        field_variants = [
            field,
            field.replace("_", " "),
            field.replace("_", "-"),
            field.title().replace("_", " "),
        ]
        found = any(v.lower() in content.lower() for v in field_variants)
        if not found:
            errors.append(f"Missing required field: '{field}'")

    # Required sections check
    for section in phase_schema.get("required_sections", []):
        patterns = [
            rf"^#+\s*{re.escape(section)}",  # markdown header
            rf"^\*\*{re.escape(section)}\*\*",  # bold
            rf"^{re.escape(section)}:",  # label
        ]
        found = any(
            re.search(p, content, re.MULTILINE | re.IGNORECASE) for p in patterns
        )
        if not found:
            errors.append(f"Missing required section: '{section}'")

    # Minimum word count
    min_words = phase_schema.get("min_words")
    if min_words:
        word_count = len(content.split())
        if word_count < min_words:
            errors.append(
                f"Content too short: {word_count} words (minimum: {min_words})"
            )

    # Maximum word count
    max_words = phase_schema.get("max_words")
    if max_words:
        word_count = len(content.split())
        if word_count > max_words:
            errors.append(
                f"Content too long: {word_count} words (maximum: {max_words})"
            )

    # Forbidden patterns
    for pattern in phase_schema.get("forbidden_patterns", []):
        if re.search(pattern, content, re.IGNORECASE):
            errors.append(f"Forbidden pattern found: '{pattern}'")

    # Score thresholds
    for threshold in phase_schema.get("score_thresholds", []):
        field_name = threshold["field"]
        min_value = threshold["min"]
        # Try to find score in content
        score_patterns = [
            rf"{re.escape(field_name)}[:\s]*(\d+(?:\.\d+)?)",
            rf"(\d+(?:\.\d+)?)\s*/\s*\d+.*{re.escape(field_name)}",
        ]
        for sp in score_patterns:
            match = re.search(sp, content, re.IGNORECASE)
            if match:
                score = float(match.group(1))
                if score < min_value:
                    errors.append(
                        f"Score '{field_name}' is {score}, minimum required: {min_value}"
                    )
                break

    # Allowed values check
    for constraint in phase_schema.get("allowed_values", []):
        field_name = constraint["field"]
        allowed = constraint["values"]
        pattern = rf"{re.escape(field_name)}[:\s]*[\"']?(\w[\w\s]*\w)[\"']?"
        match = re.search(pattern, content, re.IGNORECASE)
        if match:
            value = match.group(1).strip()
            if not any(v.lower() == value.lower() for v in allowed):
                errors.append(
                    f"Invalid value for '{field_name}': '{value}'. Allowed: {allowed}"
                )

    return errors


def run_custom_validation(
    validator_module, phase: str, content: str, filepath: str
) -> list[str]:
    """Run custom validators if they exist."""
    if validator_module is None:
        return []

    # Look for validate_{phase} function
    func_name = f"validate_{phase.replace('-', '_')}"
    if hasattr(validator_module, func_name):
        func = getattr(validator_module, func_name)
        return func(content, filepath)

    # Fallback: look for validate_all
    if hasattr(validator_module, "validate_all"):
        return validator_module.validate_all(phase, content, filepath)

    return []


def list_phases(schema: dict) -> None:
    """List all phases defined in a schema."""
    phases = schema.get("phases", {})
    if not phases:
        print("No phases defined in schema.")
        return

    chief_name = schema.get("chief_name", "Unknown")
    print(f"\n📋 Phases for {chief_name}:")
    print(f"{'─' * 50}")
    for phase_name, phase_config in phases.items():
        desc = phase_config.get("description", "No description")
        specialist = phase_config.get("specialist", "—")
        print(f"  {phase_name:<20} │ {specialist:<20} │ {desc}")
    print()


def main():
    parser = argparse.ArgumentParser(
        description="Chief Quality Gate — Hybrid Validator Engine",
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument("--chief", required=True, help="Chief name (e.g., copy, cyber)")
    parser.add_argument("--phase", help="Phase to validate (e.g., diagnosis, audit)")
    parser.add_argument("--file", help="Path to output file to validate")
    parser.add_argument(
        "--list-phases", action="store_true", help="List all phases for a chief"
    )
    parser.add_argument(
        "--strict",
        action="store_true",
        help="Exit with error code on any validation failure",
    )

    args = parser.parse_args()

    # Normalize chief name
    chief_name = args.chief.replace("_", "-")
    if not chief_name.endswith("-chief"):
        chief_name += "-chief"

    # Load schema
    schema = load_schema(chief_name)

    # List phases mode
    if args.list_phases:
        list_phases(schema)
        return

    # Validation mode
    if not args.phase or not args.file:
        parser.error("--phase and --file are required for validation")

    filepath = Path(args.file)
    if not filepath.exists():
        print(f"❌ File not found: {filepath}")
        sys.exit(1)

    content = filepath.read_text(encoding="utf-8")
    phase_schema = schema.get("phases", {}).get(args.phase, {})

    if not phase_schema:
        print(f"⚠️  No schema defined for phase '{args.phase}' in {chief_name}")
        print("  Running custom validators only...")

    # Run generic validation
    errors = validate_generic(content, phase_schema)

    # Run custom validation
    validator = load_custom_validator(chief_name)
    custom_errors = run_custom_validation(validator, args.phase, content, str(filepath))
    errors.extend(custom_errors)

    # Report
    phase_display = f"{chief_name}/{args.phase}"
    if errors:
        print(f"\n❌ GATE FAILED for {phase_display} ({len(errors)} issues):")
        for i, err in enumerate(errors, 1):
            print(f"  {i}. {err}")
        print()
        if args.strict:
            sys.exit(1)
        sys.exit(1)
    else:
        print(f"\n✅ GATE PASSED: {phase_display}")
        word_count = len(content.split())
        print(f"   File: {filepath.name} ({word_count} words)")
        print()
        sys.exit(0)


if __name__ == "__main__":
    main()
