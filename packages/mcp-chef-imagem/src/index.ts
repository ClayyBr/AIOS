#!/usr/bin/env node

/**
 * MCP Server: Chef de Imagem
 *
 * Servidor MCP para geração de imagens de pratos via Google AI Studio.
 * Modelo: gemini-3.1-flash-image-preview
 *
 * Tool exposta: gerar_imagem_prato
 *   - Recebe prompt textual + imagem de referência (opcional)
 *   - Envia para Google AI Studio API
 *   - Salva imagem gerada em squads/CFO/design/
 *   - Retorna path do arquivo + metadata
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import * as path from "node:path";

// ============================================================================
// Constants
// ============================================================================

const MODEL_NAME = "gemini-2.5-flash-image";
const OUTPUT_DIR_NAME = "design";
const SQUAD_DIR = "squads/CFO";

const VALID_ASPECT_RATIOS = [
    "1:1", "1:4", "1:8", "2:3", "3:2", "3:4",
    "4:1", "4:3", "4:5", "5:4", "8:1", "9:16", "16:9", "21:9",
] as const;

const VALID_RESOLUTIONS = ["512px", "1K", "2K", "4K"] as const;

// ============================================================================
// Helpers
// ============================================================================

/**
 * Resolve o diretório de output relativo ao CWD do projeto.
 * Se o CWD já contém squads/CFO, usa diretamente.
 * Caso contrário, tenta resolver a partir do CWD.
 */
function resolveOutputDir(): string {
    const cwd = process.cwd();

    // Tentar resolver a partir do CWD
    const candidates = [
        path.join(cwd, SQUAD_DIR, OUTPUT_DIR_NAME),
        path.join(cwd, OUTPUT_DIR_NAME),
    ];

    for (const candidate of candidates) {
        if (fs.existsSync(path.dirname(candidate))) {
            return candidate;
        }
    }

    // Fallback: criar no CWD
    return path.join(cwd, SQUAD_DIR, OUTPUT_DIR_NAME);
}

/**
 * Gera um nome de arquivo descritivo a partir do prompt.
 */
function generateFileName(prompt: string): string {
    const slug = prompt
        .slice(0, 60)
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

    const now = new Date();
    const timestamp = now.toISOString()
        .replace(/[:.]/g, "")
        .replace("T", "-")
        .slice(0, 15);

    return `${slug || "prato"}-${timestamp}.png`;
}

// ============================================================================
// MCP Server Setup
// ============================================================================

const server = new McpServer({
    name: "chef-imagem",
    version: "1.0.0",
});

// ============================================================================
// Tool: gerar_imagem_prato
// ============================================================================

