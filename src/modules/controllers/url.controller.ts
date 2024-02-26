import { decodeUserId } from "../../middlewares/auth";
import urlService from "../services/url.service";

class UrlController {
  async shortenUrl(req: any, res: any) {
    try {
      const user = decodeUserId(req)
      const userId = user.userId

      if (!req.body || !req.body.original_url) {
        return res
          .status(400)
          .json({ error: "Cuerpo de la solicitud no válido" });
      }

      const url = await urlService.createShortUrl(req.body, userId);
      
      res.status(201).json(url);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Error al acortar la URL" });
    }
  }

  async redirectToOriginalUrl(req: any, res: any) {
    try {
      const url = await urlService.findUrlByShortUrl(req.params);
      
      if (!url) {
        return res.status(404).json({ error: "URL corta no encontrada" });
      }

      return res.send(url);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Error al obtener la URL original: " + error });
    }
  }


  async getAllUrlsController(req: any, res: any) {
    try {
      const { userId } = req
      const urls = await urlService.getAllUrls(userId);
      res.status(200).json(urls);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener las URLs" });
    }
  }


  async deleteUrl(req: any, res: any) {
    try {
      const { id } = req.params;

      await urlService.deleteUrlById(id);

      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al eliminar la URL" });
    }
  }
}

export default new UrlController();