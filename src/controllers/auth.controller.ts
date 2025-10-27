import { AuthService } from "../services/auth.service";

export class AuthController {
  private authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }

  async login(email: string, password: string) {
    try {
      return await this.authService.login(email, password);
    } catch (error: any) {
      throw new Error(error.message || "Falha ao fazer login");
    }
  }
}
