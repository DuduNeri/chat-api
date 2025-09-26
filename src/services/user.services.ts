import bcrypt from "bcrypt";
import User from "../models/user.model";
import { ICreateUser, IUserResponse } from "../interfaces/user.interface";

export class UserService {
  async createUser(data: ICreateUser): Promise<IUserResponse> {
    if (!data.name || !data.email || !data.password) {
      throw new Error("Todos os campos são obrigatórios");
    }

    const existing = await User.findOne({ where: { email: data.email } });
    if (existing) throw new Error("Esse email já está em uso!");

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await User.create({
      name: data.name,
      email: data.email,
      password: hashedPassword
    });

    const { password, ...safeUser } = newUser.toJSON();
    return safeUser as IUserResponse;
  }

  async GetUserById(id: string): Promise<IUserResponse> {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("Erro ao buscar usuário");
    }
    return user.toJSON() as IUserResponse;
  }

}
