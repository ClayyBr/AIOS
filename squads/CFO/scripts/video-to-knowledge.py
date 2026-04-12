#!/usr/bin/env python3
"""
video-to-knowledge.py — Pipeline de Extração de Conhecimento de Vídeos
Squad CFO — AIOS Core

Converte um arquivo .mp4 (ou URL do YouTube) em um Knowledge Document (KD)
estruturado em Markdown, pronto para ser consumido pelos agentes do squad CFO.

Uso:
    python video-to-knowledge.py --input "caminho/para/video.mp4" --api-key "SUA_CHAVE"
    python video-to-knowledge.py --youtube "https://youtube.com/watch?v=ID" --api-key "SUA_CHAVE"

Requisitos:
    pip install google-genai yt-dlp python-dotenv

Variáveis de ambiente (alternativa ao --api-key):
    GEMINI_API_KEY=sua_chave_aqui
"""

import argparse
import os
import sys
import re
import json
import time
from pathlib import Path
from datetime import datetime

# Fix Windows terminal encoding para suportar emojis
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

# --- Dependências opcionais (instalar se necessário) ---
try:
    from dotenv import load_dotenv
    load_dotenv(dotenv_path=Path(__file__).resolve().parents[3] / ".env")
    load_dotenv()  # também tenta o diretório atual
except ImportError:
    pass

try:
    import google.genai as genai
    from google.genai import types
    GENAI_AVAILABLE = True
except ImportError:
    GENAI_AVAILABLE = False
    print("⚠️  google-genai não instalado. Execute: pip install google-genai")

# --- Configurações ---
OUTPUT_DIR = Path(__file__).resolve().parent.parent / "knowledge" / "videos"
INDEX_FILE = OUTPUT_DIR / "README.md"
SQUAD = "CFO"

# Prompt de extração de insights
EXTRACTION_PROMPT = """
Você é um analista estratégico especialista em foodservice, delivery e marketplaces no Brasil.
Analise a transcrição/conteúdo do vídeo fornecido e produza um Knowledge Document estruturado.

O restaurante em questão opera no regime Simples Nacional, serve buffet e executivos (marmitex),
está nos marketplaces (iFood principalmente) e quer otimizar custos e estratégias de delivery.

Produza o seguinte documento em Português Brasileiro (pt-BR):

---
## Resumo Executivo
[2-4 parágrafos resumindo os principais temas e mensagens do vídeo. Direto ao ponto.]

## 🏆 Insights Chave por Tema

### 💰 Comissões e Margens nos Marketplaces
[Liste os insights sobre taxas, comissões, margens. Use bullet points.]

### 🎯 Estratégias de Precificação para Delivery
[Estratégias mencionadas para precificar produtos no delivery.]

### ⚔️ Dinâmica da Guerra dos Marketplaces
[O que está acontecendo entre iFood, Rappi, Anota AI, etc.]

### 📦 Operações e Logística
[Insights sobre operação, embalagem, raio de entrega, etc.]

### 🚀 Oportunidades Identificadas
[Oportunidades concretas que o restaurante pode aproveitar.]

### ⚠️ Riscos e Alertas
[Alertas sobre mudanças no mercado que podem impactar negativamente.]

## 💬 Citações Relevantes
[5-8 trechos literais ou parafraseados mais importantes do vídeo, com contexto.]

## 🏷️ Tags e Temas Abordados
[Liste as tags/palavras-chave do conteúdo, separadas por vírgula.]
---

Se alguma seção não se aplicar ao conteúdo do vídeo, omita-a.
Priorize precisão e aplicabilidade prática para um dono de restaurante small business no Brasil.
"""


def get_api_key(args):
    """Obtém a chave da API do argumento ou variável de ambiente."""
    key = args.api_key or os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
    if not key:
        print("❌ Chave da API não encontrada.")
        print("   Use --api-key 'SUA_CHAVE' ou defina a variável GEMINI_API_KEY no .env")
        sys.exit(1)
    return key


def sanitize_filename(text):
    """Converte título em nome de arquivo seguro."""
    text = text.lower()
    text = re.sub(r'[àáâãäå]', 'a', text)
    text = re.sub(r'[èéêë]', 'e', text)
    text = re.sub(r'[ìíîï]', 'i', text)
    text = re.sub(r'[òóôõö]', 'o', text)
    text = re.sub(r'[ùúûü]', 'u', text)
    text = re.sub(r'[ç]', 'c', text)
    text = re.sub(r'[ñ]', 'n', text)
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'[\s_]+', '-', text)
    text = re.sub(r'-+', '-', text)
    return text.strip('-')[:80]


def download_youtube_audio(url: str) -> Path:
    """Baixa áudio de vídeo do YouTube."""
    try:
        import yt_dlp
    except ImportError:
        print("❌ yt-dlp não instalado. Execute: pip install yt-dlp")
        sys.exit(1)

    output_path = Path("_yt_temp_audio.mp3")
    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': str(output_path.with_suffix('')),
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '128',
        }],
        'quiet': True,
    }

    print(f"📥 Baixando áudio do YouTube: {url}")
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=True)
        title = info.get('title', 'video-youtube')
        description = info.get('description', '')

    return output_path, title, description


