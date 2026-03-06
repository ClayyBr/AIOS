---
name: gerar-foto-prato
description: Gera foto fotorrealista de um prato do restaurante usando IA generativa (Google AI Studio)
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
    description: Imagem de referência (arrastada no chat) para manter consistência visual
  - name: negative_prompt
    type: string
    required: false
    description: "Restrições negativas (o que NÃO deve aparecer na imagem)"
  - name: estilo
    type: string
    required: false
    default: dark-moody
    description: "Estilo visual: dark-moody, bright-airy, rustico, minimal"
  - name: aspect_ratio
    type: string
    required: false
    default: "1:1"
    description: "Aspecto da imagem: 1:1, 3:4, 4:3, 16:9, 9:16"
  - name: resolution
    type: string
    required: false
    default: "1K"
    description: "Resolução: 512px, 1K, 2K, 4K"
outputs:
  - name: imagem
    type: file
    description: Imagem PNG salva em squads/CFO/design/
  - name: prompt_final
    type: string
    description: Prompt completo enviado à API
---

# Task: Gerar Foto de Prato

## Steps

### 1. Receber Input
- Ler descrição do prato fornecida pelo usuário
- Verificar se há imagem de referência arrastada no chat
- Verificar se há negative prompt especificado

### 2. Enriquecer Prompt
- Transformar texto simples em prompt fotográfico profissional
- Adicionar técnicas de food photography: ângulo, iluminação, composição, lente
- Aplicar estilo visual selecionado (dark-moody, bright-airy, rustico, minimal)
- Prompt final DEVE ser em inglês para melhor resultado do modelo

### 3. Montar Negative Prompt
- Se o usuário forneceu restrições, incluir como negative prompt
- Defaults automáticos: "cartoon, illustration, drawing, sketch, low quality, blurry, watermark, text overlay"

### 4. Chamar MCP Tool
- Invocar `gerar_imagem_prato` com:
  - `prompt`: prompt enriquecido (inglês)
  - `imagem_referencia`: base64 da imagem de referência (se houver)
  - `negative_prompt`: restrições (se houver)
  - `aspect_ratio`: aspecto selecionado
  - `resolution`: resolução selecionada

### 5. Confirmar Resultado
- Exibir confirmação com path do arquivo salvo
- Mostrar prompt final utilizado
- Oferecer opção de refazer com ajustes
