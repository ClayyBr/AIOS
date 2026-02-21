# Insight AIOS: Sistema de Logs Dinâmicos e Baixa Ativa de Estoque

**Data:** 2026-02-21
**Autor:** Equipe de Arquitetura (`@architect`)
**Status:** Planejamento (Roadmap Futuro)
**Contexto:** O Squad CFO hoje é puramente consultivo e opera sobre dados estáticos (Simulações de Custo). Para gerir um restaurante de verdade, o CFO precisa saber **o que foi vendido de fato**. Este documento planeja a V2 do módulo de Estoque.

---

## 🎯 O Desafio Atual
O `financial-registry.yaml` sabe o preço de 1kg do Tomate.
O `@arquiteto-lucro` sabe que o prato `Parmegiana` gasta 100g de Tomate.
**Mas ninguém sabe quantas Parmegianas saíram hoje, logo, o estoque é cego para as baixas.**

## 🛠️ A Solução (Design do Sistema de Logs)

O objetivo é transformar o `@controlador-estoque` de um assistente passivo, em um "Relojoeiro Noturno" que processa as vendas e calcula o uso em cascata dos ingredientes.

### 1. Criar o Cofre de Vendas Diárias (`sales-logs.yaml`)
Criaremos um novo banco de dados leve (`squads/CFO/estoque/sales-logs.yaml`) para registrar apenas a saída da ponta (Pratos Prontos).
*   **A Rota de Entrada:** O usuário/garçom informará o sistema via chat: *"Fechamento de Terça: 18 Parmegianas, 22 Stroganoffs e 5 Nhoques"*.
*   O Agent Parser salvará essas quantidades no `sales-logs.yaml` vinculando-as com a data de emissão.

### 2. O Algoritmo de Baixa em Cascata (O Cérebro do Estoque)
Sempre que um dia for "Fechado", um Script Baseado em Agente (Node.js + Instância do `@controlador-estoque`) será engatilhado:
1.  **Leitura do Log:** Lê que saíram 18 Parmegianas do `sales-logs.yaml`.
2.  **Consulta da Ficha:** Abre o `fichas/parmegiana.md` gerado pelo `@arquiteto-lucro` e descobre todos os ingredientes lá dentro (Carne, Queijo, Tomate).
3.  **A Multiplicação:** Multiplica `100g de tomate * 18 pratos = 1.8kg consumidos`.
4.  **A Baixa Real:** Subtrai 1.8kg do inventário geral virtual.

### 3. Sistema de Alerta Ativo (Push Notifications)
O Agente não espera que você pergunte. Na manhã seguinte ao fechamento, o `@controlador-estoque` terá lido sua meta de **Par Stock** (Estoque de Segurança) em seu *Knowledge Base*.
*   Se o Tomate no banco de dados baixou para menos que a cota mínima de operação de 3 dias, ele envia ou cria um card/Alerta Urgente:
    *   🚨 *"ALERTA DE RUPTURA: Baseado nas baixas das Parmegianas de ontem, restam apenas 3kg de Tomate. A meta do Par Stock é 10kg. Por favor, acione o Fornecedor Hortifruti ainda pela manhã."*

## 📋 Epic/Story para o Gestor de Produto (`@po`)

Para o Agente PO (`@po`) transformar isso em ações de desenvolvimento, ele abrirá um Épico quando o restaurante estiver prestes a rodar vendas reais:

**Epic Y. Gestão Ativa de Baixas (Smart Inventory)**
- **Story Y.1: Tabela de Logs Diários.** (Setup do JSON/YAML para input diário e histórico de vendas de pratos).
- **Story Y.2: Script de Multiplicação de Fichas (Cascata Inversa).** (Um script automatizado `scripts/inventory-sync.js` que lê o log, abre as fichas do `@arquiteto-lucro` e deduz a sub-receita dos ingredientes in natura na raiz).
- **Story Y.3: Trigger de Alerta de Ruptura.** (Ensinar o `@controlador-estoque` a varrer os estoques deduzidos pela manhã e gritar - via webhook ou CLI log - quando `Estoque Atual < Par Stock`).

---
*Nota do Arquiteto: Para restauradores, essa funcionalidade tira o AIOS do título de "Calculadora de Preços" para um "ERP Invisível e Autônomo". O dono só precisa enviar mensagens no WhatsApp (via integrações) ou no Chat relatando pratos vendidos, e as compras da semana se baseiam em consumo 100% real rastreado pelas Fichas Técnicas.*
