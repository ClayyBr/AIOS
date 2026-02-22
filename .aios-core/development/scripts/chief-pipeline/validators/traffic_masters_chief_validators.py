"""
Traffic Masters Chief Custom Validators
==========================================
Specific validation logic for Traffic Masters Chief pipeline phases.
Ensures campaigns have proper metrics, budget allocation, and ROI focus.
"""

import re

# Platform-specialist routing
PLATFORM_SPECIALISTS = {
    "meta": "@depesh-mandalia",
    "facebook": "@depesh-mandalia",
    "instagram": "@depesh-mandalia",
    "meta_leadgen": "@nicholas-kusmich",
    "google": "@kasim-aslam",
    "youtube": "@tom-breeze",
    "brasil": "@pedro-sobral",
}

# Key frameworks by specialist
FRAMEWORKS = {
    "molly-pittman": ["Traffic Engine", "Customer Journey", "9 Steps"],
    "depesh-mandalia": ["BPM", "Brand Performance Marketing"],
    "kasim-aslam": ["Golden Ratio", "4 Campaign Types", "2-4 Bid"],
    "tom-breeze": ["ADUCATE", "3-Act Structure", "M.A.P."],
    "nicholas-kusmich": ["4-Step Framework", "Lead Gen Funnel"],
    "ralph-burns": ["Creative Lab", "DPI²", "7 Steps"],
    "pedro-sobral": ["Metodologia ABC", "Operação Diária"],
}

# Essential traffic metrics
ESSENTIAL_METRICS = [
    "ROAS", "CAC", "CPA", "CTR", "CPM", "CPC",
    "LTV", "nCAC", "CVR", "Conversion Rate",
]

# Correct vocabulary (enforce professional terminology)
VOCABULARY_CORRECTIONS = {
    r"(?i)\bROI\b(?!\s*(?:genérico|geral|overall))": "Use 'ROAS' instead of generic 'ROI' for paid traffic",
    r"(?i)\bescalar\b": "Use 'scaling' instead of 'escalar' in traffic context",
    r"(?i)\bcansaço de anúncio\b": "Use 'creative fatigue' instead of 'cansaço de anúncio'",
    r"(?i)\bfase de aprendizado\b": "Use 'learning phase' instead of 'fase de aprendizado'",
}


def validate_strategy(content: str, filepath: str) -> list[str]:
    """Validate strategy phase — must have clear platform and objective."""
    errors = []

    # Check for platform identification
    platforms = ["meta", "facebook", "instagram", "google", "youtube"]
    platform_found = any(p.lower() in content.lower() for p in platforms)
    if not platform_found:
        errors.append(
            "Strategy must identify the target platform "
            "(Meta, Google, YouTube, or Multi-platform)"
        )

    # Check for audience definition
    audience_patterns = [
        r"(?i)(?:target audience|público.?alvo|persona|avatar)",
        r"(?i)(?:demographic|demográfico|age|idade|gender|gênero)",
        r"(?i)(?:interest|interesse|behavior|comportamento)",
    ]
    audience_found = sum(1 for p in audience_patterns if re.search(p, content))
    if audience_found == 0:
        errors.append(
            "Strategy should define target audience "
            "(demographics, interests, behaviors)"
        )

    # Check for budget mention
    budget_patterns = [
        r"(?i)(?:budget|orçamento|investimento)\s*[:=]?\s*R?\$?\s*[\d.,]+",
        r"R\$\s*[\d.,]+",
        r"\$\s*[\d.,]+",
        r"(?i)(?:daily|diário|monthly|mensal)\s*(?:budget|investimento)",
    ]
    has_budget = any(re.search(p, content) for p in budget_patterns)
    if not has_budget:
        errors.append(
            "Strategy should include budget range or investment level"
        )

    return errors


