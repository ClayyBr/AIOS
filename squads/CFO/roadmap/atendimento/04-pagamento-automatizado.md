# Evolução: Pagamento Automatizado (Verificação de Pix)

**Prioridade:** 🟡 Média
**Pré-requisito:** MVP validado + volume de pedidos justifica automação
**Complexidade:** Média-Alta
**Origem:** Brainstorming Ponto 4.2

---

## Contexto

No MVP, quando o cliente escolhe Pix, o agente envia o código copia-e-cola e pede o comprovante. O Cleison verifica manualmente no app do banco se o Pix foi recebido.

## O que será feito

Automatizar a verificação de pagamento Pix para que o agente confirme o pedido sem intervenção humana.

### Opções de Implementação

#### Opção A: Webhook Bancário (Ideal)
- Alguns bancos/fintechs oferecem webhooks de recebimento Pix
- Quando o Pix cai, o webhook notifica o servidor
- O servidor confirma automaticamente o pedido
- **Bancos compatíveis:** Mercado Pago, PagBank, Asaas, Gerencianet (Efí)

#### Opção B: API de QR Code Dinâmico
- Gerar QR Code Pix único para cada pedido (com valor exato)
- Usar API do gateway (ex: Mercado Pago) para verificar status
- Polling a cada 10s: "Esse Pix específico foi pago?"
- **Vantagem:** Identificação 100% automática (cada pedido = 1 QR code)

#### Opção C: OCR do Comprovante (Intermediário)
- Cliente envia foto/PDF do comprovante pelo WhatsApp
- Gemini analisa a imagem e extrai: valor, data, destinatário
- Validação: valor bate? destinatário bate? data é de hoje?
- **Vantagem:** Não precisa de integração bancária
- **Risco:** Comprovantes falsos (mitigado com verificação manual posterior)

### Recomendação

Para a **V2**, começar com a **Opção B** (QR Code Dinâmico via Mercado Pago ou Asaas), pois:
- Free tier generoso
- API bem documentada
- QR Code dinâmico = identificação automática
- Webhook de confirmação incluso

### Fluxo V2

```
Cliente: "Quero pagar no Pix"
  → Agente gera QR Code dinâmico (Mercado Pago API)
  → Envia imagem do QR Code + código copia-e-cola
  → Webhook do Mercado Pago notifica: "Pix #123 recebido"
  → Agente confirma automaticamente: "Pagamento confirmado! ✅"
  → Pedido muda status para "Pago" na planilha/banco
```
