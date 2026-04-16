#!/usr/bin/env python3
"""
video-to-knowledge.py — Extrator de Transcrição (Sem API de IA)
Squad CFO — AIOS Core

Extrai APENAS a transcrição do YouTube via youtube-transcript-api.
Todo o processamento temático e extração de insights é feita
pelo agente @video-intel diretamente no IDE (Antigravity).

Uso:
    python video-to-knowledge.py --youtube "https://youtube.com/watch?v=ID"
    python video-to-knowledge.py --youtube "https://youtu.be/ID" --title "Nome da Live"

Requisitos:
    pip install youtube-transcript-api python-dotenv
"""

import argparse
import sys
import re
from pathlib import Path
from datetime import datetime
from urllib.parse import urlparse, parse_qs

# Fix Windows terminal encoding
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

# --- Dependências ---
try:
    from youtube_transcript_api import YouTubeTranscriptApi
    TRANSCRIPT_AVAILABLE = True
except ImportError:
    TRANSCRIPT_AVAILABLE = False
    print("❌ youtube-transcript-api não instalado.")
    print("   Execute: pip install youtube-transcript-api")
    sys.exit(1)

# --- Diretórios de Saída ---
BASE_DIR = Path(__file__).resolve().parent.parent / "knowledge" / "videos"
TRANSCRIPTS_DIR = BASE_DIR / "transcripts"
THEMES_DIR = BASE_DIR / "themes"
TRANSCRIPTS_DIR.mkdir(parents=True, exist_ok=True)
THEMES_DIR.mkdir(parents=True, exist_ok=True)


def extract_video_id(url: str) -> str | None:
    """Extrai o ID do vídeo de diferentes formatos de URL do YouTube."""
    parsed = urlparse(url)
    if parsed.hostname in ('youtu.be', 'www.youtu.be'):
        return parsed.path[1:].split('?')[0]
    if parsed.hostname in ('youtube.com', 'www.youtube.com'):
        if parsed.path == '/watch':
            return parse_qs(parsed.query).get('v', [None])[0]
        if parsed.path.startswith(('/embed/', '/v/')):
            return parsed.path.split('/')[2]
    return None


def format_timestamp(seconds: float) -> str:
    """Converte segundos em formato legível MM:SS."""
    total_seconds = int(seconds)
    minutes, secs = divmod(total_seconds, 60)
    hours, minutes = divmod(minutes, 60)
    if hours:
        return f"{hours:02d}:{minutes:02d}:{secs:02d}"
    return f"{minutes:02d}:{secs:02d}"


def get_transcript(video_url: str) -> tuple:
    """
    Busca a transcrição completa do vídeo.
    Retorna: (transcript_text, video_id, yt_link_base)
    """
    video_id = extract_video_id(video_url)
    if not video_id:
        print(f"❌ Não foi possível extrair o ID do vídeo de: {video_url}")
        sys.exit(1)

    print(f"🔍 ID do vídeo: {video_id}")
    print("📡 Buscando transcrição via YouTube Transcript API...")

    # Instancia a API (novo modelo v1.2.0+)
    ytt = YouTubeTranscriptApi()
    transcript_list = None
    lang_used = "?"

    # Tenta idiomas em ordem de preferência
    for langs in [['pt', 'pt-BR'], ['en'], ['es']]:
        try:
            transcript_list = ytt.fetch(video_id, languages=langs)
            lang_used = langs[0]
            break
        except Exception:
            continue

    # Ultimo recurso: qualquer idioma disponivel
    if transcript_list is None:
        try:
            available = ytt.list(video_id)
            first = next(iter(available))
            transcript_list = first.fetch()
            lang_used = first.language_code
        except Exception as e:
            print(f"❌ Nenhuma transcrição disponível para este vídeo: {e}")
            sys.exit(1)

    # Normaliza: FetchedTranscript é iterável de snipets
    segments = list(transcript_list)
    print(f"✅ Transcrição obtida! ({len(segments)} segmentos | Idioma: {lang_used})")

    # Formata com timestamps e deep-links
    lines = []
    yt_base = f"https://youtu.be/{video_id}"
    for segment in segments:
        # v1.2.x usa atributos no objeto, não dicionários
        start = getattr(segment, 'start', segment.get('start', 0) if isinstance(segment, dict) else 0)
        text  = getattr(segment, 'text',  segment.get('text', '') if isinstance(segment, dict) else '')
        text  = text.replace('\n', ' ').strip()
        fmt   = format_timestamp(start)
        link  = f"{yt_base}?t={int(start)}s"
        lines.append(f"[{fmt}]({link}) {text}")

    return "\n".join(lines), video_id, yt_base


def save_transcript(title: str, source_url: str, transcript: str, video_id: str) -> Path:
    """Salva a transcrição bruta na pasta transcripts/."""
    today = datetime.now().strftime("%Y-%m-%d")
    safe_title = re.sub(r'[^a-zA-Z0-9À-ÿ\s-]', '', title).strip()
    safe_title = re.sub(r'\s+', '-', safe_title).lower()
    safe_title = re.sub(r'-+', '-', safe_title)[:60]

    # Constrói o documento de transcrição
    output_content = f"""---
title: "{title}"
source: {source_url}
video_id: {video_id}
date_processed: {today}
status: "aguardando-analise-video-intel"
---

# 📹 Transcrição: {title}

> **Fonte:** {source_url}
> **Processado em:** {today}
> **Próximo passo:** Analisar esta transcrição com o `@video-intel` para gerar os arquivos temáticos em `themes/`.

---

## Transcrição Completa (com Timestamps e Deep Links)

{transcript}

---
*Extraído por `video-to-knowledge.py` | Squad CFO / AIOS Core*
*Análise temática: `@video-intel` via Antigravity IDE*
"""

    filename = f"{today}-{safe_title}.md"
    output_path = TRANSCRIPTS_DIR / filename

    # Previne sobrescrita
    counter = 1
    while output_path.exists():
        output_path = TRANSCRIPTS_DIR / f"{today}-{safe_title}-{counter}.md"
        counter += 1

    output_path.write_text(output_content, encoding='utf-8')
    return output_path


def main():
    parser = argparse.ArgumentParser(
        description="Extrator de Transcrição do YouTube (Sem API de IA)"
    )
    parser.add_argument("--youtube", "-y", required=True, help="URL do vídeo no YouTube")
    parser.add_argument("--title", "-t", default="Live sem título", help="Título do vídeo/live")
    args = parser.parse_args()

    print("\n🎬 Video Intel — Extrator de Transcrição")
    print("=" * 50)
    print(f"   URL: {args.youtube}")
    print(f"   Título: {args.title}")
    print("=" * 50 + "\n")

    # Extrai transcrição
    transcript, video_id, yt_base = get_transcript(args.youtube)

    # Salva o arquivo de transcrição
    saved_path = save_transcript(args.title, args.youtube, transcript, video_id)

    print(f"\n✅ Transcrição salva em:")
    print(f"   {saved_path}")
    print()
    print("=" * 50)
    print("📋 PRÓXIMO PASSO:")
    print()
    print("   Passe o arquivo para o @video-intel no Antigravity:")
    print(f"   '@video-intel analise a transcrição em {saved_path}'")
    print()
    print("   O @video-intel irá:")
    print("   1. Ler a transcrição completa")
    print("   2. Identificar os temas (iFood, entrega, marketing, etc.)")
    print("   3. Criar/atualizar os arquivos em knowledge/videos/themes/")
    print("   4. Adicionar deep-links com timestamps em cada dica")
    print("=" * 50 + "\n")


if __name__ == "__main__":
    main()
