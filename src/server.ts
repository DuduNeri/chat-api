import app from "./app";
import { sequelize } from "./config/db";

const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado ao banco com sucesso!");

    await sequelize.sync({ alter: true });
    console.log("✅ Tabelas sincronizadas!");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Erro ao conectar no banco:", error);
  }
}

startServer();
