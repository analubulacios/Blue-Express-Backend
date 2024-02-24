import userService from "../services/user.service";

class UserController {
  async createUser(req: any, res: any) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
      //ademas debe hacer un send.token(dentro del json)
      //la data que debo tokenizar es el userId. 
    } catch (error) {
      res.status(500).json({ error: "No pudimos crear el usuario" });
    }
  }
}

export default new UserController();