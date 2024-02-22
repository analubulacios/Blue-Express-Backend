import urlService from "../services/url.service";


class UrlController {
  async shortenUrl(req: any, res: any) {
    try {
      console.log("req body -----------", req.body);
      if (!req.body || !req.body.original_url) {
        return res
          .status(400)
          .json({ error: "Cuerpo de la solicitud no válido" });
      }

      const url = await urlService.createShortUrl(req.body);
      console.log("req url -----------", url);
      res.status(201).json(url);
    } catch (error) {
      console.error("Error al crear la URL en la base de datos:", error);
      res.status(500).json({ error: "Error al acortar la URL" });
    }
  }

  async redirectToOriginalUrl(req: any, res: any) {
    try {
      console.log("Solicitud de URL corta recibida:", req.params.short_url);
      const url = await urlService.findUrlByShortUrl(req.params);
      console.log("Veamos que me trae de mi base de datos", url);
      if (!url) {
        return res.status(404).json({ error: "URL corta no encontrada" });
      }
      return res.redirect(url.original_url);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Error al obtener la URL original: " + error });
    }
  }

  async deleteUrl(req: any, res: any) {
    try {
      const { id } = req.params;

      const deletedUrl = await urlService.deleteUrlById(id);

      if (!deletedUrl) {
        return res.status(404).json({ error: "URL no encontrada" });
      }

      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al eliminar la URL" });
    }
  }
}

export default new UrlController();