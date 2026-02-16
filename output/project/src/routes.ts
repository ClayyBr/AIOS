import { Router } from 'express';
import { identityRouter } from './modules/identity';
// Importar outros routers de módulos conforme criados
// import { conversationRouter } from './modules/conversation';
// import { knowledgeBaseRouter } from './modules/knowledge-base';
// import { agentCoreRouter } from './modules/agent-core';

const router = Router();

// Monta o router de identidade sob /api/identity
router.use('/identity', identityRouter);

// Montar outros routers aqui, por exemplo:
// router.use('/conversation', conversationRouter);
// router.use('/knowledge-base', knowledgeBaseRouter);
// router.use('/agent-core', agentCoreRouter);

// Rota de saúde da API
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

export { router };
