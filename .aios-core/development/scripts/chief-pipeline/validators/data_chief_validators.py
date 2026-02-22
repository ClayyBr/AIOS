"""
Data Chief Custom Validators
================================
Specific validation logic for Data Chief pipeline phases.
Ensures data-driven outputs with proper methodology and actionability.
"""

import re

# Known frameworks by specialist
FRAMEWORKS = {
    "peter-fader": ["CLV", "RFM", "BG/NBD", "Pareto/NBD", "Customer Centricity"],
    "sean-ellis": ["AARRR", "North Star", "PMF", "ICE", "40% Test"],
    "nick-mehta": ["Health Score", "DEAR", "Churn", "CS Playbook"],
    "david-spinks": ["SPACES", "Community Health", "Engagement"],
    "wes-kao": ["CBC", "Completion Rate", "Learning Outcomes", "Cohort"],
    "avinash-kaushik": ["DMMM", "So What", "Attribution", "Dashboard"],
}

# Metrics that should have numeric values, not just mentions
QUANTIFIABLE_METRICS = [
    "CLV", "LTV", "CAC", "ARPU", "MRR", "ARR", "Churn Rate",
    "Retention Rate", "NPS", "CSAT", "Completion Rate",
    "Health Score", "PMF Score", "Engagement Rate",
]


def validate_fundamentacao(content: str, filepath: str) -> list[str]:
    """Validate Tier 0 fundamentação — must use proper frameworks."""
    errors = []

    # Check that at least one Tier 0 framework is referenced
    tier0_frameworks = FRAMEWORKS["peter-fader"] + FRAMEWORKS["sean-ellis"]
    found = [fw for fw in tier0_frameworks if fw.lower() in content.lower()]
    if len(found) == 0:
        errors.append(
            "Fundamentação must reference at least one Tier 0 framework "
            "(CLV, RFM, AARRR, PMF, North Star, etc.)"
        )

    # Check for data source specification
    data_patterns = [
        r"(?i)(?:data source|fonte de dados|database|banco de dados)",
        r"(?i)(?:dataset|amostra|sample|records|registros)",
        r"(?i)(?:period|período|timeframe|janela)",
    ]
    data_found = sum(1 for p in data_patterns if re.search(p, content))
    if data_found == 0:
        errors.append(
            "Fundamentação should specify data sources, sample size, or time period"
        )

    # Check for numeric evidence (not just theory)
    numbers = re.findall(r"\d+(?:\.\d+)?%?", content)
    if len(numbers) < 3:
        errors.append(
            f"Only {len(numbers)} numeric values found. "
            f"Data fundamentação should be rich in quantitative evidence"
        )

    return errors


def validate_operacionalizacao(content: str, filepath: str) -> list[str]:
    """Validate Tier 1 operacionalização — must be actionable."""
    errors = []

    # Check for implementation steps
    impl_patterns = [
        r"(?i)(?:step|passo|etapa)\s*\d",
        r"(?i)(?:implement|implementar|deploy|configurar)",
        r"\d+\.\s+\w",  # numbered lists
    ]
    impl_found = sum(1 for p in impl_patterns if re.search(p, content))
    if impl_found == 0:
        errors.append(
            "Operacionalização must include concrete implementation steps"
        )

    # Check for thresholds/triggers
    threshold_patterns = [
        r"(?i)(?:threshold|limiar|trigger|gatilho|alert|alerta)",
        r"(?i)(?:if .* then|quando .* então|se .* então)",
        r"(?i)(?:above|below|acima|abaixo|greater|menor)\s*(?:than|que)?\s*\d",
    ]
    threshold_found = sum(1 for p in threshold_patterns if re.search(p, content))
    if threshold_found == 0:
        errors.append(
            "Operacionalização should define thresholds/triggers for actions "
            "(e.g., 'If health score < 40, trigger intervention')"
        )

    return errors


def validate_comunicacao(content: str, filepath: str) -> list[str]:
    """Validate Tier 2 comunicação — must pass So What test."""
    errors = []

    # Kaushik's So What test
    so_what_indicators = [
        r"(?i)so what",
        r"(?i)(?:isso significa|this means|implicação|implication)",
        r"(?i)(?:ação recomendada|recommended action|next step|próximo passo)",
        r"(?i)(?:decision|decisão|should|devemos|deveria)",
    ]
    so_what_found = sum(1 for p in so_what_indicators if re.search(p, content))
    if so_what_found < 2:
        errors.append(
            "Comunicação must pass Kaushik's 'So What' test: "
            "every metric should lead to a decision or action"
        )

    # Check for stakeholder awareness
    stakeholder_patterns = [
        r"(?i)(?:CEO|CFO|CTO|CMO|VP|director|gerente|stakeholder)",
        r"(?i)(?:executive|executivo|board|diretoria)",
        r"(?i)(?:audience|público|destinatário)",
    ]
    has_stakeholder = any(re.search(p, content) for p in stakeholder_patterns)
    if not has_stakeholder:
        errors.append(
            "Comunicação should identify the target stakeholder/audience"
        )

    return errors


def validate_delivery(content: str, filepath: str) -> list[str]:
    """Validate final delivery."""
    errors = []

    # Check for quantified metrics
    metrics_found = [
        m for m in QUANTIFIABLE_METRICS
        if m.lower() in content.lower()
    ]
    if len(metrics_found) < 2:
        errors.append(
            f"Delivery should reference quantified metrics. "
            f"Found only: {metrics_found or 'none'}"
        )

    # Check for actionable recommendations
    action_patterns = [
        r"(?i)(?:recommend|recomend|sugest|suggest)",
        r"(?i)(?:action item|ação|próximo passo|next step)",
    ]
    has_actions = any(re.search(p, content) for p in action_patterns)
    if not has_actions:
        errors.append(
            "Delivery must include actionable recommendations"
        )

    return errors
