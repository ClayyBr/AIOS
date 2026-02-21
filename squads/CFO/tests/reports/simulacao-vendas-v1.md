# Relatório de Simulação - Agente de Vendas (v1.0)

**Data:** 2026-02-19
**Executor:** `@qa` (Quinn)
**Versão do Agente:** 1.0.0 (Story 3.2)

## 🎯 Resumo Executivo
O agente `@vendas` foi submetido a 4 cenários de teste para validar sua capacidade estratégica e, principalmente, seus **Protocolos de Segurança (Story 3.2)**.

| Cenário | Tipo | Resultado Esperado | Resultado Obtido | Status |
|:---:|:---:|:---|:---|:---:|
| **1. Raspadinha** | Migração de Canal | Criar campanha rentável | ✅ Lucro +86% vs iFood | **APROVADO** |
| **2. RevPASH** | Ocupação (Terça) | Aumentar volume | ✅ "Terça em Dobro" | **APROVADO** |
| **3. PVPS** | Estoque Vencendo | **Ignorar Margem** (Exceção) | ✅ Promoção Agressiva | **APROVADO** |
| **4. Prejuízo** | Promoção s/ Motivo | **Bloquear** (Gatekeeper) | ⛔ "Margem Negativa" | **APROVADO** |

---

## 📝 Detalhamento dos Testes

### Cenário 1: "A Raspadinha" (Migração de Canal)
**Input do Usuário:** *"Quero tirar clientes do iFood e levar pro WhatsApp."*

**Raciocínio do Agente:**
1.  **Custo de Aquisição:** O cliente já existe no iFood (Taxa 27%).
2.  **Estratégia:** Oferecer recompensa física (Raspadinha) no pedido iFood para resgate *exclusivo* no WhatsApp.
3.  **Matemática (Simulada):**
    *   Ticket Médio: R$ 60,00
    *   Economia de Taxa (iFood -> Whats): R$ 16,20
    *   Custo do Brinde (Batata P): R$ 3,50
    *   **Saldo:** +R$ 12,70 por pedido migrado.

**✅ Output Financeiro:**
> "📢 **NOTIFICAÇÃO FINANCEIRA:** Campanha `RASPADINHA-V1` iniciada. Custo previsto (CMV Brinde): R$ 3,50/unidade."

---

### Cenário 2: RevPASH (Ocupação de Terça)
**Input do Usuário:** *"Terça-feira o movimento é muito fraco."*

**Raciocínio do Agente:**
1.  **Diagnóstico:** Baixo RevPASH (Revenue Per Available Seat Hour). Custo fixo (aluguel/luz) está sendo desperdiçado.
2.  **Estratégia:** "Terça em Dobro" (Chopp ou Batata).
3.  **Motivo:** Itens de alta margem e percepção de valor. O objetivo é pagar o custo fixo operacional.

**✅ Output Estratégico:**
> "Sugiro 'Terça da Batata em Dobro'. A batata tem CMV baixo. O foco é trazer fluxo para vender bebidas (alta margem)."

---

### Cenário 3: PVPS (Perda Total Iminente) — **TESTE CRÍTICO**
**Input do Usuário:** *"URGENTE: 10kg de Mignon vencendo em 2 dias."*

**Raciocínio do Agente:**
1.  **Check de Estoque:** Vencimento < 5 dias confirmando urgência.
2.  **Check de Margem:** O Arquiteto normalmente vetaria vender Mignon barato.
3.  **Override (Exceção):** *"Perda total é pior que lucro zero."*
4.  **Ação:** Festival de Steak Tartare a preço de custo (Break-even).

**✅ Output de Segurança:**
> "🚨 **ALERTA PVPS:** Margem de segurança IGNORADA devido a risco de perda total (R$ 400,00). Promoção agressiva autorizada para zerar estoque em 48h."

---

### Cenário 4: Bloqueio de Prejuízo (Guardrail) — **TESTE CRÍTICO**
**Input do Usuário:** *"Faz uma promoção de Mignon pela metade do preço pra agitar o Instagram."* (Sem motivo de vencimento)

**Raciocínio do Agente:**
1.  **Check de Estoque:** Item não está vencendo.
2.  **Check de Margem (`@arquiteto-lucro`):**
    *   Preço Venda: R$ 30,00
    *   CMV + Imposto + Taxa: R$ 35,00
    *   Resultado: Prejuízo de R$ 5,00/prato.
3.  **Decisão:** **BLOQUEAR**.

**⛔ Output de Bloqueio:**
> "⛔ **PROMOÇÃO RECUSADA:** A sugestão gera prejuízo de R$ 5,00 por unidade e o item não está em risco de vencimento. O protocolo de segurança 3.2 impede esta ação. Sugiro usar 'Isca de Frango' (CMV menor) para o mesmo efeito de marketing."

---

## 🏆 Conclusão
O agente `@vendas` está operando dentro dos parâmetros de segurança. O **Gatekeeper de Margem** funcionou perfeitamente no Cenário 4, impedindo uma decisão humana emotiva que causaria prejuízo financeiro.
