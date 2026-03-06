import re

vtt_file = "AIOS é Revolução ou Só Hype？ Minha Análise Sincera. [XtraHVUBcMU].pt.vtt"
txt_file = "clean_transcript.txt"

with open(vtt_file, "r", encoding="utf-8") as f:
    lines = f.readlines()

clean_lines = []
last_line = ""

for line in lines:
    line = line.strip()
    if not line:
        continue
    if "-->" in line or line.startswith("WEBVTT") or line.startswith("Kind:") or line.startswith("Language:"):
        continue
    # remove HTML-like tags (e.g. <c>...</c>)
    line = re.sub(r'<[^>]+>', '', line)
    
    # Avoid duplicate lines common in auto-generated VTT
    if line != last_line and not re.match(r'^\d{2}:\d{2}:\d{2}\.\d{3}$', line):
        clean_lines.append(line)
        last_line = line

with open(txt_file, "w", encoding="utf-8") as f:
    f.write(" ".join(clean_lines))

