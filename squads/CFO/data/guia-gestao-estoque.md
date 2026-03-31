# Guia de Gestão de Estoque para Restaurantes
# v3.0 — Modelo Híbrido: Baixa Teórica + Calibração Periódica
# Ref: Abrasel, ABERC, NRA, Sebrae, Kasavana & Smith, USALI

## 1. Conceitos Fundamentais

### CMP (Custo Médio Ponderado)
É o método contábil padrão para valorizar estoques. Evita flutuações bruscas de preço.
**Fórmula:**
`CMP_Novo = ((Qtd_Atual × CMP_Atual) + (Qtd_Entrada × Preço_Entrada)) ÷ (Qtd_Atual + Qtd_Entrada)`

**Exemplo:**
- Estoque atual: 10kg a R$ 20,00 = R$ 200,00
- Compra nova: 10kg a R$ 22,00 = R$ 220,00
- Novo Total: 20kg a R$ 420,00
- **Novo CMP:** R$ 21,00

### PVPS (Primeiro que Vence, Primeiro que Sai)
Regra de ouro para evitar perdas. Organize as prateleiras para que o produto com validade mais próxima esteja na frente.

### Par Stock (Estoque Mínimo Operacional)
Quantidade mínima necessária para operar até a próxima compra, com margem de segurança.
**Fórmula:**
`Par Stock = (Consumo Diário × Dias entre Entregas) + Margem de Segurança`

---

## 2. Modelo de Controle: Baixa Teórica + Calibração Periódica

### Por Que NÃO Pesar Tudo Todo Dia?

A pesagem diária universal é rejeitada pela academia e pela indústria por 5 razões:
1. **Operacionalmente inviável** — Interrompe o fluxo da cozinha no serviço
2. **Imprecisão de WIP** — Alimentos cozidos se misturam entre dias
3. **Fadiga** — Gera erros por cansaço da equipe
4. **Falsa precisão** — Ignora água de cocção, vapores, temperos não pesados
5. **Custo-benefício negativo** — Tempo melhor investido em organização

### O Método Correto (Consenso: Abrasel, ABERC, NRA, Sebrae)

```
DIARIAMENTE (5 min):
  Vendas × Ficha Técnica = Baixa Teórica → Atualiza inventário

SEMANALMENTE (30 min — segunda de manhã):
  Contagem física Curva A (carnes, arroz, feijão, óleo)
  → Compara Real vs. Sistema → Registra desvio → Ajusta inventário

MENSALMENTE (1-2h — 1º domingo):
  Inventário geral completo → Reconciliação → Relatório de desvios
```

### Baixa Teórica: Como Funciona

1. Você vende 5 pratos de Strogonoff
2. A ficha técnica diz: 140g de peito de frango por porção
3. Baixa automática: 5 × 0,140kg = 0,700kg de peito de frango
4. O sistema subtrai do inventário sem precisar pesar

### WIP (Work in Progress): Resolvendo o Problema das Sobras

```
DIA 1: Sobrou 2kg de arroz cozido
  → Registra WIP "arroz-cozido" = 2kg
  → Arroz CRU já baixou pela ficha técnica

DIA 2: Reutiliza sobra (2kg) + produz mais
  → Baixa WIP: -2kg (consumiu)
  → Baixa arroz CRU: via ficha (produção nova)
  → Resultado: Zero duplicidade
```

---

## 3. Curva ABC — Priorização de Controle

A **Curva ABC** classifica os itens pela representatividade no custo total:

| Curva | Critério | Frequência de Contagem | Dia |
|:-----:|----------|:---------------------:|-----|
| **A** | >5% do valor OU proteínas | **Semanal** | Segunda-feira, 8h |
| **B** | 1-5% do valor OU perecíveis | **Quinzenal** | Semanas pares |
| **C** | <1% do valor OU não perecíveis | **Mensal** | 1º domingo do mês |

> **Ref:** A NRA recomenda focar nos "big hitters" — os 20% dos itens que representam 80% do custo. No nosso caso: carnes (65% do valor) + arroz/feijão/óleo (15%).

---

## 4. Rotinas Operacionais

### Recebimento
1. **Conferir Nota vs Pedido:** Preço, quantidade e marca batem?
2. **Conferir Físico:** Pesar na balança (não confie no peso da caixa), checar temperatura de resfriados/congelados.
3. **Checar Validade:** O fornecedor mandou produto "curto"? Devolva.

### Armazenamento
- **Etiquetagem:** NADA entra no estoque sem etiqueta de validade e data de abertura.
- **Categorização:** Mantenha juntos (Laticínios, Carnes, Secos, Hortifrúti).

### Registro de Produção (Diário — 5 minutos)
1. Anotar quantos pratos de cada tipo foram produzidos/vendidos
2. Registrar sobras significativas guardadas (WIP)
3. Registrar perdas (queimados, descartados)

### Calibração Semanal (Segunda-feira — 30 minutos)
1. **Contagem CEGA:** Pesar itens Curva A SEM consultar o sistema
2. **Comparar:** Saldo real vs. saldo do sistema
3. **Registrar GAP:** Anotar desvio e causa provável
4. **Ajustar:** Atualizar sistema com saldo REAL

---

## 5. Tolerâncias de Desvio (Ref: ABERC, Marcelo Politi)

| Faixa | Classificação | Ação |
|:-----:|:------------:|------|
| < 3% | ✅ Excelente | Normal (evaporação, absorção, temperos não pesados) |
| 3-5% | 🟡 Aceitável | Monitorar. Se repetir 3 semanas, investigar |
| 5-10% | 🟠 Atenção | Investigar: porcionamento excessivo? Perdas não registradas? |
| 10-15% | 🔴 Crítico | Ação imediata: recalibrar ficha, treinar equipe, verificar recebimento |
| > 15% | 🚨 Alarme | Possível desvio/furto ou ficha técnica completamente errada |

---

## 6. Controle de Perdas

Tipos comuns e como evitar:
1. **Quebra de Validade:** Falha no PVPS ou compra excessiva.
2. **Avaria:** Manuseio incorreto ou armazenamento ruim.
3. **Desvio:** Furto interno ou entrega menor que a nota.
4. **Porcionamento:** Cozinha usando mais que a ficha técnica.
5. **WIP Descartado:** Sobra que não foi reutilizada a tempo.

---

## 7. Indicadores Chave (KPIs)

- **Giro de Estoque:** Quantas vezes o estoque renova no período. (Ideal: 4-6x/mês para perecíveis).
- **Cobertura de Estoque:** Quantos dias o estoque atual dura. (Ideal: 3-5 dias para frescos, 15-30 para secos).
- **Acuracidade do Inventário:** (Itens Corretos ÷ Total Itens) × 100. Meta: > 95%.
- **Perda %:** (Valor Perda ÷ Faturamento) × 100. Meta: < 2%.
- **GAP Semanal:** (Consumo Real - Consumo Teórico) ÷ Consumo Teórico × 100. Meta: < 5%.
- **CMV Real vs Teórico:** Diferença entre o que deveria gastar (fichas) e o que realmente gastou (inventário). Meta: variância < 3%.
