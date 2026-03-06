# Agente Atendente IA WhatsApp — Squad CFO

Agente IA que atua como atendente 24/7 no WhatsApp do restaurante, conectado ao **Gemini 1.5 Flash** e integrado ao ecossistema do **Squad CFO**.

## 🚀 Quick Start (Local)

### Pré-requisitos
- Node.js >= 20
- NPM >= 10
- Credenciais da Meta (WhatsApp Business API)
- API Key do Google AI Studio (Gemini)
- Service Account do Google (Sheets API)

### Setup

```bash
# 1. Instalar dependências
cd squads/CFO/atendente-whatsapp
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais

# 3. Rodar em desenvolvimento (hot reload)
npm run dev

# 4. Rodar testes
npm test
```

### Scripts Disponíveis

| Script | Comando | Descrição |
|--------|---------|-----------|
| `dev` | `npm run dev` | Desenvolvimento com hot reload (tsx watch) |
| `build` | `npm run build` | Compilar TypeScript para JS |
| `start` | `npm start` | Rodar em produção (node dist/) |
| `test` | `npm test` | Rodar testes (vitest) |
| `test:watch` | `npm run test:watch` | Testes em modo watch |
| `lint` | `npm run lint` | Verificar código (ESLint) |
| `format` | `npm run format` | Formatar código (Prettier) |

---

## 🔧 Variáveis de Ambiente

### Meta WhatsApp (Obrigatórias para produção)

| Variável | Descrição | Onde obter |
|----------|-----------|-----------|
| `META_VERIFY_TOKEN` | Token customizado para verificação do webhook (você define) | Escolha qualquer string segura |
| `META_ACCESS_TOKEN` | Token permanente do System User | Meta Business Manager |
| `META_PHONE_NUMBER_ID` | ID interno do número WhatsApp | Painel Meta for Developers |
| `META_APP_SECRET` | Secret da aplicação Meta | Painel Meta for Developers |

### Google AI Studio

