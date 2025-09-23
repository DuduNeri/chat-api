import app from "./app";
import { config } from "./config/db";

app.listen(config.port, () => {
  console.log(`Servidor rodando na porta ${config.port}`);
});
