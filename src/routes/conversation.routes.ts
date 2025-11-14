import { Router, Response, Request } from "express";
import { ConversationController } from "../controllers/conversation.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const conversationRouter = Router();
const conversationController = new ConversationController();

/**
 * ✅ POST /sala
 * Cria uma nova conversa (sala de chat)
 * - Rota protegida por JWT
 * - Recebe: title, ownerId e participantId
 * - Cria a conversa e adiciona os participantes iniciais
 */
conversationRouter.post(
  "/sala",
  authMiddleware, 
  async (req: Request, res: Response) => {
    try {
      const { title, participantId } = req.body;

      const ownerId = (req as any).user.id;

      const conversation = await conversationController.create(
        { ownerId, title },
        participantId
      );

      res.status(201).json(conversation);
    } catch (error: any) {
      res.status(400).json({
        message: "Erro ao criar conversa",
        error: error.message,
      });
    }
  }
);

/**
 * ✅ GET /user/:userId
 * Retorna TODAS as conversas em que o usuário participa
 * - Rota protegida por JWT
 * - Exemplo: listar conversas do usuário no painel
 */
conversationRouter.get(
  "/user/:userId",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const {  userId } = req.params;

      // Busca no controller todas as conversas do usuário
      const conversations = await conversationController.getByUser(userId);

      res.status(200).json(conversations);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
);

/**
 * ✅ GET /:conversationId
 * Retorna UMA conversa específica
 * - Inclui participantes e mensagens
 * - Usada quando o usuário abre a sala no chat
 */
conversationRouter.get(
  "/:conversationId",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { conversationId } = req.params;

      // Busca conversa completa com mensagens e participantes
      const conversation = await conversationController.getByConversationId(
        conversationId
      );

      res.status(200).json(conversation);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
);

/**
 * ✅ POST /:conversationId/participants
 * Adiciona um novo participante na conversa
 * - Rota protegida por JWT
 * - Body: { userId: "..." }
 */
conversationRouter.post(
  "/:conversationId/participants",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { conversationId } = req.params;
      const { userId } = req.body;

      // Controller adiciona o usuário como participante da conversa
      await conversationController.addParticipant(conversationId, userId);

      res.status(200).json({ message: "Participante adicionado com sucesso" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
);

/**
 * ✅ DELETE /:conversationId/participants/:userId
 * Remove um participante da conversa
 * - Útil para sair de um grupo ou remover alguém
 */
conversationRouter.delete(
  "/:conversationId/participants/:userId",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { conversationId, userId } = req.params;

      // Remove o participante usando o controller
      await conversationController.removeParticipant(conversationId, userId);

      res.status(200).json({ message: "Participante removido com sucesso" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
);

export default conversationRouter;
