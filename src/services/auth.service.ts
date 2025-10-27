import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import dotenv from "dotenv";

dotenv.config();

export class AuthService {
  async login(email: string, password: string) {
    // 1️⃣ Busca o usuário pelo e-mail
    const user = await User.findOne({ where: { email } });

    // 2️⃣ Se não existir ou senha estiver errada, retorna erro genérico
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Credenciais inválidas");
    }

    // 3️⃣ Gera o token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    // 4️⃣ Retorna token + dados do usuário (sem a senha)
    return {
      message: "Login realizado com sucesso",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
