"""
Cyber Chief Custom Validators
================================
Specific validation logic for Cyber Chief pipeline phases.
Catches security-specific issues that generic schemas can't.
"""

import re

# OWASP Top 10 (2021) categories
OWASP_TOP_10 = [
    "Broken Access Control",
    "Cryptographic Failures",
    "Injection",
    "Insecure Design",
    "Security Misconfiguration",
    "Vulnerable Components",
    "Authentication Failures",
    "Software and Data Integrity",
    "Logging and Monitoring",
    "Server-Side Request Forgery",
]

# CVSS severity levels
CVSS_SEVERITIES = ["Critical", "High", "Medium", "Low", "Informational"]

# Common dangerous patterns that should never appear in output
CREDENTIAL_PATTERNS = [
    r"(?i)(?:password|passwd|pwd)\s*[:=]\s*['\"]?\S{6,}",
    r"(?i)(?:api[_-]?key|apikey)\s*[:=]\s*['\"]?\S{10,}",
    r"(?i)(?:secret|token)\s*[:=]\s*['\"]?\S{10,}",
    r"(?i)(?:aws_access_key_id)\s*[:=]\s*\S+",
    r"(?i)(?:private[_-]?key)\s*[:=]",
    r"-----BEGIN (?:RSA |EC )?PRIVATE KEY-----",
    r"(?i)Bearer\s+[A-Za-z0-9\-._~+/]+=*",
]


def validate_triage(content: str, filepath: str) -> list[str]:
    """Validate triage phase — ensure proper routing."""
    errors = []

    # Check urgency is clearly stated
    urgency_pattern = r"(?i)(?:urgency|urgência|level)[:\s]*(critical|high|medium|low)"
    if not re.search(urgency_pattern, content):
        errors.append(
            "Urgency level must be explicitly stated (CRITICAL/HIGH/MEDIUM/LOW)"
        )

    # Check that assets at risk are identified
    asset_keywords = [
        "server", "database", "api", "application", "network",
        "user data", "credentials", "infrastructure", "endpoint",
        "servidor", "banco de dados", "aplicação", "rede",
    ]
    asset_found = any(kw.lower() in content.lower() for kw in asset_keywords)
    if not asset_found:
        errors.append(
            "No specific assets at risk identified. "
            "Triage should name concrete assets (servers, APIs, databases, etc.)"
        )

    # Check for credential leaks in triage itself
    errors.extend(_check_credential_leaks(content))

    return errors


def validate_assessment(content: str, filepath: str) -> list[str]:
    """Validate assessment phase — check for proper findings format."""
    errors = []

    # Check findings have severity ratings
    severity_count = sum(
        1 for sev in CVSS_SEVERITIES
        if re.search(rf"\b{sev}\b", content, re.IGNORECASE)
    )
    if severity_count == 0:
        errors.append(
            "Findings should include severity ratings "
            "(Critical/High/Medium/Low/Informational)"
        )

    # Check for OWASP references where applicable
    owasp_count = sum(
        1 for cat in OWASP_TOP_10
        if cat.lower() in content.lower()
    )
    # Only warn if it looks like a web app assessment
    web_keywords = ["web", "api", "http", "endpoint", "url", "application"]
    is_web = any(kw.lower() in content.lower() for kw in web_keywords)
    if is_web and owasp_count == 0:
        errors.append(
            "Web application assessment should reference OWASP Top 10 categories"
        )

    # Check for evidence (screenshots, logs, commands)
    evidence_patterns = [
        r"```",  # code blocks
        r"(?i)screenshot",
        r"(?i)evidence",
        r"(?i)proof of concept",
        r"(?i)PoC",
        r"(?i)log output",
        r"(?i)command output",
    ]
    evidence_found = sum(
        1 for p in evidence_patterns if re.search(p, content)
    )
    if evidence_found == 0:
        errors.append(
            "Assessment should include evidence "
            "(code blocks, screenshots, PoC, log output)"
        )

    # Check for credential leaks
    errors.extend(_check_credential_leaks(content))

    return errors


def validate_remediation(content: str, filepath: str) -> list[str]:
    """Validate remediation plan."""
    errors = []

    # Check for prioritized actions
    priority_patterns = [
        r"(?i)(?:P1|priority\s*1|imediato|immediate)",
        r"(?i)(?:P2|priority\s*2|curto prazo|short.?term)",
        r"(?i)(?:P3|priority\s*3|médio prazo|medium.?term)",
    ]
    priorities_found = sum(
        1 for p in priority_patterns if re.search(p, content)
    )
    if priorities_found < 2:
        errors.append(
            "Remediation should have at least 2 priority levels "
            "(P1: immediate, P2: short-term, P3: medium-term)"
        )

    # Check for timeline/deadline mentions
    timeline_patterns = [
        r"\d+\s*(?:hours?|horas?|days?|dias?|weeks?|semanas?)",
        r"(?i)(?:deadline|prazo|timeline|SLA)",
    ]
    has_timeline = any(re.search(p, content) for p in timeline_patterns)
    if not has_timeline:
        errors.append(
            "Remediation plan should include timelines/deadlines for each action"
        )

    return errors


def validate_report(content: str, filepath: str) -> list[str]:
    """Validate final report."""
    errors = []

    # Executive summary should be concise
    exec_match = re.search(
        r"(?i)executive summary\s*\n(.*?)(?=\n#|\n##|\Z)",
        content,
        re.DOTALL,
    )
    if exec_match:
        exec_words = len(exec_match.group(1).split())
        if exec_words > 500:
            errors.append(
                f"Executive summary too long ({exec_words} words). "
                f"Should be concise (max ~300 words)"
            )

    # Check disclaimer is present
    disclaimer_patterns = [
        r"(?i)(?:disclaimer|aviso|nota importante)",
        r"(?i)(?:this (?:report|assessment) is|este relatório)",
        r"(?i)(?:point in time|momento específico)",
    ]
    has_disclaimer = any(re.search(p, content) for p in disclaimer_patterns)
    if not has_disclaimer:
        errors.append(
            "Security report should include a disclaimer about scope and point-in-time nature"
        )

    # Final credential leak check
    errors.extend(_check_credential_leaks(content))

    return errors


def _check_credential_leaks(content: str) -> list[str]:
    """Check for accidentally leaked credentials in any output."""
    errors = []
    for pattern in CREDENTIAL_PATTERNS:
        matches = re.findall(pattern, content)
        if matches:
            errors.append(
                f"⚠️ SECURITY: Possible credential leak detected "
                f"(pattern: {pattern[:40]}...). "
                f"Sanitize before delivery!"
            )
    return errors