def validate_campaign(content: str, filepath: str) -> list[str]:
    """Validate campaign setup — structure, targeting, creative."""
    errors = []

    # Check for campaign structure (ad sets, campaigns)
    structure_patterns = [
        r"(?i)(?:campaign|campanha)\s*(?:structure|estrutura)?",
        r"(?i)(?:ad set|conjunto de anúncios|ad group|grupo)",
        r"(?i)(?:ad|anúncio|creative|criativo)",
    ]
    structure_found = sum(1 for p in structure_patterns if re.search(p, content))
    if structure_found < 2:
        errors.append(
            "Campaign should define structure "
            "(campaigns → ad sets/groups → ads/creatives)"
        )

    # Check for targeting specifics
    targeting_patterns = [
        r"(?i)(?:lookalike|semelhante|similar)",
        r"(?i)(?:custom audience|público personalizado|remarketing|retargeting)",
        r"(?i)(?:interest|interesse|behavior|comportamento|demographic)",
        r"(?i)(?:exclusion|exclusão|negative)",
    ]
    targeting_found = sum(1 for p in targeting_patterns if re.search(p, content))
    if targeting_found == 0:
        errors.append(
            "Campaign should specify targeting "
            "(lookalike, custom audiences, interests, exclusions)"
        )

    # Check for creative specifications
    creative_patterns = [
        r"(?i)(?:headline|título|copy|texto)",
        r"(?i)(?:image|imagem|video|vídeo|creative|criativo)",
        r"(?i)(?:format|formato|carousel|stories|reels|feed)",
    ]
    creative_found = sum(1 for p in creative_patterns if re.search(p, content))
    if creative_found < 2:
        errors.append(
            "Campaign should include creative specifications "
            "(headlines, images/video, formats)"
        )

    return errors


def validate_optimization(content: str, filepath: str) -> list[str]:
    """Validate optimization/scaling phase."""
    errors = []

    # Check for metrics presence
    metrics_found = [
        m for m in ESSENTIAL_METRICS
        if re.search(rf"\b{re.escape(m)}\b", content, re.IGNORECASE)
    ]
    if len(metrics_found) < 3:
        errors.append(
            f"Optimization should reference at least 3 key metrics. "
            f"Found: {metrics_found or 'none'}. "
            f"Expected: ROAS, CAC, CPA, CTR, CPM, CPC, etc."
        )

    # Check for scaling criteria
    scale_patterns = [
        r"(?i)(?:scaling|escal|scale)",
        r"(?i)(?:increase budget|aumentar|incrementar)",
        r"(?i)(?:horizontal|vertical)\s*(?:scaling|escal)",
    ]
    has_scaling = any(re.search(p, content) for p in scale_patterns)
    if not has_scaling:
        errors.append(
            "Optimization should include scaling strategy "
            "(horizontal/vertical scaling, budget increase criteria)"
        )

    # Check vocabulary
    for pattern, suggestion in VOCABULARY_CORRECTIONS.items():
        if re.search(pattern, content):
            errors.append(f"Vocabulary: {suggestion}")

    return errors


def validate_report(content: str, filepath: str) -> list[str]:
    """Validate final performance report."""
    errors = []

    # Check for ROAS
    roas_pattern = r"(?i)ROAS\s*[:=]?\s*[\d.,]+(?:x|X)?"
    if not re.search(roas_pattern, content):
        # Check if ROAS is mentioned at all
        if "roas" not in content.lower():
            errors.append(
                "Report MUST include ROAS (Return on Ad Spend)"
            )

    # Check for CAC
    cac_pattern = r"(?i)(?:CAC|CPA)\s*[:=]?\s*R?\$?\s*[\d.,]+"
    if not re.search(cac_pattern, content):
        if "cac" not in content.lower() and "cpa" not in content.lower():
            errors.append(
                "Report MUST include CAC or CPA with numeric value"
            )

    # Check for data-driven recommendations
    recommendation_patterns = [
        r"(?i)(?:recommend|recomend|suggest|sugest)",
        r"(?i)(?:next step|próximo passo|ação|action)",
        r"(?i)(?:based on|com base em|dado que|considering)",
    ]
    has_recommendations = any(re.search(p, content) for p in recommendation_patterns)
    if not has_recommendations:
        errors.append(
            "Report should include data-driven recommendations"
        )

    return errors
