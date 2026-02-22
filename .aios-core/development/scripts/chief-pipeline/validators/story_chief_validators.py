"""
Story Chief Custom Validators
=================================
Specific validation logic for Story Chief pipeline phases.
Ensures stories have proper structure, emotional arc, and audience transformation.
"""

import re

# Framework-to-storyteller mapping
FRAMEWORK_MAP = {
    "Hero's Journey": "@joseph-campbell",
    "Story Grid": "@shawn-coyne",
    "StoryBrand": "@donald-miller",
    "Sparkline": "@nancy-duarte",
    "Story Circle": "@dan-harmon",
    "Save the Cat": "@blake-snyder",
    "ABT": "@park-howell",
    "5-Second Moment": "@matthew-dicks",
    "Public Narrative": "@marshall-ganz",
    "STRONG": "@oren-klaff",
    "4 Stories": "@kindra-hall",
    "Improv": "@keith-johnstone",
}

# Story quality checklist items
QUALITY_CHECKLIST = [
    "beginning",
    "middle",
    "end",
    "conflict",
    "tension",
    "emotion",
    "protagonist",
    "stakes",
    "transformation",
    "message",
]

# Duration-to-framework recommendation
DURATION_FRAMEWORKS = {
    "30s": ["ABT"],
    "2min": ["StoryBrand", "5-Second Moment"],
    "5min": ["4 Stories", "5-Second Moment"],
    "15min": ["Sparkline", "Public Narrative"],
    "45min": ["Sparkline", "Hero's Journey"],
    "feature": ["Save the Cat", "Story Grid"],
}


def validate_diagnosis(content: str, filepath: str) -> list[str]:
    """Validate story diagnosis — proper structure + genre analysis."""
    errors = []

    # Check for audience identification
    audience_patterns = [
        r"(?i)(?:audience|público|audiência|ouvinte)",
        r"(?i)(?:target|alvo|persona|leitor|viewer)",
        r"(?i)(?:who|quem|para quem)",
    ]
    audience_found = any(re.search(p, content) for p in audience_patterns)
    if not audience_found:
        errors.append(
            "Diagnosis should identify the target audience"
        )

    # Check for framework recommendation
    frameworks_found = [
        fw for fw in FRAMEWORK_MAP.keys()
        if fw.lower() in content.lower()
    ]
    if len(frameworks_found) == 0:
        errors.append(
            "Diagnosis should recommend at least one framework "
            "(Hero's Journey, StoryBrand, Sparkline, ABT, etc.)"
        )

    # Check for context type
    context_patterns = [
        r"(?i)(?:pitch|apresentação|presentation|keynote|TED)",
        r"(?i)(?:brand|marca|marketing|sales|venda)",
        r"(?i)(?:personal|pessoal|memoir|autobio)",
        r"(?i)(?:business|empresa|corporat|organizacion)",
        r"(?i)(?:script|roteiro|vídeo|video|film|série)",
    ]
    context_found = sum(1 for p in context_patterns if re.search(p, content))
    if context_found == 0:
        errors.append(
            "Diagnosis should identify story context "
            "(pitch, brand, personal, business, script, etc.)"
        )

    return errors


def validate_framework(content: str, filepath: str) -> list[str]:
    """Validate framework application — must show explicit beats/steps."""
    errors = []

    # Check for beat/step structure
    beat_patterns = [
        r"(?i)(?:beat|batida|step|passo|act|ato|stage|estágio)\s*\d",
        r"(?i)(?:beat|step|act)\s*[:—]\s*\w",
        r"\d+\.\s+\w",  # numbered list
        r"(?i)(?:ordinary world|call to adventure|refusal|crossing)",  # Campbell
        r"(?i)(?:you|need|go|search|find|take|return|change)",  # Harmon
        r"(?i)(?:opening image|set-up|catalyst|debate|break into)",  # Snyder
    ]
    beats_found = sum(1 for p in beat_patterns if re.search(p, content))
    if beats_found < 3:
        errors.append(
            "Framework application should show explicit beats/steps/acts "
            "(at least 3 structural elements)"
        )

    # Verify framework name is stated
    framework_stated = any(
        fw.lower() in content.lower() for fw in FRAMEWORK_MAP.keys()
    )
    if not framework_stated:
        errors.append(
            "Framework application should explicitly name the framework being used"
        )

    return errors


def validate_creation(content: str, filepath: str) -> list[str]:
    """Validate story creation — emotional arc and structure."""
    errors = []

    # Check for narrative structure elements
    structure_elements = {
        "conflict": [r"(?i)(?:conflict|conflito|problem|problema|challenge|desafio|struggle)"],
        "emotion": [r"(?i)(?:feel|sent|emotion|emoção|heart|coração|laugh|cry|fear|hope)"],
        "transformation": [r"(?i)(?:transform|changed|mudou|aprendeu|learned|grew|overcame|superou)"],
    }

    missing = []
    for element, patterns in structure_elements.items():
        found = any(re.search(p, content) for p in patterns)
        if not found:
            missing.append(element)

    if len(missing) > 1:
        errors.append(
            f"Story missing key narrative elements: {', '.join(missing)}. "
            f"Good stories need conflict, emotion, and transformation."
        )

    # Check for dialogue or voice
    dialogue_patterns = [
        r'"[^"]{5,}"',  # quoted speech
        r"'[^']{5,}'",
        r"(?i)(?:disse|said|falou|spoke|perguntou|asked)",
    ]
    has_dialogue = any(re.search(p, content) for p in dialogue_patterns)

    # Check word count vs. expected (stories shouldn't be too short)
    word_count = len(content.split())
    if word_count < 150:
        errors.append(
            f"Story is very short ({word_count} words). "
            f"Even micro-stories should have enough detail to engage."
        )

    return errors


def validate_delivery(content: str, filepath: str) -> list[str]:
    """Validate final delivery with quality checklist."""
    errors = []

    # Run quality checklist
    checklist_score = 0
    for item in QUALITY_CHECKLIST:
        variants = [item, item.replace("_", " ")]
        if any(v.lower() in content.lower() for v in variants):
            checklist_score += 1

    # Also check for explicit quality assessment
    quality_patterns = [
        r"(?i)(?:quality|qualidade)\s*(?:score|nota|pontuação)[:\s]*(\d+)",
        r"(\d+)\s*/\s*10",
        r"(\d+)\s*/\s*100",
    ]
    has_quality_score = any(re.search(p, content) for p in quality_patterns)
    if not has_quality_score:
        errors.append(
            "Delivery should include explicit quality score"
        )

    # Check grunt test (Donald Miller)
    grunt_patterns = [
        r"(?i)(?:grunt test|teste do grunt)",
        r"(?i)(?:clear|claro|simple|simples|understood|entendido)",
    ]
    # Only flag if it's a StoryBrand-type story
    if "storybrand" in content.lower() or "brandscript" in content.lower():
        has_grunt = any(re.search(p, content) for p in grunt_patterns)
        if not has_grunt:
            errors.append(
                "StoryBrand stories should pass the 'grunt test' — "
                "is the message clear enough to understand in seconds?"
            )

    return errors
