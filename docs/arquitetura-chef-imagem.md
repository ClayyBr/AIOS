# Arquitetura Técnica — Agente Chef de Imagem (CFO Squad)

## 1. Visão Geral

O **Chef de Imagem** é um agente do Squad CFO que gera fotos fotorrealistas de pratos do restaurante utilizando a API do Google AI Studio (modelo `gemini-3.1-flash-image-preview`). A integração é feita via um **MCP Server** (Model Context Protocol) local em Node.js/TypeScript, que expõe uma tool para o agente gerar e salvar imagens.

---

## 2. Diagrama de Arquitetura

```
┌─────────────────────────────────────────────────────────────────┐
│                     USUÁRIO (CLI / Chat)                        │
│  "Gere uma foto de Bife Ancho grelhado" + [imagem referência]   │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│              AGENTE: @chef-imagem                               │
│  agents/chef-imagem.md                                          │
│                                                                 │
│  1. Recebe input: texto simples + imagem referência (opcional)  │
│  2. Enriquece o prompt com técnicas de Food Photography         │
│  3. Monta negative prompt (se fornecido pelo usuário)           │
│  4. Chama a MCP Tool: gerar_imagem_prato                        │
│  5. Retorna confirmação + path do arquivo ao usuário            │
└──────────────────────────┬──────────────────────────────────────┘
                           │ MCP Tool Call
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│         MCP SERVER: mcp-chef-imagem (Node.js)                   │
│  packages/mcp-chef-imagem/                                      │
│                                                                 │
│  Tool: gerar_imagem_prato                                       │
│  ├─ Input:  prompt, imagem_referencia?, negative_prompt?,       │
│  │          aspect_ratio?, resolution?                          │
│  ├─ Ação:   POST → Google AI Studio API                         │
│  ├─ Output: Salva PNG em squads/CFO/design/                     │
│  └─ Return: { path, prompt_final, timestamp }                   │
└──────────────────────────┬──────────────────────────────────────┘
                           │ HTTPS
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│              GOOGLE AI STUDIO API                               │
│  Modelo: gemini-3.1-flash-image-preview                         │
│  SDK: @google/genai                                             │
│  Auth: API Key (env: GOOGLE_AI_STUDIO_API_KEY)                  │
│  Endpoint: ai.models.generateContent()                          │
│  Config: responseModalities: ['TEXT', 'IMAGE']                  │
│  Features: text-to-image, image-to-image, até 14 referências   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. MCP Server — Design Técnico

### 3.1 Estrutura do Projeto

```
packages/mcp-chef-imagem/
├── package.json
├── tsconfig.json
└── src/
    └── index.ts          # Entry point + tool registration
```

### 3.2 Dependências

```json
{
  "name": "mcp-chef-imagem",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0",
    "@google/genai": "^1.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "zod": "^3.0.0"
  }
}
```

### 3.3 Tool: `gerar_imagem_prato`

**Input Schema (Zod):**

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `prompt` | string | ✅ | Descrição do prato ou prompt fotográfico |
| `imagem_referencia` | string (base64) | ❌ | Imagem de referência para manter consistência visual |
| `negative_prompt` | string | ❌ | Restrições negativas (ex: "sem mãos, sem desfoque") |
| `aspect_ratio` | enum | ❌ | Aspecto: `1:1`, `3:4`, `4:3`, `16:9`, `9:16` (default: `1:1`) |
| `resolution` | enum | ❌ | Resolução: `512px`, `1K`, `2K` (default: `1K`) |

**Output:**

```typescript
{
  success: boolean;
  file_path: string;          // "squads/CFO/design/bife-ancho-grelhado-20260306-154530.png"
  prompt_final: string;       // Prompt completo enviado à API
  timestamp: string;          // ISO 8601
  error?: string;             // Mensagem de erro se houve falha
}
```

### 3.4 Código de Referência — Integração com Google AI Studio

```typescript
import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import * as path from "node:path";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_STUDIO_API_KEY });

async function gerarImagemPrato(
  prompt: string,
  imagemReferencia?: string,
  negativePrompt?: string,
  aspectRatio: string = "1:1",
  resolution: string = "1K"
): Promise<{ filePath: string; promptFinal: string }> {

  // Montar contents
  const contents: any[] = [{ text: prompt }];

  // Adicionar imagem de referência se fornecida
  if (imagemReferencia) {
    contents.push({
      inlineData: {
        mimeType: "image/png",
        data: imagemReferencia, // base64
      },
    });
  }

  // Chamar API
  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-image-preview",
    contents: contents,
    config: {
      responseModalities: ["TEXT", "IMAGE"],
      imageConfig: {
        aspectRatio: aspectRatio,
        imageSize: resolution,
      },
    },
  });

  // Processar resposta
  for (const part of response.candidates![0].content!.parts!) {
    if (part.inlineData) {
      const imageData = part.inlineData.data!;
      const buffer = Buffer.from(imageData, "base64");

      // Gerar nome descritivo
      const slug = prompt.slice(0, 50).replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase();
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
      const fileName = `${slug}-${timestamp}.png`;
      const outputDir = path.resolve("squads/CFO/design");
      const filePath = path.join(outputDir, fileName);

      // Garantir que o diretório existe
      fs.mkdirSync(outputDir, { recursive: true });
      fs.writeFileSync(filePath, buffer);

      return { filePath, promptFinal: prompt };
    }
  }

  throw new Error("API não retornou imagem na resposta");
}
```

### 3.5 Transporte e Registro

- **Transporte:** stdio (padrão MCP para integração local)
- **Registro:** arquivo `.mcp.json` na raiz do projeto ou configuração equivalente do Antigravity

```json
{
  "mcpServers": {
    "chef-imagem": {
      "command": "node",
      "args": ["packages/mcp-chef-imagem/dist/index.js"],
      "env": {
        "GOOGLE_AI_STUDIO_API_KEY": "${GOOGLE_AI_STUDIO_API_KEY}"
      }
    }
  }
}
```

---

## 4. Agente — System Prompt Spec

### 4.1 Dados do Agente

```yaml
name: chef-imagem
role: Food Photographer & Prompt Engineer
version: 1.0.0
icon: 📸
whenToUse: "Use para gerar fotos fotorrealistas de pratos do restaurante, imagens para cardápio digital, redes sociais e materiais de marketing. Aceita imagens de referência para manter consistência visual."
dependencies:
  tasks:
    - gerar-foto-prato.md
