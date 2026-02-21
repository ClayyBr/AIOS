# Planejamento AIOS: Cotação Ativa e Atualização Contínua de Custos

**Data:** 2026-02-21
**Autor:** Equipe de Arquitetura (`@architect`)
**Status:** Planejamento (Roadmap Futuro)
**Contexto:** O restaurante precisa manter suas margens de lucro precisas no `financial-registry.yaml`, mas a inflação do setor de A&B (Alimentos e Bebidas) muda semanalmente. Precisamos que o Squad CFO leia cotações e atualize o banco de dados sozinho.

---

## 🎯 O Desafio Atual
Hoje, o restaurante sabe que o Arroz custa R$ 5,00 porque nós o escrevemos no `financial-registry.yaml`. Quando a inflação aumentar esse preço, alguém precisa lembrar de alterar o valor ali, ou todos os DREs e Simuladores do `@ids` emitirão resultados mentirosos.

## 🛠️ A Solução (Cotação Ativa - Web/PDF Scraping)

Faremos com que o CFO Squad tenha um "Comprador Digital". Quando ele receber a nota fiscal ou o PDF do atacadista, ele vai ler, atualizar o sistema e avisar sobre defasagens no cardápio.

### 1. Ingestão de Documentos (`squads/CFO/fornecedores/`)
Nós estabeleceremos a pasta `fornecedores/` como uma "Drop Zone" (Zona de Despejo).
*   Você (ou um hook de email automático) salvará PDFs, tabelas de Excel (.xlsx) ou capturas de tela das promoções do "Assaí" ou "Ceasa" diretamente nela.

### 2. OCR e Entity Matching (Visão Computacional)
Através de um novo Agente ou Script (usando a habilidade global do AIOS de ler arquivos complexos), o sistema será ativado:
1.  Ele lê "ARROZ TIO JOAO 5KG - R$ 26,90" no PDF.
2.  Ele vai até o `financial-registry.yaml` e encontra a entidade `id: insumo-arroz-branco`.
3.  Ele aplica o cálculo de conversão (divide por 5kg para achar o preço do grama) e salva R$ 5,38/kg no banco de dados, criando uma "Data de Atualização".

### 3. Automação de Reprecificação e Alertas (Integração com `@ids`)
Aqui é onde o restaurante se torna inteligente (Enterprise):
*   Sempre que um ingrediente subir mais do que **5%** na Cotação, o Agente de Cotação aciona o **Motor IDS (`@ids`)**.
*   O Motor IDS desce a cascata em todos os pratos (Fichas Técnicas) que usam Arroz e calcula se o CMV de algum prato ultrapassou a linha de segurança (Ex: 35%).
*   **Alerta no Dashboard/Chat:** *"Gestor, o Arroz subiu 8% no Assaí. Isso quebrou o CMV da Parmegiana, que agora está em 36.2%. O `@arquiteto-lucro` recomenda subir o preço do prato no iFood de R$ 45 para R$ 47 para recompor a margem."*

## 📋 Epic/Story para o Gestor de Produto (`@po`)

Quando chegar a hora de automatizar suas compras, passe este Épico ao `@po`:

**Epic Z. Cotação Dinâmica (Smart Procurement)**
- **Story Z.1: Ingestão de Fornecedores.** (Criar módulo de leitura para converter planilhas Excel/CSV ou PDFs do CEASA em JSON bruto).
- **Story Z.2: Parser e Atualização YAML.** (Script para encontrar correspondências [Regex/Agente] entre o item na nota fiscal e a base `financial-registry.yaml` e atualizar o preço).
- **Story Z.3: Trigger de Inflação (IDS Auto-Run).** (Ao detectar variações bruscas, forçar o `@ids` a testar todo o cardápio no background e relatar no Dashboard DRE se algo quebrou a meta de lucro).

---
*Nota do Arquiteto: Para um restaurante real, o lucro não é feito na venda, é feito na COMPRA. Ao automatizar essa rotina, você extingue o maior ralo de dinheiro de restaurantes brasileiros, que é demorar meses para perceber que algo ficou caro.*
