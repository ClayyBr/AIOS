---
name: create-landing-page
description: Cria um projeto Next.js completo de Landing Page via sistema multi-agente (Master → Frontend → Backend)
agent: master-orchestrator
---

# Task: Create Landing Page

Esta tarefa gera um projeto Next.js completo e funcional para uma Landing Page de alta conversão.

## Fluxo Multi-Agente

```
Master (SPEC) → Frontend (Código) → Backend (API Routes, opcional)
```

## Inputs

- `theme`: O tema ou propósito da Landing Page (Ex: "Curso de Python", "SaaS B2B") — **Obrigatório**
- `imagePath`: Caminho para uma imagem de referência/print para inspiração — Opcional
- `outputDir`: Diretório onde o projeto será salvo (Padrão: `./output/project`)
- `frontendOnly`: Se `true`, pula a geração de API Routes backend — Opcional
- `key`: Gemini API Key — **Obrigatório** (ou via env `GEMINI_API_KEY`)

## Steps

1.  **MASTER — Arquitetura & SPEC:**
    - Analisa o tema e infere objetivo, estilo e funcionalidades.
    - Gera `SPEC.md` com diretrizes visuais, componentes e regras de CRO.

2.  **FRONTEND — Engenharia de Interface:**
    - Recebe o SPEC e gera todos os arquivos do projeto Next.js.
    - Output: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `app/`, `components/`.

3.  **BACKEND — API Routes (Opcional):**
    - Gera API Routes do Next.js (formulário de contato, etc.).
    - Usa Zod para validação. Pulado com flag `--frontend-only`.

## Output

Projeto Next.js completo no diretório especificado, pronto para:
```bash
cd <outputDir>
npm install
npm run dev
```

## Example Usage

```bash
node squads/lp-creator/tools/orchestrator.js --theme "Academia CrossFit" --frontend-only --key "SUA_KEY"
```

```bash
node squads/lp-creator/tools/orchestrator.js --theme "SaaS B2B" --image "./ref.png" --output "./output/saas" --key "SUA_KEY"
```
