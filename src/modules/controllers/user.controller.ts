import User from "../models/user.model";
import { generateToken } from "../../utils.ts/generateToken";

class UserController {
  async createUser(req: any, res: any) {
    try {
      const [user, created] = await User.findOrCreate({ where: { email: req.body.email } });
      
      const token = generateToken(user.getDataValue("userId"));
      
      return res.status(created ? 201 : 200).json({
        user,
        token: token
      });
    } catch (error) {
      return res.status(500).json({ error: "No pudimos crear el usuario" });
    }
  }
}

export default new UserController();