---
name: criar-campanha
description: Gera uma campanha de marketing completa baseada em um objetivo ou insumo.
inputs:
  - name: objetivo
    type: string
    description: "Ex: Limpar estoque, Aumentar ticket médio, Ocupar terça-feira"
  - name: insumo_foco
    type: string
    description: "Item específico a ser promovido (opcional)"
outputs:
  - Estratégia (Nome e Conceito)
  - Mecânica (Regras, Validade)
  - Canais (WhatsApp, Instagram, Embalagem)
  - Copy (Texto para divulgação)
---

# Task: Criar Campanha

1.  **Identificar o Gatilho**:
    - É uma data especial?
    - É uma necessidade de estoque (PVPS)?
    - É um dia de baixa demanda (RevPASH)?

2.  **Definir a Mecânica**:
    - **Raspadinha/Voucher**: Para LTV e migração de canal.
    - **Combo/Upsell**: Para Ticket Médio.
    - **Preço Isca**: Para tráfego em dias fracos.

3.  **Calcular Viabilidade**:
    - Executar `analisar-viabilidade-promocao` internamente.

4.  **Gerar Criativos**:
    - Título chamativo (Headline).
    - Texto persuasivo (Copy) focado no benefício do cliente.
    - Regras claras (Small print) para evitar prejuízo.
