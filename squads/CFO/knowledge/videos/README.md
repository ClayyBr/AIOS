# 📹 Base de Conhecimento — Vídeos e Conteúdos

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
# Para arquivo local (.mp4, .mp3):
python squads/CFO/scripts/video-to-knowledge.py --input "caminho/video.mp4" --api-key "SUA_CHAVE"

# Para vídeo do YouTube:
python squads/CFO/scripts/video-to-knowledge.py --youtube "https://youtube.com/watch?v=ID" --api-key "SUA_CHAVE"
```

O script irá:
1. Fazer upload do vídeo para a Gemini API (File API)
2. Extrair transcrição e insights automaticamente com Gemini
3. Salvar o Knowledge Document em `knowledge/videos/`
4. Atualizar este índice automaticamente

## 📚 Índice de Knowledge Documents

| Título | Temas | Data | Status |
|--------|-------|------|--------|
| [LIVE DO DELIVERY DE OURO — Guerra dos Marketplaces no Brasil](kd-live-delivery-ouro-guerra-dos-marketplaces-no-brasil.md) | marketplace, ifood, rappi, delivery, comissoes, guerra-marketplace | 2026-04-11 | ⏳ Pendente transcrição completa |

## 📌 Como Completar KDs Pendentes

Para os KDs com status "⏳ Pendente transcrição completa", re-execute o script após a renovação da quota da API Gemini (a cada 24h no free tier).

Para resolver definitivamente, recomenda-se usar uma chave Gemini com plano pago ou configurar uma nova chave no `.env` do projeto:
```
GEMINI_API_KEY=sua_chave_aqui
```