```

### 4.2 Persona

O agente atua como um **Diretor de Arte e Food Photographer** especializado em fotografia culinária profissional. Ele domina:

- **Fotografia Culinária:** Ângulos (overhead 90°, 3/4, eye-level), iluminação (natural lateral, backlight, difusa), composição (regra dos terços, espaço negativo)
- **Food Styling:** Texturas, cores complementares, elementos de composição (talheres, tecidos, ingredientes crus como garnish)
- **Prompt Engineering:** Transformação de descrições simples em prompts densos e técnicos otimizados para modelos de geração de imagem

### 4.3 Fluxo de Enriquecimento de Prompt

Quando o usuário manda um texto simples, o agente DEVE transformá-lo:

**Input do usuário:** `"Bife Ancho grelhado"`

**Prompt enriquecido gerado pelo agente:**
```
Professional food photography of a grilled Bife Ancho (ribeye steak) with 
perfect grill marks, medium-rare cross section showing pink center, served on 
a dark ceramic plate. Rustic wooden table surface. Side garnish of roasted 
garlic and fresh rosemary sprig. Soft natural side lighting from left, creating 
gentle shadows. Shallow depth of field, f/2.8, 50mm macro lens perspective. 
Steam rising from the meat. Rich warm color grading. Shot from 3/4 angle 
(approximately 45 degrees). Restaurant fine dining atmosphere. 
Photorealistic, ultra high quality, editorial food photography.
```

### 4.4 Comandos do Agente

| Comando | Descrição |
|---------|-----------|
| `*gerar {prato}` | Gera foto do prato descrito. Aceita imagem de referência arrastada no chat. |
| `*refazer {ajustes}` | Regenera a última imagem aplicando os ajustes solicitados |
| `*estilo {tipo}` | Muda o estilo: `dark-moody`, `bright-airy`, `rustico`, `minimal` |
| `*aspecto {ratio}` | Define aspect ratio: `1:1`, `3:4`, `4:3`, `16:9`, `9:16` |
| `*help` | Lista comandos disponíveis |
| `*exit` | Sai do modo agente |

---

## 5. Task — `gerar-foto-prato.md`

```yaml
name: gerar-foto-prato
description: Gera foto fotorrealista de um prato do restaurante usando IA generativa
agent: chef-imagem
version: 1.0.0
inputs:
  - name: prato
    type: string
    required: true
    description: Descrição do prato para gerar a foto
  - name: referencia
    type: image
    required: false
    description: Imagem de referência para manter consistência visual
  - name: negative_prompt
    type: string
    required: false
    description: Restrições negativas (o que NÃO deve aparecer na imagem)
  - name: estilo
    type: string
    required: false
    default: dark-moody
    description: "Estilo visual: dark-moody, bright-airy, rustico, minimal"
outputs:
  - name: imagem
    type: file
    description: Imagem PNG salva em squads/CFO/design/
```

**Steps:**
1. Receber descrição do prato e imagem de referência (se fornecida)
2. Enriquecer prompt com técnicas de food photography (ângulo, luz, composição, lente)
3. Aplicar estilo visual (dark-moody, bright-airy, etc.)
4. Adicionar negative prompt se fornecido
5. Chamar MCP tool `gerar_imagem_prato` com prompt enriquecido + referência
6. Confirmar salvamento e exibir path do arquivo

---

## 6. Integração no Squad

### 6.1 Alterações em `squad.yaml`

```yaml
# Adicionar em components.agents:
- chef-imagem.md

# Adicionar em components.tasks:
- gerar-foto-prato.md

# Atualizar description para incluir:
# Agente 6 (Chef de Imagem): Geração de fotos de pratos via IA.
```

### 6.2 Alterações em `gerente-geral.md`

```yaml
# Adicionar em dependencies.agents:
- chef-imagem.md
```

```markdown
# Adicionar na lista de agentes coordenados:
- 📸 `@chef-imagem` (Food Photographer & Prompt Engineer)

# Adicionar em Fluxos Simples:
- **"Gere uma foto do prato"** → `@chef-imagem` (`*gerar`)
- **"Refaça a imagem com mais luz"** → `@chef-imagem` (`*refazer`)
```

---

## 7. Configuração de Ambiente

### 7.1 Variável de Ambiente

```powershell
$env:GOOGLE_AI_STUDIO_API_KEY = "sua-api-key-aqui"
```

### 7.2 Obter API Key

1. Acessar https://aistudio.google.com/apikey
2. Criar nova API Key
3. Configurar como variável de ambiente permanente no Windows

---

## 8. Limitações Conhecidas

| Limitação | Impacto | Mitigação |
|-----------|---------|-----------|
| Modelo não copia cena exatamente | Micro-variações em texturas e reflexos | Prompt denso com referência minimiza divergências |
| Filtros de segurança da API | Pode bloquear termos como "sangrento" em carnes | Agente reescreve com sinônimos seguros |
| Rate limit API gratuita | ~15 RPM (requests por minuto) | Suficiente para uso manual iterativo |
| Sem persistência de estado | Cada geração é independente | Agente mantém contexto no chat para iterações |
