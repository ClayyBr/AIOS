---
name: download-video
description: Baixa um vídeo de uma URL especificada
agent: downloader
---

# Task: Download Video

Esta tarefa coordena o processo de download de um vídeo.

## Inputs

- `url`: A URL do vídeo a ser baixado (Obrigatório)
- `format`: Formato desejado (opcional, padrão: best)
- `outputDir`: Diretório de saída (opcional, padrão: ./downloads)

## Steps

1.  **Validate URL**: Verificar se a URL foi fornecida.
2.  **Prepare Directory**: Garantir que o diretório de saída existe.
3.  **Execute Download**: Usar a ferramenta `ytdlp-wrapper` para baixar o vídeo.
4.  **Verify File**: Confirmar que o arquivo foi criado com sucesso.

## Example Usage

```bash
*download-video --url "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
```
