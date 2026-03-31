# Análise de Custos e CMV: Marmitex Tamanhos P, M e G

Com a precificação estabelecida pelos sócios, temos os preços fixos unificados: **P: R$ 18,00**, **M: R$ 22,00** e **G: R$ 35,00**, independentemente da proteína do dia (frango, suíno ou bovino). A regra de montagem estabelecida é **1 Proteína + 2 Guarnições**.

> ⚠️ **Versão corrigida em 31/03/2026** — Cálculos agora usam FC (Fator de Correção) e FCc (Fator de Cocção) da `tabela-fatores-correcao.yaml`. A versão anterior subestimava o CMV em ~8-10 pontos percentuais.

---

## ⚖️ Padrão de Gramatura e Escala (Calibrado 30/03/2026)

*   **Pequena (P):** **450-500g** servidas
*   **Média (M):** **750-800g** servidas. Carro-chefe da casa.
*   **Grande (G):** **1.140-1.200g** servidas. Serve facilmente 2 pessoas.

---

## 📊 Tabela de Custos e CMV (Corrigida com FC/FCc)
*Fonte: `relatorios/CMV_Real_Marmitex_30-03.md` (versão corrigida 31/03)*

| Tamanho | Peso Servido | Custo Médio (R$) | Preço Venda | CMV Médio | Lucro Bruto | Status |
|---------|-------------|------------------|-------------|-----------|-------------|--------|
| **P** (Pequena) | ~470g | R$ 4,53 | **R$ 18,00** | **25,2%** ✅ | R$ 13,47 | Saudável |
| **M** (Padrão) | ~770g | R$ 7,18 | **R$ 22,00** | **32,6%** ⚠️ | R$ 14,82 | No limite |
| **G** (Grande) | ~1.160g | R$ 10,42 | **R$ 35,00** | **29,8%** ✅ | R$ 24,58 | Saudável |

> **Análise (31/03 — Corrigida):** O CMV real ficou 8 a 10 pontos percentuais acima do cálculo anterior. A Marmitex M está no limite do benchmark Abrasel (28-35%), puxada pelo alto custo da Carne Moída. A estratégia de proteínas baratas (Suíno, Frango) continua viável, mas a Carne Moída M requer ajuste de gramatura.

---

## 🥩 CMV por Proteína (Referência rápida — Tamanho M)

| Proteína | Custo Total M | CMV % | Status |
|----------|:---:|:---:|---|
| Bisteca Suína | R$ 6,46 | **29,4%** | ✅ Dentro da meta |
| Frango ao Molho | R$ 6,72 | **30,5%** | ⚠️ Limite — monitorar |
| Carne Moída (Acém) | R$ 8,36 | **38,0%** | 🚨 **Acima do teto** — reduzir gramatura |

---

## 🔄 Histórico de Revisão

| Data | Versão | CMV M Médio | Motivo |
|------|--------|-------------|--------|
| 30/03/2026 | v1 (errada) | 23,4% | Cálculo sem FC/FCc |
| 31/03/2026 | **v2 (corrigida)** | **32,6%** | Aplicação correta de FC/FCc |
