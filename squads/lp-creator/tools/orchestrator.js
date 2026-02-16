/**
 * Script: orchestrator.js
 * Description: Gerencia o fluxo multi-agente para criação de projetos web completos (Next.js).
 * Usage: node orchestrator.js --theme "Tema" --key "API_KEY" [--frontend-only] [--debug]
 */

const fs = require('fs');
const path = require('path');
const { program } = require('commander');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

program
    .option('-t, --theme <theme>', 'Tema do Projeto')
    .option('-k, --key <key>', 'Gemini API Key')
    .option('-i, --image <path>', 'Caminho para imagem de referência (Vision)')
    .option('-m, --model <model>', 'Modelo Específico (ex: gemini-2.5-flash)')
    .option('-f, --frontend-only', 'Gerar apenas o Frontend (padrão para Landing Pages)')
    .option('-o, --output <dir>', 'Diretório de saída', './output/project')
    .option('--debug', 'Ativar logs detalhados')
    .parse(process.argv);

const options = program.opts();

// Setup API Key
let API_KEY = options.key || process.env.GEMINI_API_KEY;
if (API_KEY) {
    API_KEY = API_KEY.replace(/^"|"$/g, '').trim();
    try {
        if (API_KEY.includes('%')) API_KEY = decodeURIComponent(API_KEY);
    } catch (e) { /* ignore */ }
}

if (!API_KEY) {
    console.error('\n❌ ERRO: API Key não encontrada.');
    console.error('👉 Use --key "SUA_KEY" ou defina GEMINI_API_KEY no ambiente.\n');
    process.exit(1);
}

if (!options.theme) {
    console.error('\n❌ ERRO: Tema é obrigatório. Use --theme "Seu Tema"\n');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

// Helper to wait
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function fileToGenerativePart(filePath, mimeType) {
    return {
        inlineData: {
            data: Buffer.from(fs.readFileSync(filePath)).toString('base64'),
            mimeType
        },
    };
}

// ============================================================
// JSON SANITIZATION — Corrige outputs malformados da LLM
// ============================================================
function sanitizeJsonString(raw) {
    let text = raw;

    // 1. Remove markdown code fences
    text = text.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '');

    // 2. Remove texto antes do primeiro { e depois do último }
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        text = text.substring(firstBrace, lastBrace + 1);
    }

    // 3. Remove trailing commas antes de } ou ]
    text = text.replace(/,\s*([\]}])/g, '$1');

    // 4. Remove linhas que são apenas comentários (não dentro de strings)
    // NÃO usar regex para remover // inline — corrompe URLs como https://
    text = text.split('\n').filter(line => {
        const trimmed = line.trim();
        // Remove linhas que são puramente comentários
        return !trimmed.startsWith('//');
    }).join('\n');

    // 5. Remove linhas vazias excessivas
    text = text.replace(/\n\s*\n/g, '\n');

    return text.trim();
}

