# Epic: Pipeline Video Intel Multi-Temático c/ YouTube Transcript API

## Contexto e Problema Actual
O script actual `video-to-knowledge.py` depende de baixar o ficheiro de áudio todo via `yt-dlp`, upar para o Gemini, e processar num output gigantesco e monolítico de um só ficheiro markdown.
À medida que novos vídeos são processados, insights sobre um mesmo assunto (ex: iFood, Entrega Própria, Fichas Técnicas) ficam espalhados ao longo de dezenas de ficheiros únicos (`kd-video-1.md`, `kd-video-2.md`). 

## Solução (Especificação Arquitetural)
Desenvolver uma refatoração no pipeline onde:
1. **Extração de Texto Rápida:** Integração da `youtube-transcript-api` para obter as transcrições directamente em modo texto (reduz o tempo de horas para segundos), mantendo `yt-dlp` + Gemini apenas como fallback para vídeos sem caption/concorrentes privados.
2. **Nova Topologia de Arquivos (Thematic DB):** 
    - As transcrições brutas (o "log") ficam armazenadas em `squads/CFO/knowledge/videos/transcripts/`.
    - Os aprendizados (Insights) serão injetados nos arquivos das suas respectivas "Temáticas" em `squads/CFO/knowledge/videos/themes/` (ex: `ifood.md`, `precificacao.md`, `gestao.md`).
3. **Persistência Centralizada e Contextual:** Se a live de "20/02" falar de entrega própria, a "Dica 1" é adicionada em `entrega-propria.md`. Se o vídeo do "25/03" falar o mesmo assunto, será adicionada uma nova secção em `entrega-propria.md`, mantendo toda a sabedoria daquele tema no mesmo lugar, indexado com as timestamps do vídeo original (ex: `[Link - 20:34]`).

## Oportunidades Listadas (Agregando valor ao SPEC):
- **Timestamps Clicáveis (Deep Links):** A API do youtube retorna a minutagem exata. Integrar esses links nas Dicas (ex: `https://youtu.be/ID?t=X`). Assim o `@video-intel` não só dá o resumo mas dá o "Corte do vídeo" para quem quer aprofundar.
- **Smart Append vs Overwrite:** Ao enviar a transcrição para a IA, ela será solicitada a ler (se existir) o arquivo daquele "Theme" e atualizar/adicionar as informações (append) num formato coerente sem apagar as dicas antigas.
- **Índices Secundários:** Modificar o agente `@video-intel` (e orientar o `@gerente-geral`) para consultarem prioritariamente os `themes/`, facilitando o Retrieval RAG.

## Acceptance Criteria (Critérios de Aceite)
- [ ] O script `video-to-knowledge.py` deve permitir extração rápida usando youtube-transcript-api.
- [ ] Ao rodar o pipeline, ele gera a transcrição e depois *faz split* gerando/atualizando `.md` temáticos na pasta `themes/`.
- [ ] As `themes` devem conter hiperlinks com timestamps para a parte exata do vídeo original.
- [ ] O Agente `@video-intel` (`video-intel.md`) deve ser atualizado para buscar dados em `themes/`.
- [ ] O Agente `@gerente-geral` deve ser notificado sobre as novas capabilities de links de vídeo.
