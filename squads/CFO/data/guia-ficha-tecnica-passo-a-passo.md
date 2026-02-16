# Guia Completo: Como Criar Fichas Técnicas de Preparo do Zero

## Sumário Executivo

A Ficha Técnica de Preparo (FTP) é o documento mais importante na gestão de custos de um restaurante. É ela que transforma uma "receita de cozinha" em um "contrato financeiro". Sem fichas técnicas, não existe CMV Teórico, não existe precificação correta e não existe controle — apenas suposição. Este guia ensina a construir fichas técnicas completas, desde a pesagem do primeiro ingrediente até o cálculo final do custo por porção.

---

## 1. Os Dois Tipos de Ficha Técnica

Toda operação profissional precisa de **duas versões** da mesma ficha, com públicos e objetivos distintos:

### 1.1 Ficha Técnica Operacional (Para a Cozinha)

**Objetivo:** Padronização de preparo e montagem.

**Contém:**
- Nome do prato e foto da montagem final
- Lista de ingredientes com unidades de medida práticas (ex: "2 conchas rasas", "1 colher de sopa cheia")
- Modo de preparo detalhado, passo a passo
- Tempo de preparo e cocção
- Temperatura do forno/fogão/fritadeira
- Utensílios de porcionamento obrigatórios (concha numerada, aro de montagem, balança)
- Peso final da porção montada
- Observações de apresentação (como posicionar no prato, guarnição, decoração)

**Regra de Ouro:** O cozinheiro que nunca viu o prato deve conseguir reproduzi-lo **identicamente** apenas seguindo esta ficha.

### 1.2 Ficha Técnica Gerencial/Financeira (Para o Gestor)

**Objetivo:** Apuração de custo e precificação.

**Contém:**
- Lista completa de ingredientes com peso bruto (PB), Fator de Correção (FC), peso líquido (PL), Fator de Cocção (FCc), peso servido
- Custo unitário de cada ingrediente (por kg, litro ou unidade)
- Custo da porção de cada ingrediente
- Custo total do prato (soma de todas as porções)
- Custo percentual de cada ingrediente em relação ao total (permite identificar onde está o peso do custo)
- Rendimento do lote (se batch cooking)
- Data da última atualização de preços

**Regra de Ouro:** O gestor deve olhar esta ficha e saber **exatamente** quanto custa cada grama servida no prato do cliente.

---

## 2. Passo a Passo: Criando Sua Primeira Ficha Técnica

### Passo 1: Listar Todos os Ingredientes (Peso Bruto)

Prepare o prato **uma vez**, pesando cada ingrediente **antes** de qualquer manipulação, exatamente como chegou do fornecedor.

**Exemplo — Filé Mignon ao Molho Madeira com Arroz e Legumes:**

| Ingrediente | Peso Bruto (PB) | Unidade |
|-------------|-----------------|---------|
| Filé Mignon | 220g | gramas |
| Sal | 2g | gramas |
| Pimenta-do-reino | 0,5g | gramas |
| Azeite de oliva | 10ml | mililitros |
| Cebola | 30g | gramas |
| Vinho Madeira | 30ml | mililitros |
| Fundo de carne | 60ml | mililitros |
| Creme de leite | 20ml | mililitros |
| Manteiga | 10g | gramas |
| Arroz branco (cru) | 80g | gramas |
| Brócolis | 60g | gramas |
| Cenoura | 40g | gramas |

**Dica Crítica:** Pese TUDO, inclusive sal, azeite e temperos. Em 500 pratos/mês, 10ml de azeite extra-virgem (R$ 0,50) por prato = R$ 250,00 de custo invisível.

### Passo 2: Aplicar o Fator de Correção (FC)

O Fator de Correção transforma o **peso bruto** (como comprado) em **peso líquido** (pronto para cozinhar), descontando cascas, sementes, ossos, gordura, aparas.

**A fórmula:**

$$FC = \frac{Peso\ Bruto\ (PB)}{Peso\ Líquido\ (PL)}$$

**Portanto, para encontrar o peso líquido:**

$$PL = \frac{PB}{FC}$$

**E para encontrar o custo real por kg utilizável:**

$$Custo_{kg\ utilizável} = Custo_{kg\ bruto} \times FC$$

**Aplicando ao exemplo:**

| Ingrediente | PB (g) | FC | PL (g) | Perda (g) |
|-------------|--------|-----|--------|-----------|
| Filé Mignon | 220 | 1,25 | 176 | 44 |
| Cebola | 30 | 1,67 | 18 | 12 |
| Brócolis | 60 | 1,87 | 32 | 28 |
| Cenoura | 40 | 1,17 | 34 | 6 |
| Arroz (cru) | 80 | 1,00 | 80 | 0 |
| Sal, azeite, etc. | — | 1,00 | — | 0 |

