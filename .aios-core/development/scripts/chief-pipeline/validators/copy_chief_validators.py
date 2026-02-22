"""
Copy Chief Custom Validators
==============================
Specific validation logic for Copy Chief pipeline phases
that cannot be expressed in the generic JSON schema.
"""

import re

# Sugarman's 30 Psychological Triggers
SUGARMAN_TRIGGERS = [
    "Feeling of Involvement",
    "Honesty",
    "Integrity",
    "Credibility",
    "Value and Proof of Value",
    "Justify the Purchase",
    "Greed",
    "Establish Authority",
    "Satisfaction Conviction",
    "Nature of Product",
    "Current Fads",
    "Timing",
    "Desire to Belong",
    "Desire to Collect",
    "Curiosity",
    "Sense of Urgency",
    "Fear",
    "Instant Gratification",
    "Exclusivity",
    "Simplicity",
    "Human Relationships",
    "Guilt",
    "Specificity",
    "Familiarity",
    "Hope",
    "Pattern Interrupt",
    "Mental Engagement",
    "Storytelling",
    "Reciprocity",
    "Likability",
]

# Valid copywriter names for routing
VALID_COPYWRITERS = [
    "gary-halbert",
    "gary-bencivenga",
    "david-ogilvy",
    "dan-kennedy",
    "todd-brown",
    "jon-benson",
    "ry-schwartz",
    "jeff-walker",
    "eugene-schwartz",
    "claude-hopkins",
    "robert-collier",
    "joe-sugarman",
]


def validate_diagnosis(content: str, filepath: str) -> list[str]:
    """Validate diagnosis phase output."""
    errors = []

    # Check that a copywriter recommendation is valid
    for writer in VALID_COPYWRITERS:
        if writer.lower() in content.lower():
            break
    else:
        errors.append(
            "Diagnosis should recommend at least one known copywriter from the roster"
        )

    # Check awareness level is explicitly stated (not just mentioned)
    awareness_pattern = r"(?:awareness[:\s]+|nível de consciência[:\s]+)(unaware|problem aware|solution aware|product aware|most aware)"
    if not re.search(awareness_pattern, content, re.IGNORECASE):
        errors.append(
            "Awareness level should be explicitly declared (e.g., 'Awareness: Problem Aware')"
        )

    return errors


def validate_copy_output(content: str, filepath: str) -> list[str]:
    """Validate the actual copy output."""
    errors = []

    # Check for CTA presence (multiple possible formats)
    cta_patterns = [
        r"(?i)(compre agora|buy now|garanta|get started|inscreva|sign up|clique|click)",
        r"(?i)(call to action|CTA|chamada para ação)",
        r"(?i)(botão|button)",
    ]
    has_cta = any(re.search(p, content) for p in cta_patterns)
    if not has_cta:
        errors.append("No clear Call to Action (CTA) detected in the copy")

    # Check for emotional hooks
    emotion_patterns = [
        r"(?i)(imagine|visualize|picture this)",
        r"(?i)(você já|have you ever|what if)",
        r"(?i)(problema|struggle|frustrat|pain|dor)",
    ]
    emotion_count = sum(1 for p in emotion_patterns if re.search(p, content))
    if emotion_count < 2:
        errors.append(
            f"Low emotional engagement: only {emotion_count}/3 hook patterns detected"
        )

    # Check it's not just a template
    template_indicators = content.count("[") + content.count("{")
    word_count = len(content.split())
    if template_indicators > word_count * 0.05:  # More than 5% brackets
        errors.append(
            "Copy appears to be a template rather than finished copy (too many brackets)"
        )

    return errors


def validate_audit(content: str, filepath: str) -> list[str]:
    """Validate the Hopkins audit + Sugarman triggers."""
    errors = []

    # Count how many triggers are mentioned
    triggers_found = []
    for trigger in SUGARMAN_TRIGGERS:
        # Check for trigger name or close variant
        if trigger.lower() in content.lower():
            triggers_found.append(trigger)

    coverage = len(triggers_found) / len(SUGARMAN_TRIGGERS) * 100

    # The schema checks the declared percentage, but we also validate
    # that the triggers are actually discussed (not just listed)
    if len(triggers_found) < 10:
        errors.append(
            f"Only {len(triggers_found)}/30 Sugarman triggers identified in audit "
            f"({coverage:.0f}%). Minimum recommended: 24 (80%)"
        )

    # Verify Hopkins score has justification
    score_match = re.search(
        r"hopkins[_\s]score[:\s]*(\d+)", content, re.IGNORECASE
    )
    if score_match:
        score = int(score_match.group(1))
        # Check there are specific line items (not just a number)
        criteria_count = len(
            re.findall(r"[-•✓✗☑☐]\s+\w", content)
        )
        if score >= 85 and criteria_count < 5:
            errors.append(
                f"Hopkins score {score} declared but only {criteria_count} "
                f"evaluation criteria visible. Audit should detail specific checks."
            )

    return errors