def upload_and_process_video(client, video_path: Path) -> str:
    """Faz upload do vídeo/áudio para Gemini e gera o conteúdo do KD."""
    
    # Determinar MIME type
    suffix = video_path.suffix.lower()
    mime_map = {
        '.mp4': 'video/mp4',
        '.mp3': 'audio/mp3',
        '.m4a': 'audio/mp4',
        '.wav': 'audio/wav',
        '.webm': 'video/webm',
        '.mkv': 'video/mp4',
    }
    mime_type = mime_map.get(suffix, 'video/mp4')
    file_size_mb = video_path.stat().st_size / (1024 * 1024)
    
    print(f"📤 Fazendo upload do arquivo: {video_path.name} ({file_size_mb:.1f} MB)")
    print("   Aguarde... (pode demorar alguns minutos para arquivos grandes)")

    with open(video_path, 'rb') as f:
        uploaded_file = client.files.upload(
            file=f,
            config=types.UploadFileConfig(
                display_name=video_path.stem,
                mime_type=mime_type,
            )
        )

    # Aguardar processamento
    print("⏳ Processando arquivo no Gemini... ", end='', flush=True)
    max_wait = 300  # 5 minutos
    waited = 0
    while uploaded_file.state.name == "PROCESSING":
        time.sleep(5)
        waited += 5
        uploaded_file = client.files.get(name=uploaded_file.name)
        print(".", end='', flush=True)
        if waited >= max_wait:
            print(f"\n❌ Timeout: arquivo ainda processando após {max_wait}s")
            sys.exit(1)

    if uploaded_file.state.name == "FAILED":
        print(f"\n❌ Falha no processamento do arquivo: {uploaded_file.state}")
        sys.exit(1)

    print(f" ✅ Pronto!")

    # Gerar Knowledge Document — tenta modelos em ordem de preferência
    print("🧠 Extraindo insights com Gemini...")
    models_to_try = ["gemini-2.0-flash", "gemini-1.5-flash", "gemini-1.5-pro"]
    model_response = None
    last_error = None

    for model_name in models_to_try:
        try:
            print(f"   Tentando modelo: {model_name}...")
            model_response = client.models.generate_content(
                model=model_name,
                contents=[
                    types.Content(
                        role="user",
                        parts=[
                            types.Part.from_uri(
                                file_uri=uploaded_file.uri,
                                mime_type=mime_type,
                            ),
                            types.Part.from_text(text=EXTRACTION_PROMPT),
                        ]
                    )
                ],
                config=types.GenerateContentConfig(
                    temperature=0.3,
                    max_output_tokens=8192,
                )
            )
            print(f"   ✅ Modelo {model_name} respondeu com sucesso!")
            break
        except Exception as e:
            last_error = e
            err_str = str(e)
            if "429" in err_str or "RESOURCE_EXHAUSTED" in err_str or "quota" in err_str.lower():
                print(f"   ⚠️  Quota esgotada no modelo {model_name}, tentando próximo...")
                continue
            else:
                raise

    if model_response is None:
        print(f"\n❌ Todos os modelos falharam por quota. Erro: {last_error}")
        print("   Tente novamente em alguns minutos, ou use uma chave com plano pago.")
        # Salvar o arquivo de upload para reuso (não deletar)
        print(f"   O arquivo já está no Gemini: {uploaded_file.name}")
        print(f"   Para reprocessar sem re-upload, use --file-uri {uploaded_file.uri}")
        sys.exit(1)

    # Limpar arquivo temporário do Gemini
    try:
        client.files.delete(name=uploaded_file.name)
    except Exception:
        pass

    return model_response.text


def build_knowledge_document(content: str, title: str, source: str, tags: list) -> str:
    """Monta o Knowledge Document final no formato padrão."""
    date_today = datetime.now().strftime("%Y-%m-%d")
    tags_str = ", ".join(tags) if tags else "marketplace, delivery, foodservice"
    
    # Extrair tags do conteúdo gerado (última seção)
    tags_match = re.search(r'## 🏷️ Tags.*?\n(.+)', content, re.DOTALL)
    if tags_match:
        extracted_tags = tags_match.group(1).strip().split('\n')[0]
        tags_str = extracted_tags if extracted_tags else tags_str
        # Remover a seção de tags do corpo (já está no frontmatter)
        content = content[:tags_match.start()].strip()

    kd = f"""---
title: "{title}"
source: {source}
date_processed: {date_today}
tags: [{tags_str}]
squad: {SQUAD}
relevance:
  - gerente-geral
  - financeiro
  - vendas
  - arquiteto-lucro
---

# 📹 {title}

> **Knowledge Document gerado automaticamente** a partir do conteúdo do vídeo.
> Data de processamento: {date_today} | Fonte: `{source}`

---

{content}

---

*KD gerado por `video-to-knowledge.py` — Squad CFO / AIOS Core*
"""
    return kd


