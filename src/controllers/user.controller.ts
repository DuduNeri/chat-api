import {
  ICreateUser,
  IUserResponse,
  IUser,
} from "../interfaces/user.interface";
import { UserService } from "../services/user.service";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }
  async create(data: ICreateUser): Promise<IUserResponse> {
    try {
      return await this.userService.create(data);
    } catch (error: any) {
      throw new Error(`Erro ao criar usuário: ${error.message}`);
    }
  }

  async getById(id: string): Promise<IUserResponse> {
    try {
      return await this.userService.getUserById(id);
    } catch (error: any) {
      throw new Error(`Erro ao buscar usuário com id ${id}: ${error.message}`);
    }
  }

  // async getbyName(name: string): Promise<IUserResponse> {
  //   try {
  //     return await this.userService.getByName(name);
  //   } catch (error: any) {
  //     throw new Error(
  //       `Erro ao buscar usuário pelo nome ${name}: ${error.message}`
  //     );
  //   }
  // }

  async delete(id: string): Promise<void> {
    try {
      await this.userService.deleteUserById(id);
    } catch (error: any) {
      throw new Error(`Erro ao deletar usuário com id ${id}: ${error.message}`);
    }
  }

  async getAll(): Promise<IUserResponse[]> {
    try {
      return await this.userService.getAllUsers();
    } catch (error: any) {
      throw new Error(`Erro ao buscar todos os usuários: ${error.message}`);
    }
  }

  async update(id: string, data: Partial<IUser>): Promise<IUserResponse> {
    try {
      return await this.userService.updateUser(id, data);
    } catch (error: any) {
      throw new Error(
        `Erro ao atualizar usuário com id ${id}: ${error.message}`
      );
    }
  }
}
