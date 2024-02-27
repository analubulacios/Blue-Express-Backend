import User from "../models/user.model";
import { generateToken } from "../../utils.ts/generateToken";
import Url from "../models/url.model";

import { Op } from "sequelize";

class UserController {
  async login(req: any, res: any) {
    try {
      const {email, localURLs} = req.body
      const [user, created] = await User.findOrCreate({ where: { email } });
      const userId = user.getDataValue('user_id')

      const localIds = localURLs?.map((u: any) => u.url_id) ?? [];  
      await Url.update({"user_id": userId}, {
        where: {
          "user_id": null,
          "url_id": {
            [Op.in]: localIds
          },
        }
      })  

      const token = generateToken(userId);
      return res.status(created ? 201 : 200).json({userId, token});
    } catch (error) {
      return res.status(500).json({ error: "We could not create the user" });
    }
  }
}

export default new UserController();