// ============================================================
// OUTPUT VALIDATION — Verifica integridade dos arquivos gerados
// ============================================================
function validateFilesOutput(filesObj, phase) {
    const errors = [];

    if (!filesObj || !filesObj.files) {
        errors.push(`[${phase}] JSON não contém propriedade "files"`);
        return errors;
    }

    if (!Array.isArray(filesObj.files) || filesObj.files.length === 0) {
        errors.push(`[${phase}] Array "files" está vazio`);
        return errors;
    }

    // Verificar arquivos obrigatórios para Frontend
    if (phase === 'FRONTEND') {
        const requiredFiles = ['package.json', 'tsconfig.json', 'app/layout.tsx', 'app/page.tsx'];
        const generatedPaths = filesObj.files.map(f => f.path);

        for (const req of requiredFiles) {
            if (!generatedPaths.some(p => p.includes(req))) {
                errors.push(`[${phase}] Arquivo obrigatório ausente: ${req}`);
            }
        }
    }

    // Verificar que nenhum arquivo tem conteúdo vazio
    for (const file of filesObj.files) {
        if (!file.path || typeof file.path !== 'string') {
            errors.push(`[${phase}] Arquivo com path inválido`);
        }
        if (!file.content || typeof file.content !== 'string' || file.content.trim().length === 0) {
            errors.push(`[${phase}] Arquivo "${file.path}" tem conteúdo vazio`);
        }
    }

    // Validar package.json é JSON válido
    const pkgFile = filesObj.files.find(f => f.path === 'package.json');
    if (pkgFile) {
        try {
            const pkg = JSON.parse(pkgFile.content);
            if (!pkg.dependencies && !pkg.devDependencies) {
                errors.push(`[${phase}] package.json não contém dependências`);
            }
        } catch (e) {
            errors.push(`[${phase}] package.json contém JSON inválido: ${e.message}`);
        }
    }

    // Validar tsconfig.json é JSON válido
    const tsFile = filesObj.files.find(f => f.path === 'tsconfig.json');
    if (tsFile) {
        try {
            JSON.parse(sanitizeJsonString(tsFile.content));
        } catch (e) {
            errors.push(`[${phase}] tsconfig.json contém JSON inválido: ${e.message}`);
        }
    }

    return errors;
}

// ============================================================
// AGENT CALLER — Com Retry + Fallback + Model Rotation
// ============================================================

// Lista de modelos válidos (atualizar conforme disponibilidade)
const DEFAULT_MODELS = [
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-2.0-flash-lite',
    'gemini-1.5-flash',
    'gemini-1.5-pro'
];

async function callAgent(roleName, systemInstruction, userPrompt, preferredModel = null, jsonMode = false) {
    let modelsToTry = [...DEFAULT_MODELS];

    if (options.model) {
        modelsToTry = [options.model];
        console.log(`ℹ️  [${roleName}] Usando modelo forçado: ${options.model}`);
    } else if (preferredModel) {
        modelsToTry = [preferredModel, ...modelsToTry.filter(m => m !== preferredModel)];
    }

    for (const modelName of modelsToTry) {
        console.log(`\n🤖 [${roleName}] Tentando com ${modelName}...`);

        try {
            return await tryGenerate(roleName, systemInstruction, userPrompt, modelName, 0, jsonMode);
        } catch (error) {
            console.warn(`⚠️  [${roleName}] Falha com ${modelName}: ${error.message}`);
            if (modelName === modelsToTry[modelsToTry.length - 1]) throw error;
            console.log(`⏳ Tentando próximo modelo...`);
        }
    }
}

async function tryGenerate(roleName, systemInstruction, userPrompt, modelName, retryCount = 0, jsonMode = false) {
    try {
        const generationConfig = {};
        if (jsonMode) {
            generationConfig.responseMimeType = "application/json";
        }

        const model = genAI.getGenerativeModel({
            model: modelName,
            systemInstruction: systemInstruction,
            generationConfig: generationConfig
        });

        const result = await model.generateContent(userPrompt);
        const response = await result.response;
        console.log(`✅ [${roleName}] Tarefa concluída com ${modelName}.`);
        return response.text();
    } catch (error) {
        if (error.message.includes('429') || error.message.includes('Too Many Requests') || error.message.includes('quota')) {
            console.warn(`⚠️  [${roleName}] Rate Limit (429) em ${modelName}.`);

            if (retryCount < 2) {
                const waitTime = 5000 * (retryCount + 1);
                console.log(`⏳ Aguardando ${waitTime / 1000}s para retry...`);
                await sleep(waitTime);
                return tryGenerate(roleName, systemInstruction, userPrompt, modelName, retryCount + 1, jsonMode);
            }
        }
        if (error.message.includes('404') || error.message.includes('not found')) {
            console.warn(`⚠️  [${roleName}] Modelo ${modelName} não encontrado.`);
        }
        throw error;
    }
}