| Variável | Descrição | Onde obter |
|----------|-----------|-----------|
| `GEMINI_API_KEY` | API Key do Gemini | [Google AI Studio](https://aistudio.google.com/app/apikey) |

### Google Sheets

| Variável | Descrição | Onde obter |
|----------|-----------|-----------|
| `GOOGLE_SHEETS_CREDENTIALS` | JSON do Service Account em base64 | Google Cloud Console |
| `SHEETS_CARDAPIO_ID` | ID da planilha do cardápio | URL do Google Sheets |
| `SHEETS_PEDIDOS_ID` | ID da planilha de pedidos | URL do Google Sheets |

### Pagamento Pix

| Variável | Descrição |
|----------|-----------|
| `PIX_KEY` | Chave Pix do restaurante (email, CPF, telefone ou aleatória) |
| `PIX_RECEIVER_NAME` | Nome do recebedor na transferência |

### Configuração

| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `SESSION_TIMEOUT_MINUTES` | 30 | Timeout de sessão inativa |
| `CARDAPIO_CACHE_MINUTES` | 15 | Cache do cardápio |
| `ESTIMATED_DELIVERY_MINUTES` | 50 | Prazo de entrega informado ao cliente |
| `PORT` | 3000 | Porta do servidor |

---

## ☁️ Deploy no Render

### Opção 1: Via render.yaml (Recomendado)

1. Conecte o repositório no [Render Dashboard](https://dashboard.render.com)
2. O Render detectará o `render.yaml` automaticamente
3. Configure as variáveis de ambiente secretas no painel
4. Deploy automático a cada push na branch

### Opção 2: Manual

1. **New Web Service** no Render
2. **Runtime:** Docker
3. **Build Command:** (automático via Dockerfile)
4. **Health Check Path:** `/health`
5. Configure todas as env vars listadas acima

### Verificar Deploy

```bash
# Health check
curl https://SEU-APP.onrender.com/health

# Deve retornar:
# {"status":"ok","timestamp":"...","service":"atendente-whatsapp","uptime":...}
```

---

## 📱 Configuração da Meta (WhatsApp Business API)

### Passo a Passo Completo

#### 1. Criar Conta Meta for Developers

1. Acesse [developers.facebook.com](https://developers.facebook.com)
2. Faça login com sua conta Facebook
3. Clique em **"Começar"** / **"Get Started"**
4. Aceite os termos e complete a verificação

#### 2. Criar Aplicação

1. No painel, clique em **"Criar App"** / **"Create App"**
2. Selecione **"Negócio"** / **"Business"** como tipo
3. Dê um nome (ex: `Atendente WhatsApp Restaurante`)
4. Selecione ou crie uma Business Account

#### 3. Adicionar WhatsApp ao App

1. Na página do app, clique em **"Adicionar Produto"**
2. Encontre **"WhatsApp"** e clique em **"Configurar"**
3. Siga o setup wizard do WhatsApp Business

#### 4. Obter Credenciais

| Credencial | Onde encontrar | Variável |
|-----------|----------------|----------|
| **Phone Number ID** | WhatsApp > API Setup > ID do número | `META_PHONE_NUMBER_ID` |
| **Temporary Token** | WhatsApp > API Setup > Token temporário (24h) | `META_ACCESS_TOKEN` (temporário) |
| **App Secret** | Configurações > Básico > Chave Secreta do App | `META_APP_SECRET` |

#### 5. Criar Token Permanente (System User)

> ⚠️ O token temporário expira em 24h. Para produção, crie um **System User Token**:

1. Acesse [business.facebook.com/settings](https://business.facebook.com/settings)
2. Vá em **Usuários do Sistema** / **System Users**
3. Clique em **Adicionar** → Nome: `atendente-bot` → Cargo: **Admin**
4. Clique no System User criado → **Gerar Token**
5. Selecione o App criado no passo 2
6. Marque as permissões:
   - `whatsapp_business_management`
   - `whatsapp_business_messaging`
7. **Gerar Token** → Copie e salve como `META_ACCESS_TOKEN`

#### 6. Configurar Webhook

1. No painel do App → WhatsApp → **Configuração** / **Configuration**
2. Em **Webhook**:
   - **URL de callback:** `https://SEU-APP.onrender.com/webhook`
   - **Token de verificação:** O mesmo valor de `META_VERIFY_TOKEN` que você definiu no `.env`
3. Clique em **Verificar e Salvar**
4. Em **Campos do Webhook**, marque: **`messages`**

#### 7. Número de Teste (Sandbox)

A Meta fornece um **número de teste** para desenvolvimento:

1. WhatsApp > API Setup > **Número de telefone de teste**
2. Adicione seu número pessoal como **destinatário de teste**
3. Envie a mensagem de template de teste para ativar
4. Agora pode enviar mensagens livres para o número de teste

> 📌 O número de teste tem limite de 5 destinatários e não gera custos.

---

## 🔧 Operação e Manutenção

### Atualizar Cardápio

Edite diretamente a planilha **Google Sheets** (aba "Cardápio"). As mudanças serão refletidas automaticamente após o cache expirar (15 minutos por padrão).

### Reativar Bot após Handoff

Quando o bot é pausado para um número (handoff):

```bash
curl -X POST https://SEU-APP.onrender.com/admin/reactivate \
  -H "Content-Type: application/json" \
  -d '{"phone": "5512991650505"}'
```

### Monitorar Logs

No Render Dashboard → seu serviço → **Logs** (tempo real).

### Troubleshooting

| Problema | Causa Provável | Solução |
|----------|---------------|---------|
| Webhook não verifica | `META_VERIFY_TOKEN` diferente | Confira se o token no Render é igual ao configurado no painel Meta |
| Mensagens não chegam | Webhook não subscribed | No painel Meta, verifique se `messages` está marcado nos campos do webhook |
| Gemini não responde | API Key inválida ou rate limit | Verifique a key no [AI Studio](https://aistudio.google.com), aguarde 1min se rate limit |
| Sheets não lê | Permissão do Service Account | Verifique se o email do SA tem acesso de Editor na planilha |
| Servidor reinicia | Free tier do Render hiberna | Normal — o servidor acorda automaticamente ao receber request (~30s) |

---

## 📐 Arquitetura

```
Cliente WhatsApp → Meta Cloud API → POST /webhook → Express Server
                                                        ↓
                                              Message Controller
                                              ↓              ↓
                                    Gemini Service    Sheets Service
                                    (Gemini 1.5)      (Cardápio/Pedidos)
                                              ↓
                                    WhatsApp Sender → Meta API → Cliente
```

## 📁 Estrutura de Pastas

```
src/
├── config/          # Configuração (env vars, constantes)
├── controllers/     # Orquestração de processamento
├── routes/          # Endpoints HTTP (webhook, health)
├── services/        # Lógica de negócio (Gemini, Sheets, WhatsApp)
├── prompts/         # System prompt da persona IA
├── types/           # Interfaces TypeScript
├── utils/           # Utilitários (logger, signature, formatters)
├── app.ts           # Setup Express
└── server.ts        # Entry point
```

---

## 📋 Limites e Custos (MVP)

| Serviço | Limite Gratuito | Custo se exceder |
|---------|----------------|-----------------|
| **Meta WhatsApp** | 1.000 conversas inbound/mês | ~$0.05/conversa |
| **Gemini 1.5 Flash** | 15 RPM / 1M TPM | Pay-as-you-go (muito barato) |
| **Google Sheets API** | 60 req/min | N/A (limite suficiente) |
| **Render** | 750h/mês (free tier) | $7/mês (Starter) |

> ⚠️ **Render Free Tier:** O servidor hiberna após 15min de inatividade. A primeira mensagem após hibernação pode demorar ~30s. Para evitar, upgrade para Starter ($7/mês) ou use um serviço de "ping" externo.