**Interpretação:** Dos 220g de filé mignon comprados, apenas 176g chegam ao prato. Os outros 44g são gordura e aparas. Isso significa que o custo real do filé **por porção servida** é 25% mais caro do que o preço de compra sugere.

### Passo 3: Aplicar o Fator de Cocção (FCc)

O Fator de Cocção (ou Índice de Rendimento por Cocção) mede a variação de peso **depois de cozinhar**.

- Proteínas **encolhem** (perdem água e gordura): FCc > 1 (custo sobe)
- Grãos e leguminosas **expandem** (absorvem água): FCc < 1 (custo cai)

**A fórmula:**

$$FCc = \frac{Peso\ Líquido\ (cru)}{Peso\ Após\ Cocção}$$

**Aplicando:**

| Ingrediente | PL cru (g) | FCc | Peso cozido (g) | Efeito |
|-------------|-----------|------|-----------------|--------|
| Filé Mignon (grelhado) | 176 | 1,30 | 135 | Encolhe 30% |
| Arroz branco | 80 | 0,40 | 200 | Rende 2,5x |
| Brócolis (vapor) | 32 | 1,05 | 30 | Encolhe pouco |
| Cenoura (vapor) | 34 | 1,03 | 33 | Encolhe pouco |

**Peso final servido do filé:** 135g (a partir de 220g comprados). Essa é a realidade que o preço de venda precisa cobrir.

### Passo 4: Calcular o Custo de Cada Ingrediente por Porção

Agora conectamos o peso ao custo financeiro.

**A fórmula do custo por porção:**

$$Custo_{porção} = \frac{PB \times Custo_{kg}}{1000}$$

Ou, sendo mais preciso (usando o custo corrigido pelo FC):

$$Custo_{porção} = \frac{PB \times (Custo_{kg} \times FC)}{1000 \times FC} = \frac{PB \times Custo_{kg}}{1000}$$

Na prática, como você compra o peso bruto e usa o peso bruto na receita, o cálculo simplifica: basta multiplicar o peso bruto usado pelo custo por grama.

**Exemplo com preços reais (estimativa Brasil 2026):**

| Ingrediente | PB (g/ml) | Custo/kg ou /L | Custo Porção |
|-------------|-----------|----------------|--------------|
| Filé Mignon | 220g | R$ 89,90/kg | R$ 19,78 |
| Sal | 2g | R$ 2,50/kg | R$ 0,01 |
| Pimenta-do-reino | 0,5g | R$ 120,00/kg | R$ 0,06 |
| Azeite de oliva | 10ml | R$ 45,00/L | R$ 0,45 |
| Cebola | 30g | R$ 7,90/kg | R$ 0,24 |
| Vinho Madeira | 30ml | R$ 85,00/L | R$ 2,55 |
| Fundo de carne | 60ml | R$ 18,00/L | R$ 1,08 |
| Creme de leite | 20ml | R$ 14,00/L | R$ 0,28 |
| Manteiga | 10g | R$ 55,00/kg | R$ 0,55 |
| Arroz branco | 80g | R$ 6,50/kg | R$ 0,52 |
| Brócolis | 60g | R$ 14,90/kg | R$ 0,89 |
| Cenoura | 40g | R$ 5,90/kg | R$ 0,24 |
| **TOTAL** | — | — | **R$ 26,65** |

### Passo 5: Montar a Ficha Técnica Gerencial Completa

**FICHA TÉCNICA GERENCIAL**

| Campo | Valor |
|-------|-------|
| **Prato** | Filé Mignon ao Molho Madeira |
| **Categoria** | Prato Executivo — Proteína Nobre |
| **Rendimento** | 1 porção |
| **Peso final servido** | ~398g (135g filé + 200g arroz + 63g legumes) |
| **Custo total** | R$ 26,65 |
| **Data** | Fev/2026 |

**Decomposição de custo por grupo:**

| Grupo | Custo | % do Total |
|-------|-------|-----------|
| Proteína (filé) | R$ 19,78 | 74,2% |
| Molho (vinho, fundo, creme, manteiga) | R$ 4,46 | 16,7% |
| Guarnição (arroz, legumes) | R$ 1,65 | 6,2% |
| Temperos e gorduras | R$ 0,76 | 2,9% |
| **Total** | **R$ 26,65** | **100%** |

