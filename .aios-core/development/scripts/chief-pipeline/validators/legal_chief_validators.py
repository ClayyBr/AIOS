"""
Legal Chief Custom Validators
================================
Specific validation logic for Legal Chief pipeline phases.
Ensures legal outputs have proper disclaimers, risk assessment, and PII protection.
"""

import re

# Brazilian legal areas and their specialists
LEGAL_AREAS = {
    "contracts": "@ken-adams",
    "investment": "@brad-feld",
    "criminal": "@pierpaolo-bottini",
    "tax": "@tributarista",
    "labor": "@trabalhista",
    "corporate": "@societarista",
    "lgpd": "@lgpd-specialist",
}

# PII patterns that should NEVER appear in outputs
PII_PATTERNS = [
    r"\d{3}\.\d{3}\.\d{3}-\d{2}",  # CPF
    r"\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}",  # CNPJ
    r"(?i)(?:RG|identidade)[:\s]*[\d.]+",  # RG
    r"(?i)(?:OAB)[:\s]*\d+",  # OAB number
    r"(?i)(?:conta|account)[:\s]*\d{5,}",  # bank account
    r"(?i)(?:agência|agency)[:\s]*\d{4}",  # bank agency
]

# Legal disclaimer requirement
DISCLAIMER_VARIANTS = [
    r"(?i)(?:esta análise é orientativa)",
    r"(?i)(?:não substitui consulta)",
    r"(?i)(?:consulte um (?:advogado|profissional))",
    r"(?i)(?:this (?:analysis|opinion) (?:is|does) not (?:constitute|replace))",
    r"(?i)(?:disclaimer|aviso legal|nota importante)",
    r"(?i)(?:orientativo|informativo|educacional)",
]


def validate_diagnosis(content: str, filepath: str) -> list[str]:
    """Validate legal diagnosis — proper area identification and risk."""
    errors = []

    # Check legal area identification
    area_keywords = {
        "contracts": ["contrato", "contract", "cláusula", "clause"],
        "investment": ["investimento", "investment", "term sheet", "cap table", "mútuo"],
        "criminal": ["criminal", "compliance", "lavagem", "fraude"],
        "tax": ["tributário", "tributario", "imposto", "tax", "fiscal", "holding"],
        "labor": ["trabalhista", "CLT", "PJ", "pejotização", "labor"],
        "corporate": ["societário", "societario", "sócios", "socios", "governança"],
        "lgpd": ["LGPD", "privacidade", "dados pessoais", "DPO", "privacy"],
    }
    areas_found = []
    for area, keywords in area_keywords.items():
        if any(kw.lower() in content.lower() for kw in keywords):
            areas_found.append(area)

    if len(areas_found) == 0:
        errors.append(
            "Diagnosis should identify the legal area "
            "(contracts, investment, criminal, tax, labor, corporate, LGPD)"
        )

    # Check PII leak
    errors.extend(_check_pii_leaks(content))

    return errors


def validate_analysis(content: str, filepath: str) -> list[str]:
    """Validate legal analysis — proper risk assessment and legal basis."""
    errors = []

    # Check for legal basis / legislation references
    legal_ref_patterns = [
        r"(?i)(?:art(?:igo)?\.?\s*\d+)",  # Article references
        r"(?i)(?:lei\s*(?:n[°º]?\s*)?\d+)",  # Law references
        r"(?i)(?:CLT|CF|CC|CDC|LGPD|Marco Civil)",  # Known acronyms
        r"(?i)(?:decreto|portaria|instrução normativa|resolução)",  # Regulations
        r"(?i)(?:jurisprudência|súmula|precedente)",  # Jurisprudence
    ]
    legal_refs = sum(1 for p in legal_ref_patterns if re.search(p, content))
    if legal_refs == 0:
        errors.append(
            "Legal analysis should reference legislation, articles, or jurisprudence"
        )

    # Check for risk classification
    risk_patterns = [
        r"(?i)(?:risco|risk)\s*[:=]?\s*(?:alto|médio|baixo|crítico|high|medium|low|critical)",
        r"(?i)(?:exposição|exposure)",
        r"(?i)(?:multa|fine|penalidade|penalty|sanção|sanction)",
    ]
    risk_found = sum(1 for p in risk_patterns if re.search(p, content))
    if risk_found == 0:
        errors.append(
            "Analysis should include explicit risk classification and potential penalties"
        )

    # Check PII
    errors.extend(_check_pii_leaks(content))

    return errors


def validate_document(content: str, filepath: str) -> list[str]:
    """Validate legal document output."""
    errors = []

    # Check for actionable recommendations
    action_patterns = [
        r"(?i)(?:recomend|recommend|sugest|suggest)",
        r"(?i)(?:providência|providencia|action|ação)",
        r"(?i)(?:next step|próximo passo|medida)",
    ]
    has_actions = any(re.search(p, content) for p in action_patterns)
    if not has_actions:
        errors.append("Legal document should include actionable recommendations")

    # Check PII
    errors.extend(_check_pii_leaks(content))

    return errors


def validate_delivery(content: str, filepath: str) -> list[str]:
    """Validate final delivery — MUST have disclaimer."""
    errors = []

    # CRITICAL: Check for legal disclaimer
    disclaimer_found = any(
        re.search(p, content) for p in DISCLAIMER_VARIANTS
    )
    if not disclaimer_found:
        errors.append(
            "⚠️ CRITICAL: Legal delivery MUST include disclaimer: "
            "'Esta análise é orientativa e não substitui consulta com advogado.'"
        )

    # Check PII in final output
    errors.extend(_check_pii_leaks(content))

    return errors


def _check_pii_leaks(content: str) -> list[str]:
    """Check for PII leaks (CPF, CNPJ, RG, bank accounts)."""
    errors = []
    for pattern in PII_PATTERNS:
        if re.search(pattern, content):
            errors.append(
                f"⚠️ PII LEAK: Possible personal data found "
                f"(pattern: {pattern[:30]}...). Sanitize before delivery!"
            )
    return errors
