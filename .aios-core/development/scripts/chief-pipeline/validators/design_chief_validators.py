"""
Design Chief Custom Validators
=================================
Specific validation logic for Design Chief pipeline phases.
Ensures design decisions are grounded in strategy and include proper specs.
"""

import re

# Known design frameworks by specialist
DESIGN_FRAMEWORKS = {
    "marty-neumeier": ["Brand Gap", "Zag", "Brand Flip", "Five Disciplines"],
    "dave-malouf": ["DesignOps", "Design at Scale", "Design Maturity"],
    "chris-do": ["Value-Based Pricing", "Price Creativity"],
    "paddy-galloway": ["CTR", "Thumbnail", "YouTube Strategy"],
    "joe-mcnally": ["Lighting", "Flash", "Portrait", "Hot Shoe Diaries"],
    "brad-frost": ["Atomic Design", "Design Tokens", "Design System"],
    "aaron-draplin": ["Logo", "Brand Mark", "Thick Lines"],
    "peter-mckinnon": ["Lightroom", "Preset", "Color Grading", "Editing"],
}

# Design deliverable types that should have specs
DELIVERABLE_TYPES = [
    "logo", "brand", "design system", "thumbnail", "photography",
    "mockup", "wireframe", "prototype", "component", "token",
    "color palette", "typography", "icon", "illustration",
]


def validate_strategy(content: str, filepath: str) -> list[str]:
    """Validate strategy phase — must ground design in business context."""
    errors = []

    # Check for business/brand context
    context_patterns = [
        r"(?i)(?:target audience|público.?alvo|persona|user)",
        r"(?i)(?:competitor|concorrente|market|mercado)",
        r"(?i)(?:brand|marca|posicionamento|positioning)",
        r"(?i)(?:objective|objetivo|goal|meta)",
    ]
    context_found = sum(1 for p in context_patterns if re.search(p, content))
    if context_found < 2:
        errors.append(
            "Strategy should include business context: "
            "target audience, competitors, brand positioning, or objectives"
        )

    # Check for framework reference
    all_frameworks = []
    for fw_list in DESIGN_FRAMEWORKS.values():
        all_frameworks.extend(fw_list)
    fw_found = [fw for fw in all_frameworks if fw.lower() in content.lower()]
    if len(fw_found) == 0:
        errors.append(
            "Strategy should reference at least one design framework "
            "(Atomic Design, Brand Gap, Zag, DesignOps, etc.)"
        )

    return errors


def validate_execution(content: str, filepath: str) -> list[str]:
    """Validate execution phase — must have concrete deliverables."""
    errors = []

    # Check for concrete specifications
    spec_patterns = [
        r"(?i)(?:dimension|dimensão|size|tamanho|px|rem|em)\s*[:=]?\s*\d",
        r"(?i)(?:color|cor|hex|rgb|hsl)\s*[:=]?\s*[#(]",
        r"(?i)(?:font|fonte|typeface|tipografia)\s*[:=]?\s*\w",
        r"(?i)(?:spacing|espaçamento|padding|margin)\s*[:=]?\s*\d",
    ]
    spec_found = sum(1 for p in spec_patterns if re.search(p, content))
    if spec_found == 0:
        errors.append(
            "Execution should include concrete specifications "
            "(dimensions, colors, fonts, spacing, etc.)"
        )

    # Check for deliverable list
    deliverable_found = [
        d for d in DELIVERABLE_TYPES if d.lower() in content.lower()
    ]
    if len(deliverable_found) == 0:
        errors.append(
            "Execution should identify specific deliverables "
            "(logo, mockup, wireframe, design system, etc.)"
        )

    return errors


def validate_system(content: str, filepath: str) -> list[str]:
    """Validate design system phase (Brad Frost Atomic Design)."""
    errors = []

    # Check for Atomic Design levels
    atomic_levels = ["atom", "molecule", "organism", "template", "page"]
    levels_found = [
        l for l in atomic_levels if l.lower() in content.lower()
    ]
    # Only check if it mentions atomic design or design system
    is_design_system = any(
        kw in content.lower()
        for kw in ["atomic", "design system", "design tokens", "component"]
    )
    if is_design_system and len(levels_found) < 2:
        errors.append(
            f"Design system references Atomic Design but only mentions "
            f"{len(levels_found)}/5 levels: {levels_found or 'none'}"
        )

    # Check for token definitions
    token_patterns = [
        r"(?i)(?:color token|token de cor)",
        r"(?i)(?:spacing token|token de espaçamento)",
        r"(?i)(?:typography token|token de tipografia)",
        r"--[\w-]+\s*:",  # CSS custom properties
        r"(?i)(?:design token|token)",
    ]
    token_found = sum(1 for p in token_patterns if re.search(p, content))
    if is_design_system and token_found == 0:
        errors.append(
            "Design system should define tokens (colors, spacing, typography)"
        )

    return errors


def validate_delivery(content: str, filepath: str) -> list[str]:
    """Validate final delivery."""
    errors = []

    # Check for usage guidelines
    guideline_patterns = [
        r"(?i)(?:guideline|diretriz|usage|uso|do['']?s and don['']?t)",
        r"(?i)(?:spacing|espaçamento|safe area|área segura)",
        r"(?i)(?:wrong|incorreto|avoid|evitar|don['']?t)",
    ]
    has_guidelines = any(re.search(p, content) for p in guideline_patterns)
    if not has_guidelines:
        errors.append(
            "Delivery should include usage guidelines "
            "(do's and don'ts, spacing rules, etc.)"
        )

    return errors
