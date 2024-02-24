import { CreateUserDto } from "../dtos/user.dto";
import User from "../models/user.model";

class UserService {

async createUser(body: CreateUserDto) {
    try {
      const [user, created] = await User.findOrCreate({
        where: { email: body.email },
      });
      
      return [user, created];
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();