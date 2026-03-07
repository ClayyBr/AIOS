# Reconhecimento de Áudio (Story 2.4 - Opcional)

**Status:** Planejado para V2
**Prioridade:** Média/Baixa
**Impacto:** Alto (Acessibilidade e comodidade para o cliente)
**Complexidade:** Baixa (graças à natureza multimodal do Gemini 2.5 Flash)

## O Problema
Muitos clientes de delivery preferem enviar áudios grandes detalhando o pedido ao invés de digitar tudo, principalmente quando estão na rua ou com as mãos ocupadas. Atualmente, a Luna responde com uma mensagem de *fallback* pedindo que o cliente digite em texto.

## A Solução Planejada
Em vez de depender de serviços custosos de transcrição (Speech-to-Text) como o Whisper, usaremos a capacidade nativa multimodal do Gemini 2.5 Flash de processar áudios diretamente.

## Implementação Técnica (Story 2.4)

1. **Webhook Meta (`src/routes/webhook.ts`):** 
   - Modificar a checagem que rejeita mensagens do tipo `audio`.
   - Capturar o `media_id` do payload da Meta.
   
2. **Download da Mídia (`src/services/whatsapp.sender.ts`):**
   - Criar método `downloadMedia(mediaId: string): Promise<Buffer>` para buscar a URL do áudio e fazer o download passando o `META_ACCESS_TOKEN`.
   - Converter o buffer baixado para `base64`.

3. **Injeção no Gemini (`src/services/gemini.service.ts`):**
   - Modificar a construção de mensagens no SDK do Google.
   - Ao longo do histórico e do `userMessage`, anexar o formato `inlineData` contendo `mimeType: "audio/ogg"` e a string `base64` do áudio.
   
4. **Limpeza e Escalonamento:**
   - O áudio será processado na memória RAM em tempo real de execução.
   - Como os áudios do WhatsApp possuem forte compressão (em geral kbps baixos), o impacto em memória no plano limitante de 512MB do Render será irrisório desde que se implemente as proteções de garbage collection ativas nos buffers processados.

## Pontos de Atenção (Riscos de Implementação)
- **Latência:** Há o tempo duplo de rede (Download Meta -> Upload Google), o que acrescenta cerca de +1 a +3 segundos na resposta padrão do bot.
- **Áudios Imensos:** Implementar uma trava para rejeitar áudios maiores que X minutos (limitação do tamanho de payload API Meta/Gemini).
