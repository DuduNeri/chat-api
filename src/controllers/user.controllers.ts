import { ICreateUser, IUserResponse } from "../interfaces/user.interface";
import { UserService } from "../services/user.services";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async create(data: ICreateUser): Promise<IUserResponse> {
    return await this.userService.createUser(data);
  }
}
