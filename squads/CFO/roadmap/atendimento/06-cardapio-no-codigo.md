# Evolução: Cardápio no Código

**Prioridade:** 🟢 Baixa
**Pré-requisito:** MVP validado, workflow de atualização estável
**Complexidade:** Baixa
**Origem:** Brainstorming Ponto 3.2

---

## Contexto

No MVP, o cardápio é lido de uma Google Sheets para facilitar testes e atualizações rápidas. Após validação, a ideia é migrar para um arquivo versionado no código.

## O que será feito

Criar um arquivo de cardápio no repositório (YAML ou JSON) que o Gerente/Dono atualiza e que é versionado pelo Git.

### Formato Proposto (YAML)

```yaml
# squads/CFO/data/cardapio.yaml
versao: "2026-03-06"
atualizado_por: "Cleison"

categorias:
  - nome: "Hot Dogs"
    itens:
      - nome: "Dog Super Frango c/ Bacon"
        descricao: "Pão, frango desfiado, bacon crocante, mussarela, molhos"
        preco: 30.90
        disponivel: true
        opcoes:
          - grupo: "Sachê"
            tipo: "multipla"
            items: ["Maionese Hellmans", "Catchup", "Mostarda"]
          - grupo: "Queijo selado"
            tipo: "unica"
            items: ["Sim, com queijo (+R$3)", "Não, obrigado"]
        tags: ["mais-vendido", "com-bacon"]

      - nome: "Dog Simples"
        descricao: "Pão, salsicha premium, vinagrete, batata palha"
        preco: 15.00
        disponivel: true

  - nome: "Porções"
    itens:
      - nome: "Batata Frita"
        descricao: "Porção de batata frita crocante (300g)"
        preco: 18.00
        disponivel: true

entrega:
  taxa_padrao: 5.00
  gratis_acima_de: 40.00
  prazo_minutos: 50
  bairros_atendidos:
    - "Centro"
    - "Jardim Morumby"
    - "Vila Nova"

pagamento:
  pix:
    chave: "email@restaurante.com"
    nome: "Restaurante XYZ"
  aceita_cartao_entrega: true
  aceita_dinheiro: true
```

### Benefícios vs Google Sheets

| Aspecto | Google Sheets | Arquivo no Código |
|---------|--------------|-------------------|
| Versionamento | ❌ Sem histórico | ✅ Git (quem mudou, quando) |
| Velocidade de leitura | ~300ms (API) | ~1ms (filesystem) |
| Offline | ❌ Precisa de internet | ✅ Funciona offline |
| Custo | ❌ API Sheets tem quota | ✅ Zero custo |
| Facilidade de editar | ✅ Interface visual | ⚠️ Precisa editar YAML |

### Mitigação da Desvantagem

Para facilitar a edição do YAML pelo gerente, criar:
1. Um comando CLI: `npx aios cfo cardapio editar`
2. Ou uma tela simples no Dashboard CFO para editar visualmente