def update_index(kd_filename: str, title: str, tags_str: str, date: str):
    """Atualiza o README.md (índice) com o novo KD."""
    entry = f"| [{title}]({kd_filename}) | {tags_str[:60]}... | {date} |\n"
    
    if not INDEX_FILE.exists():
        content = f"""# 📹 Base de Conhecimento — Vídeos e Conteúdos

Repositório de Knowledge Documents (KDs) gerados a partir de vídeos, lives e conteúdos estratégicos.

Os agentes do Squad CFO consultam esta base para enriquecer respostas sobre:
- Estratégias de marketplace e delivery
- Precificação e margens no iFood/Rappi
- Tendências do setor foodservice no Brasil
- Gestão operacional e financeira

## Como Consultar

Os agentes consultam automaticamente. Para consulta direta: `@video-intel *buscar [tema]`

## Como Adicionar Novos Vídeos

```bash
python squads/CFO/scripts/video-to-knowledge.py --input "caminho/video.mp4"
python squads/CFO/scripts/video-to-knowledge.py --youtube "https://youtube.com/watch?v=ID"
```

## 📚 Índice de Knowledge Documents

| Título | Temas | Data |
|--------|-------|------|
{entry}"""
        INDEX_FILE.write_text(content, encoding='utf-8')
        print(f"✅ Índice criado: {INDEX_FILE}")
    else:
        # Append ao índice existente
        text = INDEX_FILE.read_text(encoding='utf-8')
        if kd_filename not in text:
            text = text.rstrip() + "\n" + entry
            INDEX_FILE.write_text(text, encoding='utf-8')
            print(f"✅ Índice atualizado: {INDEX_FILE}")


def main():
    parser = argparse.ArgumentParser(
        description="Converte vídeos em Knowledge Documents para os agentes do Squad CFO"
    )
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument(
        "--input", "-i",
        help="Caminho para o arquivo de vídeo/áudio (.mp4, .mp3, .m4a)"
    )
    group.add_argument(
        "--youtube", "-y",
        help="URL do vídeo no YouTube"
    )
    parser.add_argument(
        "--api-key", "-k",
        help="Chave da API do Google Gemini (ou use variável GEMINI_API_KEY)"
    )
    parser.add_argument(
        "--title", "-t",
        help="Título personalizado para o Knowledge Document"
    )
    parser.add_argument(
        "--tags",
        help="Tags extras separadas por vírgula (ex: 'marketplace,ifood,comissao')"
    )
    parser.add_argument(
        "--output-dir", "-o",
        help=f"Diretório de saída (padrão: {OUTPUT_DIR})"
    )
    args = parser.parse_args()

    if not GENAI_AVAILABLE:
        print("❌ Instale as dependências: pip install google-genai python-dotenv")
        sys.exit(1)

    # Configurar cliente
    api_key = get_api_key(args)
    client = genai.Client(api_key=api_key)

    # Configurar output
    output_dir = Path(args.output_dir) if args.output_dir else OUTPUT_DIR
    output_dir.mkdir(parents=True, exist_ok=True)

    # Tags extras
    extra_tags = [t.strip() for t in args.tags.split(',')] if args.tags else []
    default_tags = ["marketplace", "delivery", "foodservice", "brasil"]

    # Processar fonte
    if args.input:
        video_path = Path(args.input)
        if not video_path.exists():
            print(f"❌ Arquivo não encontrado: {video_path}")
            sys.exit(1)
        title = args.title or video_path.stem
        source = f"arquivo-local:{video_path.name}"
        generated_content = upload_and_process_video(client, video_path)

    elif args.youtube:
        audio_path, yt_title, _ = download_youtube_audio(args.youtube)
        title = args.title or yt_title
        source = f"youtube:{args.youtube}"
        try:
            generated_content = upload_and_process_video(client, audio_path)
        finally:
            # Limpar áudio temporário
            if audio_path.exists():
                audio_path.unlink()

    # Montar KD
    all_tags = list(set(extra_tags + default_tags))
    kd_content = build_knowledge_document(generated_content, title, source, all_tags)

    # Salvar KD
    safe_name = sanitize_filename(title)
    filename = f"kd-{safe_name}.md"
    output_path = output_dir / filename

    # Evitar sobrescrever
    counter = 1
    while output_path.exists():
        output_path = output_dir / f"kd-{safe_name}-{counter}.md"
        counter += 1

    output_path.write_text(kd_content, encoding='utf-8')
    print(f"\n✅ Knowledge Document salvo: {output_path}")

    # Atualizar índice
    tags_extract = re.search(r'tags: \[(.+?)\]', kd_content)
    tags_for_index = tags_extract.group(1) if tags_extract else ", ".join(all_tags)
    update_index(filename, title, tags_for_index, datetime.now().strftime("%Y-%m-%d"))

    print(f"\n🎉 Pipeline concluído!")
    print(f"   KD: {output_path}")
    print(f"   Índice: {INDEX_FILE}")
    print(f"\n   Os agentes @gerente-geral, @financeiro e @vendas já podem consultar este KD.")


if __name__ == "__main__":
    main()