// ============================================================
// PARSE WITH RETRY — Tenta parsear JSON e retenta se falhar
// ============================================================
async function parseJsonWithRetry(rawResponse, phase, agentPrompt, agentSystemPrompt) {
    // Tentativa 1: Parse direto com sanitização
    let sanitized = sanitizeJsonString(rawResponse);

    try {
        const parsed = JSON.parse(sanitized);
        const errors = validateFilesOutput(parsed, phase);
        if (errors.length > 0) {
            console.warn(`⚠️  [${phase}] Validação encontrou problemas:`);
            errors.forEach(e => console.warn(`   - ${e}`));
        }
        return parsed;
    } catch (parseError) {
        console.warn(`⚠️  [${phase}] JSON inválido na primeira tentativa: ${parseError.message}`);

        if (options.debug) {
            console.log(`📋 [${phase}] JSON sanitizado (primeiros 500 chars):`);
            console.log(sanitized.substring(0, 500));
        }

        // Tentativa 2: Pedir ao modelo para corrigir
        console.log(`🔄 [${phase}] Tentando autocorreção via LLM...`);
        try {
            const correctionPrompt = `O JSON que você retornou anteriormente é inválido e não pode ser parseado.

ERRO: ${parseError.message}

TRECHO PROBLEMÁTICO (primeiros 200 caracteres):
${sanitized.substring(0, 200)}

POR FAVOR: Retorne APENAS um JSON válido no formato exato:
{
  "files": [
    { "path": "caminho/do/arquivo.ext", "content": "conteúdo do arquivo" }
  ]
}

REGRAS:
- Sem trailing commas
- Sem comentários dentro do JSON
- Strings devem ter aspas duplas escapadas corretamente
- Conteúdo de arquivos com newlines devem usar \\n`;

            const correctedResponse = await callAgent(
                `${phase}-CORRECTION`,
                agentSystemPrompt,
                correctionPrompt,
                null,
                true // Force JSON mode
            );

            const correctedSanitized = sanitizeJsonString(correctedResponse);
            const correctedParsed = JSON.parse(correctedSanitized);

            const errors = validateFilesOutput(correctedParsed, phase);
            if (errors.length > 0) {
                console.warn(`⚠️  [${phase}] Autocorreção parcial — problemas restantes:`);
                errors.forEach(e => console.warn(`   - ${e}`));
            }

            console.log(`✅ [${phase}] Autocorreção bem-sucedida!`);
            return correctedParsed;
        } catch (retryError) {
            console.error(`❌ [${phase}] Autocorreção também falhou: ${retryError.message}`);
            return null;
        }
    }
}

// ============================================================
// SANITIZE GENERATED FILES — Corrige arquivos JSON internos
// ============================================================

/**
 * Detecta e corrige conteúdo double-escaped pela LLM.
 * Às vezes a LLM retorna strings com \\n literal (2 chars) em vez de newline real,
 * e \\\" em vez de aspas reais. Isso faz com que arquivos como package.json
 * sejam gravados com escapes literais, quebrando npm/tsc.
 */
