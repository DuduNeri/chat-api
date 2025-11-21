import WebSocket, { Server } from "ws";
import { MessageService } from "../services/message.service";

interface ChatClients {
  [chatId: string]: Set<WebSocket>;
}

export const initWebSocket = (server: any) => {
  const wss = new Server({ server });
  const chatClients: ChatClients = {};
  const messageService = new MessageService();

  wss.on("connection", (ws, req) => {
    if (!req.url) {
      ws.close(1002, "URL inválida");
      return;
    }

    const url = new URL(req.url, `http://${req.headers.host}`);
    const chatId = url.searchParams.get("chatId");
    if (!chatId) {
      ws.close(1002, "chatId ausente");
      return;
    }

    if (!chatClients[chatId]) chatClients[chatId] = new Set();
    chatClients[chatId].add(ws);

    console.log(`✅ Usuário conectado no chat ${chatId}`);

    ws.on("message", async (data) => {
      try {
        const payload = JSON.parse(data.toString());
        const { conversationId, senderId, content, clientTempId } = payload; // <--- ADICIONE clientTempId

        if (!conversationId || !senderId || !content?.trim()) {
          console.warn("❌ Payload inválido:", payload);
          return;
        }

        console.log(`Recebida mensagem para salvar: ${content}`); // Log extra

        const message = await messageService.create(
          conversationId,
          senderId,
          content.trim()
        );

        // Inclua clientTempId na resposta, se existir
        const broadcastMessage = {
          ...message,
          clientTempId: clientTempId || undefined,
        };

        const clients = chatClients[conversationId] || [];
        for (const client of clients) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(broadcastMessage));
          }
        }
      } catch (err) {
        console.error("❌ Erro ao processar mensagem:", err);
      }
    });

    ws.on("close", () => {
      chatClients[chatId]?.delete(ws);
      if (chatClients[chatId]?.size === 0) delete chatClients[chatId]; // Limpa salas vazias
      console.log(`❌ Usuário desconectado do chat ${chatId}`);
    });
  });
};