**Insight:** 74,2% do custo está na proteína. Qualquer variação de preço do filé mignon impacta drasticamente o CMV deste prato. A margem de manobra está no molho e na guarnição.

### Passo 6: Validar com Teste Real (O "Butcher Test Caseiro")

Após montar a ficha teórica, faça **3 testes práticos**:

1. **Teste 1:** Cozinheiro A prepara o prato seguindo a ficha operacional. Pese o resultado.
2. **Teste 2:** Cozinheiro B (ou o mesmo, em outro dia) repete. Pese o resultado.
3. **Teste 3:** Compare os pesos e custos dos 3 testes.

**Se a variação entre os testes for superior a 5% no peso final**, há problema de padronização. As causas mais comuns são:

- Utensílio de porcionamento errado (concha grande demais)
- Falta de balança na cozinha
- "Olhômetro" no tempero
- Corte do filé inconsistente

Corrija e refaça até que os 3 testes estejam dentro de 5% de variação.

---

## 3. Ficha Técnica para Buffet por Quilo

No buffet, a lógica é diferente. Você não faz ficha técnica por "prato do cliente" (porque ele monta o próprio prato), mas sim por **preparação do buffet**.

### 3.1 Ficha de Produção do Buffet

**Exemplo — Frango Grelhado (Preparação para Buffet):**

| Campo | Valor |
|-------|-------|
| **Preparação** | Frango Grelhado Temperado |
| **Tipo** | Proteína Principal |
| **Rendimento do Lote** | 50 porções (estimativa) |
| **Período** | Almoço |

| Ingrediente | PB Total | Custo/kg | Custo Total Lote |
|-------------|----------|----------|-----------------|
| Sobrecoxa de frango s/ osso | 8.000g | R$ 18,90/kg | R$ 151,20 |
| Alho | 100g | R$ 45,00/kg | R$ 4,50 |
| Sal | 80g | R$ 2,50/kg | R$ 0,20 |
| Azeite | 200ml | R$ 45,00/L | R$ 9,00 |
| Limão (suco) | 150ml | R$ 8,00/L | R$ 1,20 |
| Páprica | 30g | R$ 85,00/kg | R$ 2,55 |
| **TOTAL LOTE** | — | — | **R$ 168,65** |

**Custo por kg produzido:**

$$Custo_{kg} = \frac{R\$\ 168,65}{Peso\ total\ cozido}$$

Se 8kg de sobrecoxa cru gera ~5,6kg de frango grelhado (FCc ~1,43):

$$Custo_{kg\ produzido} = \frac{R\$\ 168,65}{5,6} = R\$\ 30,12/kg$$

### 3.2 Custo Médio do Buffet

Para calcular o custo médio do kg do buffet, some todas as preparações:

| Preparação | Custo/kg Produzido | Kg no Buffet | Custo Total |
|------------|-------------------|--------------|-------------|
| Arroz branco | R$ 4,80 | 15 | R$ 72,00 |
| Feijão carioca | R$ 6,20 | 8 | R$ 49,60 |
| Frango grelhado | R$ 30,12 | 6 | R$ 180,72 |
| Carne assada | R$ 52,40 | 4 | R$ 209,60 |
| Salada mista | R$ 8,50 | 10 | R$ 85,00 |
| Legumes refogados | R$ 9,80 | 5 | R$ 49,00 |
| Macarrão | R$ 7,30 | 6 | R$ 43,80 |
| Farofa | R$ 11,40 | 3 | R$ 34,20 |
| **TOTAL** | — | **57 kg** | **R$ 723,92** |

**Custo médio ponderado do buffet:**

$$Custo_{médio/kg} = \frac{R\$\ 723,92}{57} = R\$\ 12,70/kg$$

**Porém, cuidado!** Este é o custo de **produção**. O custo vendido depende do que o cliente escolhe servir.

Se o preço de venda for R$ 45,90/kg, o CMV da produção seria:

$$CMV_{produção} = \frac{12,70}{45,90} = 27,7\%$$

Mas se os clientes servirem desproporcionalmente mais carne (R$ 52,40/kg produzido) e menos arroz (R$ 4,80/kg), o CMV real pode ultrapassar 35%.

---

## 4. Como Manter as Fichas Técnicas Atualizadas

### 4.1 Frequência de Atualização

| Gatilho | Ação |
|---------|------|
| **Alteração de preço do fornecedor > 5%** | Atualizar custo na ficha imediatamente |
| **Troca de fornecedor** | Refazer teste de FC e FCc |
| **Mudança de receita** | Nova ficha completa |
| **Mensalmente** | Revisão geral de preços e custos |
| **Trimestralmente** | Refazer Butcher Test para validar FC |