function unescapeDoubleEscaped(content) {
    if (!content || typeof content !== 'string') return content;

    // Detectar sinais de double-escaping:
    // 1. Presença de \\n literal (dois chars) como separador principal
    // 2. Presença de \\\" literal (dois chars) como aspas
    // 3. Todo o conteúdo em uma única linha com muitos \\n
    const hasLiteralNewlines = content.includes('\\n') && !content.includes('\n');
    const hasLiteralEscapedQuotes = content.includes('\\"') && content.indexOf('"') === content.indexOf('\\"');
    const isSingleLineWithEscapes = content.split('\n').length <= 2 && content.includes('\\n');

    if (hasLiteralNewlines || isSingleLineWithEscapes) {
        try {
            // Tentar interpretar como string JSON (a string já está escapada como valor JSON)
            const unescaped = JSON.parse('"' + content.replace(/^"|"$/g, '') + '"');
            if (unescaped && unescaped.length > 0 && unescaped !== content) {
                return unescaped;
            }
        } catch {
            // Fallback: fazer unescape manual dos padrões mais comuns
            let fixed = content;
            fixed = fixed.replace(/\\n/g, '\n');
            fixed = fixed.replace(/\\t/g, '\t');
            fixed = fixed.replace(/\\"/g, '"');
            fixed = fixed.replace(/\\\\/g, '\\');
            return fixed;
        }
    }

    return content;
}

function sanitizeGeneratedFiles(filesObj) {
    if (!filesObj || !filesObj.files) return filesObj;

    for (const file of filesObj.files) {
        // PRIMEIRO: Corrigir double-escaping em todos os arquivos
        const originalContent = file.content;
        file.content = unescapeDoubleEscaped(file.content);
        if (file.content !== originalContent) {
            console.log(`   🔧 Double-escaping corrigido em ${file.path}`);
        }

        // Sanitizar tsconfig.json se presente
        if (file.path === 'tsconfig.json' || file.path.endsWith('tsconfig.json')) {
            try {
                JSON.parse(file.content);
            } catch {
                const sanitized = sanitizeJsonString(file.content);
                try {
                    JSON.parse(sanitized);
                    file.content = sanitized;
                    console.log(`   🔧 tsconfig.json sanitizado (trailing commas removidas)`);
                } catch { /* keep original */ }
            }
        }

        // Auto-adicionar 'use client' a componentes que usam client-side features
        if (file.path.endsWith('.tsx') && file.path.includes('components/')) {
            const needsUseClient =
                file.content.includes("from 'framer-motion'") ||
                file.content.includes('from "framer-motion"') ||
                file.content.includes('useState') ||
                file.content.includes('useEffect') ||
                file.content.includes('useRef') ||
                file.content.includes('onClick');

            const hasUseClient =
                file.content.startsWith("'use client'") ||
                file.content.startsWith('"use client"');

            if (needsUseClient && !hasUseClient) {
                file.content = "'use client';\n\n" + file.content;
                console.log(`   🔧 'use client' adicionado automaticamente a ${file.path}`);
            }
        }
    }

    // Auto-detectar e corrigir dependências faltantes
    autoFixDependencies(filesObj);

    return filesObj;
}

// ============================================================
// AUTO-FIX DEPENDENCIES — Detecta imports e corrige package.json
// ============================================================

// Mapa de pacotes conhecidos com versões recomendadas
const KNOWN_PACKAGES = {
    // Radix UI
    '@radix-ui/react-slot': '^1.0.0',
    '@radix-ui/react-dialog': '^1.0.0',
    '@radix-ui/react-dropdown-menu': '^2.0.0',
    '@radix-ui/react-accordion': '^1.0.0',
    '@radix-ui/react-tabs': '^1.0.0',
    '@radix-ui/react-tooltip': '^1.0.0',
    '@radix-ui/react-popover': '^1.0.0',
    '@radix-ui/react-select': '^2.0.0',
    '@radix-ui/react-checkbox': '^1.0.0',
    '@radix-ui/react-switch': '^1.0.0',
    '@radix-ui/react-label': '^2.0.0',
    '@radix-ui/react-separator': '^1.0.0',
    '@radix-ui/react-avatar': '^1.0.0',
    '@radix-ui/react-scroll-area': '^1.0.0',
    '@radix-ui/react-navigation-menu': '^1.0.0',
    // Utilitários shadcn/ui
    'class-variance-authority': '^0.7.0',
    'clsx': '^2.1.0',
    'tailwind-merge': '^2.2.0',
    'tailwind-variants': '^0.2.0',
    'cmdk': '^0.2.0',
    // Animação
    'framer-motion': '^11.0.0',
    // Ícones
    'lucide-react': '^0.300.0',
    '@heroicons/react': '^2.0.0',
    'react-icons': '^5.0.0',
    // Formulários
    'react-hook-form': '^7.0.0',
    '@hookform/resolvers': '^3.0.0',
    'zod': '^3.22.0',
    // Outros comuns
    'date-fns': '^3.0.0',
    'recharts': '^2.10.0',
    'embla-carousel-react': '^8.0.0',
    'sonner': '^1.0.0',
    'next-themes': '^0.3.0',
    'react-day-picker': '^8.0.0',
    'vaul': '^0.9.0',
    'input-otp': '^1.0.0',
};

// Conteúdo padrão para lib/utils.ts (padrão shadcn/ui)
const LIB_UTILS_CONTENT = `import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;

function autoFixDependencies(filesObj) {
    if (!filesObj || !filesObj.files) return;

    // 1. Encontrar o package.json
    const pkgFile = filesObj.files.find(f => f.path === 'package.json');
    if (!pkgFile) {
        console.warn('   ⚠️ package.json não encontrado — pulando auto-fix de dependências');
        return;
    }

    let pkgJson;
    try {
        pkgJson = JSON.parse(pkgFile.content);
    } catch {
        console.warn('   ⚠️ package.json inválido — pulando auto-fix de dependências');
        return;
    }

    const allDeps = {
        ...(pkgJson.dependencies || {}),
        ...(pkgJson.devDependencies || {})
    };

    // 2. Escanear todos os arquivos .ts/.tsx para imports
    const importRegex = /(?:import\s+.*?\s+from\s+['"]([^'"./][^'"]*)['"]\s*;?|require\s*\(\s*['"]([^'"./][^'"]*)['"]\s*\))/g;
    const importedPackages = new Set();
    let needsLibUtils = false;

    for (const file of filesObj.files) {
        if (!file.path.endsWith('.ts') && !file.path.endsWith('.tsx')) continue;

        let match;
        const regex = new RegExp(importRegex.source, 'g');
        while ((match = regex.exec(file.content)) !== null) {
            const pkg = match[1] || match[2];
            if (pkg) {
                // Extrair o nome do pacote (sem subpath)
                // Ex: '@radix-ui/react-slot' de '@radix-ui/react-slot'
                // Ex: 'framer-motion' de 'framer-motion'
                // Ex: 'next' de 'next/font/google'
                let pkgName;
                if (pkg.startsWith('@')) {
                    // Scoped package: @scope/name
                    const parts = pkg.split('/');
                    pkgName = parts.length >= 2 ? `${parts[0]}/${parts[1]}` : pkg;
                } else {
                    pkgName = pkg.split('/')[0];
                }
                importedPackages.add(pkgName);
            }
        }

        // Verificar se usa @/lib/utils (cn function)
        if (file.content.includes("from '@/lib/utils'") || file.content.includes('from "@/lib/utils"')) {
            needsLibUtils = true;
        }
    }

    // 3. Detectar pacotes faltantes
    // Excluir pacotes internos do Next.js / React que já estão inclusos
    const builtinPackages = new Set(['react', 'react-dom', 'next', 'typescript']);
    const missingPackages = [];

    for (const pkg of importedPackages) {
        if (builtinPackages.has(pkg)) continue;
        if (allDeps[pkg]) continue; // Já está no package.json

        const version = KNOWN_PACKAGES[pkg] || 'latest';
        missingPackages.push({ name: pkg, version });
    }

    // 4. Adicionar pacotes faltantes ao package.json
    if (missingPackages.length > 0) {
        if (!pkgJson.dependencies) pkgJson.dependencies = {};

        console.log(`   📦 Auto-fix: ${missingPackages.length} dependência(s) faltante(s) detectada(s):`);
        for (const pkg of missingPackages) {
            pkgJson.dependencies[pkg.name] = pkg.version;
            console.log(`      + ${pkg.name}@${pkg.version}`);
        }

        // Atualizar o conteúdo do package.json
        pkgFile.content = JSON.stringify(pkgJson, null, 2);
    }

    // 5. Auto-gerar lib/utils.ts se necessário
    if (needsLibUtils) {
        const hasLibUtils = filesObj.files.some(f =>
            f.path === 'lib/utils.ts' || f.path === 'lib/utils.tsx'
        );

        if (!hasLibUtils) {
            filesObj.files.push({
                path: 'lib/utils.ts',
                content: LIB_UTILS_CONTENT
            });
            console.log(`   🔧 lib/utils.ts auto-gerado (cn utility para Tailwind)`);

            // Garantir que clsx e tailwind-merge estão no package.json
            if (!pkgJson.dependencies['clsx']) {
                pkgJson.dependencies['clsx'] = KNOWN_PACKAGES['clsx'];
                console.log(`      + clsx@${KNOWN_PACKAGES['clsx']}`);
            }
            if (!pkgJson.dependencies['tailwind-merge']) {
                pkgJson.dependencies['tailwind-merge'] = KNOWN_PACKAGES['tailwind-merge'];
                console.log(`      + tailwind-merge@${KNOWN_PACKAGES['tailwind-merge']}`);
            }
            pkgFile.content = JSON.stringify(pkgJson, null, 2);
        }
    }

    if (missingPackages.length === 0 && !needsLibUtils) {
        console.log('   ✅ Todas as dependências estão no package.json');
    }
}

// Carregar definições dos agentes
const MASTER_PROMPT = fs.readFileSync(path.join(__dirname, '../agents/Agente Master.md'), 'utf8');
const FRONTEND_PROMPT = fs.readFileSync(path.join(__dirname, '../agents/Blueprint Agente Front-end.md'), 'utf8');
const BACKEND_PROMPT = fs.readFileSync(path.join(__dirname, '../agents/Blueprint Agente IA Back-end.md'), 'utf8');

async function runOrchestration() {
    console.log('🚀 Iniciando Squad LP Creator (Multi-Agent Architecture v2)');
    console.log(`📝 Tema: ${options.theme}`);
    console.log(`🔧 Modo: ${options.frontendOnly ? 'Frontend-Only' : 'Full-Stack'}`);

    // Create Output Dir
    const outputDir = path.resolve(process.cwd(), options.output);
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
    console.log(`📂 Output: ${outputDir}`);

    try {
        // ==================================================================
        // PASSO 1: MASTER AGENT — Gerar SPEC
        // ==================================================================
        console.log('\n━━━ FASE 1: ARQUITETURA & ESPECIFICAÇÃO (MASTER) ━━━');

        let specPromptParts = [];

        // Se tiver imagem de referência, incluir
        if (options.image && fs.existsSync(options.image)) {
            console.log(`🖼️  Analisando referência visual: ${options.image}`);
            const ext = path.extname(options.image).toLowerCase();
            let mime = 'image/png';
            if (ext === '.jpg' || ext === '.jpeg') mime = 'image/jpeg';
            if (ext === '.webp') mime = 'image/webp';

            specPromptParts.push(fileToGenerativePart(options.image, mime));
            specPromptParts.push(`
            IMPORTANTE: O usuário forneceu uma imagem de referência visual (anexada).
            Ao criar a SPEC, inclua uma seção "Diretrizes Visuais" detalhando as cores (Hex), 
            o estilo dos componentes (arredondamento, sombras) e o layout identificados na imagem.
            O Frontend DEVE seguir essa referência visualmente.
            `);
        } else if (options.image) {
            console.warn(`⚠️  Imagem não encontrada: ${options.image}. Ignorando.`);
        }

        specPromptParts.push(`
        Usuário solicitou: "${options.theme}".
        
        Sua tarefa:
        1. Atue como o CTO/Master definido no seu System Prompt.
        2. Analise o tema e infira automaticamente o objetivo, estilo e funcionalidades.
        3. Crie uma ESPECIFICAÇÃO TÉCNICA (SPEC.md) completa para esta Landing Page.
        4. Defina a Stack (Next.js, Tailwind, TypeScript) explicitamente.
        5. Inclua Diretrizes Visuais detalhadas: paleta de cores (Hex), tipografia (Google Fonts), estilo visual.
        6. Retorne APENAS o conteúdo do SPEC.md em markdown.
        `);

        const specContent = await callAgent('MASTER', MASTER_PROMPT, specPromptParts);
        fs.writeFileSync(path.join(outputDir, 'SPEC.md'), specContent);
        console.log(`   📄 Criado: SPEC.md (${specContent.length} chars)`);

        // Limitar tamanho do SPEC para evitar overflow do contexto
        const MAX_SPEC_CHARS = 4000;
        let specForAgents = specContent;
        if (specContent.length > MAX_SPEC_CHARS) {
            specForAgents = specContent.substring(0, MAX_SPEC_CHARS) + '\n\n[... SPEC truncada para economizar contexto ...]';
            console.log(`   ✂️ SPEC truncada de ${specContent.length} para ${MAX_SPEC_CHARS} chars para agentes downstream.`);
        }

        // ==================================================================
        // PASSO 2: FRONTEND AGENT — Gerar Projeto Next.js
        // ==================================================================
        console.log('\n━━━ FASE 2: ENGENHARIA DE INTERFACE (FRONTEND) ━━━');
        const frontendTask = `
        Com base na seguinte SPEC aprovada pelo Master:
        
        ${specForAgents}

        Sua tarefa é atuar como Engenheiro Frontend Senior conforme definido no seu System Prompt.
        
        ### OBJETIVOS VISUAIS (CRÍTICO):
        1. **Design Premium:** Sombras suaves (box-shadow), gradientes sutis, bordas arredondadas (rounded-xl/2xl), espaçamento generoso.
        2. **Imagens:** Use URLs diretas do Unsplash com IDs de fotos reais. NUNCA invente URLs.
           - Formato: https://images.unsplash.com/photo-{ID}?auto=format&fit=crop&w=800&q=80
           - Se não souber um ID real, use gradientes CSS coloridos como placeholder em vez de URL de imagem.
        3. **Tipografia:** Combine fontes do Google Fonts via next/font/google. Use Inter para corpo e uma display font para títulos.

        ### ESCOPO DE ENTREGA (ARQUIVOS OBRIGATÓRIOS):
        Gere TODO o código necessário para o projeto rodar com 'npm install && npm run dev' imediatamente.
        
        Retorne EXATAMENTE este formato JSON (sem markdown, sem comentários):
        {
          "files": [
            { "path": "package.json", "content": "..." },
            { "path": "tsconfig.json", "content": "..." },
            { "path": "next.config.js", "content": "..." },
            { "path": "postcss.config.js", "content": "..." },
            { "path": "tailwind.config.ts", "content": "..." },
            { "path": "app/layout.tsx", "content": "..." },
            { "path": "app/page.tsx", "content": "..." },
            { "path": "app/globals.css", "content": "..." },
            { "path": "components/Navbar.tsx", "content": "..." },
            { "path": "components/Hero.tsx", "content": "..." },
            { "path": "components/Features.tsx", "content": "..." },
            { "path": "components/Footer.tsx", "content": "..." }
          ]
        }
        
        ### REGRAS TÉCNICAS:
        - **package.json:** Inclua scripts (dev, build, start, lint) e TODAS as dependências necessárias.
        - **Dependências mínimas:** next, react, react-dom, framer-motion, lucide-react, tailwindcss, postcss, autoprefixer, typescript, @types/react, @types/node.
        - TODA biblioteca que você importar no código DEVE estar no package.json.
        - **tailwind.config.ts:** Configure cores (primary, secondary, accent) e fontes baseadas na SPEC.
        - **Ícones Lucide:** Use apenas ícones que você tem CERTEZA que existem (ex: ArrowRight, Check, Star, Heart, Zap, Shield, Users, Mail).
        - **Use Client:** Adicione 'use client' no topo de componentes que usam hooks (useState, useEffect, motion).
        - **Sem trailing commas** em JSON (package.json, tsconfig.json).
        `;

        const frontendRes = await callAgent('FRONTEND', FRONTEND_PROMPT, frontendTask, null, true);

        // Parse com sanitização e retry
        const frontendFiles = await parseJsonWithRetry(frontendRes, 'FRONTEND', frontendTask, FRONTEND_PROMPT);

        if (frontendFiles) {
            // Sanitizar arquivos JSON internos (tsconfig, etc.)
            sanitizeGeneratedFiles(frontendFiles);

            frontendFiles.files.forEach(file => {
                const filePath = path.join(outputDir, file.path);
                const dir = path.dirname(filePath);
                if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
                fs.writeFileSync(filePath, file.content);
                console.log(`   📄 Criado: ${file.path}`);
            });
            console.log(`\n   ✅ ${frontendFiles.files.length} arquivos Frontend gerados.`);
        } else {
            console.error('\n   ❌ FALHA: Não foi possível gerar os arquivos Frontend.');
            fs.writeFileSync(path.join(outputDir, 'frontend_error.log'), frontendRes);
            console.log('   📋 Output bruto salvo em frontend_error.log');
        }

        // ==================================================================
        // PASSO 3: BACKEND AGENT — API Routes (Opcional)
        // ==================================================================
        if (options.frontendOnly) {
            console.log('\n━━━ FASE 3: BACKEND ━━━');
            console.log('   ⏭️ Pulado (modo --frontend-only ativado).');
        } else {
            console.log('\n━━━ FASE 3: API ROUTES (BACKEND) ━━━');
            const backendTask = `
            Com base na seguinte SPEC aprovada:
            
            ${specForAgents}

            Sua tarefa é criar as API Routes do Next.js para este projeto.

            Gere as rotas necessárias (formulário de contato, etc.) seguindo o padrão do App Router.
            
            Retorne EXATAMENTE este formato JSON (sem markdown, sem comentários):
            {
              "files": [
                { "path": "app/api/contact/route.ts", "content": "..." },
                { "path": "lib/schemas/contact.ts", "content": "..." }
              ]
            }
            
            REGRAS:
            - Use Zod para validação
            - Use safeParse() (nunca parse())  
            - Trate erros com status codes corretos (400, 500)
            - Retorne APENAS JSON válido, sem trailing commas
            `;

            const backendRes = await callAgent('BACKEND', BACKEND_PROMPT, backendTask, null, true);

            const backendFiles = await parseJsonWithRetry(backendRes, 'BACKEND', backendTask, BACKEND_PROMPT);

            if (backendFiles) {
                backendFiles.files.forEach(file => {
                    const filePath = path.join(outputDir, file.path);
                    const dir = path.dirname(filePath);
                    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
                    fs.writeFileSync(filePath, file.content);
                    console.log(`   ⚙️ Criado: ${file.path}`);
                });
                console.log(`\n   ✅ ${backendFiles.files.length} arquivos Backend gerados.`);

                // Se backend gerou, adicionar zod ao package.json se não existir
                const pkgPath = path.join(outputDir, 'package.json');
                if (fs.existsSync(pkgPath)) {
                    try {
                        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
                        if (pkg.dependencies && !pkg.dependencies.zod) {
                            pkg.dependencies.zod = '^3.22.0';
                            fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
                            console.log('   📦 Adicionado "zod" ao package.json');
                        }
                    } catch (e) {
                        console.warn('   ⚠️ Não foi possível atualizar package.json com zod');
                    }
                }
            } else {
                console.error('\n   ❌ FALHA: Não foi possível gerar os arquivos Backend.');
                fs.writeFileSync(path.join(outputDir, 'backend_error.log'), backendRes);
                console.log('   📋 Output bruto salvo em backend_error.log');
            }
        }

        // ==================================================================
        // RESUMO FINAL
        // ==================================================================
        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`✅ Projeto gerado com sucesso em: ${outputDir}`);
        console.log('\n📋 Próximos passos:');
        console.log(`   cd ${options.output}`);
        console.log('   npm install');
        console.log('   npm run dev');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    } catch (error) {
        console.error('\n❌ Falha na orquestração:', error.message);
        if (options.debug) {
            console.error(error.stack);
        }
    }
}

runOrchestration();
