import { CreateUserDto } from "../dtos/user.dto";
import User from "../models/user.model";

class UserService {

  async createUser(body: CreateUserDto) {
    try {
      //findOrCreate
      const createdUser = await User.create({
        // username: body.username,
        email: body.email,
      });
// retorna un array
      return createdUser;
    } catch (error) {
      throw new Error("No se pudo crear el usuario");
    }
  }

}

export default new UserService();