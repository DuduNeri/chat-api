import bcrypt from "bcrypt";
import User from "../models/user.model";
import {
  ICreateUser,
  IUserResponse,
  type IUser,
} from "../interfaces/user.interface";

export class UserService {
  async CreateUser(data: ICreateUser): Promise<IUserResponse> {
    if (!data.name || !data.email || !data.password) {
      throw new Error("Todos os campos são obrigatórios");
    }

    const existing = await User.findOne({ where: { email: data.email } });
    if (existing) throw new Error("Esse email já está em uso!");

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await User.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    const { password, ...safeUser } = newUser.toJSON();
    return safeUser as IUserResponse;
  }

  async GetUserById(id: string): Promise<IUserResponse> {
    const user = await User.findByPk(id, {
      attributes: { exclude: [`password`] },
    });
    if (!user) {
      throw new Error("Erro ao buscar usuário");
    }
    return user.toJSON() as IUserResponse;
  }

  async GetAllUsers(): Promise<IUserResponse[]> {
    const users = await User.findAll({
      attributes: { exclude: [`password`] },
    });

    return users.map((user) => user.toJSON() as IUserResponse);
  }

  async DeleteUserById(id: string): Promise<{ message: string }> {
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    await user.destroy();
    return { message: "Usuário deletado com sucesso" };
  }

  async UpdateUser(id: string, data: Partial<IUser>): Promise<IUserResponse> {
    const [affectedRows] = await User.update(
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      {
        where: { id },
      }
    );
    if (affectedRows === 0) {
      throw new Error("Erro ao atualizar usuário");
    }

    const updatedUser = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    if (!updatedUser) {
      throw new Error("Usuário não encontrado após atualização");
    }
    return updatedUser.toJSON() as IUserResponse;
  }
}
