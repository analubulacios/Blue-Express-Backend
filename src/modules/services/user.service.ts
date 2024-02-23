import { CreateUserDto } from "../dtos/user.dtos";
import User from "../models/user.model";

class UserService {
  async createUser(body: CreateUserDto) {
    try {
      const createdUser = await User.create({
        username: body.username,
        email: body.email,
      });

      return createdUser;
    } catch (error) {
      throw new Error("No se pudo crear el usuario");
    }
  }
}

export default new UserService();