server.tool(
    "gerar_imagem_prato",
    "Gera uma imagem fotorrealista de um prato de restaurante usando Google AI Studio (Gemini 3.1 Flash Image). " +
    "Aceita um prompt textual descritivo e opcionalmente uma imagem de referência para manter consistência visual. " +
    "A imagem gerada é salva como PNG na pasta squads/CFO/design/ do repositório local.",
    {
        prompt: z
            .string()
            .min(5, "Prompt deve ter pelo menos 5 caracteres")
            .max(2000, "Prompt não pode exceder 2000 caracteres")
            .describe(
                "Prompt fotográfico descritivo do prato. Quanto mais detalhado, melhor o resultado. " +
                "Exemplo: 'Professional food photography of a grilled ribeye steak with golden grill marks, " +
                "served on a dark ceramic plate. Soft natural side lighting. Shallow depth of field, 50mm macro lens. " +
                "Dark moody atmosphere. Photorealistic, ultra high quality.'"
            ),
        imagem_referencia: z
            .string()
            .optional()
            .describe(
                "Imagem de referência codificada em base64. Quando fornecida, o modelo tentará manter " +
                "consistência visual (ângulo, estilo, composição) com esta referência, alterando apenas o conteúdo do prato."
            ),
        mime_type_referencia: z
            .enum(["image/png", "image/jpeg", "image/webp"])
            .optional()
            .default("image/png")
            .describe("MIME type da imagem de referência. Default: image/png"),
        negative_prompt: z
            .string()
            .optional()
            .describe(
                "Restrições negativas — o que NÃO deve aparecer na imagem. " +
                "Exemplo: 'sem mãos humanas, sem talheres de plástico, sem texto, sem watermark'"
            ),
        aspect_ratio: z
            .enum(VALID_ASPECT_RATIOS)
            .optional()
            .default("1:1")
            .describe(
                "Aspecto da imagem gerada. Opções: 1:1 (quadrado, Instagram), 3:4 (retrato), " +
                "4:3 (paisagem), 16:9 (widescreen), 9:16 (stories). Default: 1:1"
            ),
        resolution: z
            .enum(VALID_RESOLUTIONS)
            .optional()
            .default("1K")
            .describe("Resolução da imagem: 512px, 1K, 2K ou 4K. Default: 1K"),
    },
    async ({
        prompt,
        imagem_referencia,
        mime_type_referencia,
        negative_prompt,
        aspect_ratio,
        resolution,
    }) => {
        // Validar API Key
        const apiKey = process.env.GOOGLE_AI_STUDIO_API_KEY;
        if (!apiKey) {
            return {
                content: [
                    {
                        type: "text" as const,
                        text: JSON.stringify({
                            success: false,
                            error:
                                "API Key não configurada. Configure a variável de ambiente GOOGLE_AI_STUDIO_API_KEY. " +
                                "Obtenha sua key em: https://aistudio.google.com/apikey",
                        }),
                    },
                ],
            };
        }

        try {
            // Inicializar client
            const ai = new GoogleGenAI({ apiKey });

            // Montar contents
            const contents: Array<{ text: string } | { inlineData: { mimeType: string; data: string } }> = [];

            // Adicionar prompt principal
            let fullPrompt = prompt;
            if (negative_prompt) {
                fullPrompt += `\n\nIMPORTANT: Do NOT include the following in the image: ${negative_prompt}`;
            }
            contents.push({ text: fullPrompt });

            // Adicionar imagem de referência se fornecida
            if (imagem_referencia) {
                contents.push({
                    inlineData: {
                        mimeType: mime_type_referencia || "image/png",
                        data: imagem_referencia,
                    },
                });
            }

            // Chamar API
            const response = await ai.models.generateContent({
                model: MODEL_NAME,
                contents: contents,
                config: {
                    responseModalities: ["TEXT", "IMAGE"],
                    imageConfig: {
                        aspectRatio: aspect_ratio,
                        // imageSize is supported only in 3.1+ preview models
                        // we remove it to avoid API errors on 2.5 flash
                    },
                },
            });

            // Processar resposta
            let textResponse = "";
            let imageSaved = false;
            let filePath = "";

            if (!response.candidates || response.candidates.length === 0) {
                return {
                    content: [
                        {
                            type: "text" as const,
                            text: JSON.stringify({
                                success: false,
                                error: "A API não retornou nenhum candidato na resposta. " +
                                    "O prompt pode ter sido bloqueado pelos filtros de segurança. " +
                                    "Tente reformular o prompt removendo termos que possam ser sensíveis.",
                            }),
                        },
                    ],
                };
            }

            for (const part of response.candidates[0].content!.parts!) {
                if ((part as any).text) {
                    textResponse = (part as any).text;
                } else if ((part as any).inlineData) {
                    const imageData = (part as any).inlineData.data;
                    const buffer = Buffer.from(imageData, "base64");

                    // Resolver diretório e salvar
                    const outputDir = resolveOutputDir();
                    fs.mkdirSync(outputDir, { recursive: true });

                    const fileName = generateFileName(prompt);
                    filePath = path.join(outputDir, fileName);
                    fs.writeFileSync(filePath, buffer);
                    imageSaved = true;
                }
            }

            if (!imageSaved) {
                return {
                    content: [
                        {
                            type: "text" as const,
                            text: JSON.stringify({
                                success: false,
                                error: "A API retornou uma resposta mas não incluiu nenhuma imagem. " +
                                    "Resposta textual: " + (textResponse || "vazia") + ". " +
                                    "Tente reformular o prompt ou verificar se o modelo suporta geração de imagem.",
                            }),
                        },
                    ],
                };
            }

            // Sucesso
            const result = {
                success: true,
                file_path: filePath,
                file_name: path.basename(filePath),
                prompt_final: fullPrompt,
                aspect_ratio: aspect_ratio,
                resolution: resolution,
                model: MODEL_NAME,
                timestamp: new Date().toISOString(),
                text_response: textResponse || undefined,
            };

            return {
                content: [
                    {
                        type: "text" as const,
                        text: JSON.stringify(result, null, 2),
                    },
                ],
            };
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : String(error);

            return {
                content: [
                    {
                        type: "text" as const,
                        text: JSON.stringify({
                            success: false,
                            error: `Erro ao gerar imagem: ${errorMessage}`,
                            hint: errorMessage.includes("API_KEY")
                                ? "Verifique se a GOOGLE_AI_STUDIO_API_KEY está configurada corretamente."
                                : errorMessage.includes("quota")
                                    ? "Limite de requisições excedido. Aguarde alguns minutos e tente novamente."
                                    : errorMessage.includes("SAFETY")
                                        ? "O prompt foi bloqueado pelos filtros de segurança. Reformule o prompt."
                                        : "Verifique sua conexão com a internet e tente novamente.",
                        }),
                    },
                ],
            };
        }
    }
);

// ============================================================================
// Start Server
// ============================================================================

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("MCP Server Chef de Imagem rodando via stdio...");
}

main().catch((error) => {
    console.error("Erro fatal ao iniciar MCP Server:", error);
    process.exit(1);
});
