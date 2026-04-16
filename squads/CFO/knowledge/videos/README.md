# 📹 Base de Conhecimento — Vídeos e Lives

Repositório de Knowledge Documents gerados a partir de vídeos, lives e conteúdos estratégicos.

Os agentes do Squad CFO consultam esta base para enriquecer respostas sobre:
- Estratégias de marketplace e delivery
- Otimização de cardápio e conversão
- Logística e operação
- Gestão financeira e crescimento

## Como Consultar

Os agentes consultam automaticamente. Para consulta direta: `@video-intel *buscar [tema]`

## Como Adicionar Novos Vídeos

```bash
# Extrai transcrição (sem custo de API de IA):
python squads/CFO/scripts/video-to-knowledge.py -y "LINK_YOUTUBE" --title "Título da Live"
```

O script salva a transcrição em `transcripts/`. Em seguida, o `@video-intel` analisa e atualiza os arquivos em `themes/`.

---

## 📚 Arquivos Temáticos (themes/)

| Tema | Arquivo | Última Atualização |
|------|---------|-------------------|
| Estratégias na 99Food | [99food.md](themes/99food.md) | 2026-04-15 |
| Logística e Operação | [logistica-operacional.md](themes/logistica-operacional.md) | 2026-04-15 |
| Cardápio e Conversão | [cardapio-conversao.md](themes/cardapio-conversao.md) | 2026-04-15 |
| Estratégia Multicanal (iFood + 99 + Quita) | [estrategia-multicanal.md](themes/estrategia-multicanal.md) | 2026-04-16 |
| Fidelização e CRM | [fidelizacao-clientes.md](themes/fidelizacao-clientes.md) | 2026-04-16 |
| Precificação e Margem | [precificacao.md](themes/precificacao.md) | 2026-04-16 |

## 📼 Transcrições Indexadas (transcripts/)

| Título | Arquivo | Data |
|--------|---------|------|
| Live iFood e Tendencias Marketplace 2026 | [2026-04-15-live-ifood-e-tendencias-marketplace-2026.md](transcripts/2026-04-15-live-ifood-e-tendencias-marketplace-2026.md) | 2026-04-15 |
| Live Delivery 2 — Guerra dos Aplicativos | [2026-04-16-live-delivery-2.md](transcripts/2026-04-16-live-delivery-2.md) | 2026-04-16 |
