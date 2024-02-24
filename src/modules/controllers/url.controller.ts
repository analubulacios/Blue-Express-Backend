import urlService from "../services/url.service";

class UrlController {
  //comentar ip
  async shortenUrl(req: any, res: any) {
    try {
   const user_id= req.user ? req.user.id: undefined;
   const request_ip = req.ip;

      if (!req.body || !req.body.original_url) {
        return res
          .status(400)
          .json({ error: "Cuerpo de la solicitud no válido" });
      }

      const url = await urlService.createShortUrl(req.body, request_ip, user_id);
      
      res.status(201).json(url);
    } catch (error) {
     
      res.status(500).json({ error: "Error al acortar la URL" });
    }
  }

  async redirectToOriginalUrl(req: any, res: any) {
    try {
     
      const url = await urlService.findUrlByShortUrl(req.params);
      
      if (!url) {
        return res.status(404).json({ error: "URL corta no encontrada" });
      }
      return res.send(url.original_url);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Error al obtener la URL original: " + error });
    }
  }

  // MODIFICAR A  by useriD 
  // HEADER CON JWT
  async getAllUrlsController(_req: any, res: any) {
    try {
      const urls = await urlService.getAllUrls();
      res.status(200).json(urls);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener las URLs" });
    }
  }

  // HEADER CON JWT 
  // solo el dueño de la url puede eliminar
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