### 4.2 Erros Mais Comuns

| Erro | Consequência | Solução |
|------|-------------|---------|
| Não considerar FC | CMV subestimado em 15-40% | Sempre pesar antes e depois da limpeza |
| Usar preço do mês passado | Custo defasado, margem ilusória | Atualizar preços na data do inventário |
| Ignorar temperos e condimentos | R$ 200-500/mês invisíveis | Pesar e precificar TUDO |
| FC "genérico" para todas as marcas | FC varia por fornecedor/qualidade | Testar FC por fornecedor |
| Não considerar perdas no preparo | Custo real superior ao teórico | Incluir margem de 3-5% para perdas operacionais |

---

## 5. Ferramentas de Apoio

### 5.1 Equipamentos Essenciais para Criar Fichas Técnicas

| Equipamento | Precisão | Uso |
|-------------|----------|-----|
| Balança de precisão (até 5kg, 1g) | Alta | Pesar ingredientes individuais |
| Balança de bancada (até 30kg, 5g) | Média | Pesar lotes e produções |
| Proveta graduada (250ml e 1L) | Alta | Medir líquidos (azeite, molhos) |
| Conchas numeradas (nº 4, 6, 8, 12) | Padrão | Porcionamento padronizado |
| Termômetro de espeto | 1°C | Garantir ponto da proteína (afeta peso final) |

### 5.2 Planilha de Ficha Técnica (Modelo)

Para cada prato, a planilha deve conter estas colunas:

| Coluna | Descrição |
|--------|-----------|
| A | Ingrediente |
| B | Unidade de medida |
| C | Peso Bruto (PB) |
| D | Fator de Correção (FC) |
| E | Peso Líquido (PL) = C ÷ D |
| F | Fator de Cocção (FCc) |
| G | Peso Servido = E ÷ F |
| H | Custo por kg/L |
| I | Custo da porção = (C × H) ÷ 1000 |
| J | % do custo total |

---

## 6. Exemplo Completo de Ficha Técnica — Prato Executivo Econômico

**Prato:** Frango Grelhado com Arroz, Feijão e Salada

| Ingrediente | PB (g) | FC | PL (g) | FCc | Peso Servido (g) | Custo/kg | Custo Porção |
|---|---|---|---|---|---|---|---|
| Sobrecoxa s/ osso | 180 | 1,10 | 164 | 1,30 | 126 | R$ 18,90 | R$ 3,40 |
| Arroz branco | 80 | 1,00 | 80 | 0,40 | 200 | R$ 6,50 | R$ 0,52 |
| Feijão carioca | 60 | 1,00 | 60 | 0,50 | 120 | R$ 8,90 | R$ 0,53 |
| Alface | 30 | 1,33 | 23 | 1,00 | 23 | R$ 6,50 | R$ 0,20 |
| Tomate | 50 | 1,25 | 40 | 1,00 | 40 | R$ 8,90 | R$ 0,45 |
| Cebola (salada) | 15 | 1,67 | 9 | 1,00 | 9 | R$ 7,90 | R$ 0,12 |
| Temperos totais | 15 | 1,00 | 15 | 1,00 | 15 | R$ 40,00 | R$ 0,60 |
| Óleo/azeite | 15ml | 1,00 | 15ml | 1,00 | — | R$ 12,00/L | R$ 0,18 |
| **TOTAL** | — | — | — | — | **~533g** | — | **R$ 6,00** |

**Precificação rápida (CMV meta 32%):**

$$Preço\ de\ venda = \frac{R\$\ 6,00}{0,32} = R\$\ 18,75$$

Preço sugerido: **R$ 18,90 a R$ 21,90** (dependendo do posicionamento)

---

## 7. Checklist Final: Sua Ficha Técnica Está Completa?

- [ ] Todos os ingredientes estão listados (incluindo sal, óleo, temperos)?
- [ ] Os pesos são em bruto (como comprado)?
- [ ] O Fator de Correção foi aplicado a vegetais, carnes e frutas?
- [ ] O Fator de Cocção foi considerado para proteínas e grãos?
- [ ] Os preços estão atualizados (data da última cotação)?
- [ ] O custo total está calculado?
- [ ] O percentual de cada ingrediente no custo total está identificado?
- [ ] A ficha foi validada com teste prático (3 repetições)?
- [ ] A ficha operacional (para cozinha) foi criada separadamente?
- [ ] Os utensílios de porcionamento estão especificados?
