import urlService from "../services/url.service";


class UrlController {
  async shortenUrl(req: any, res: any) {
    try {
      if (!req.body || !req.body.original_url) {
        return res
          .status(400)
          .json({ error: "Cuerpo de la solicitud no válido" });
      }

      const url = await urlService.createShortUrl(req.body);

      res.status(201).json(url);
    } catch (error) {
      res.status(500).json({ error: "Error al acortar la URL" });
    }
  }

  // async redirectToOriginalUrl(req: any, res: any) {
  //   try {
  //     console.log("Veamos que es lo que llega, req.params");
  //     const url = await urlsService.findUrlByShortUrl(req.params);

  //     if (!url) {
  //       return res.status(404).json({ error: "URL corta no encontrada" });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: "Error al obtener la URL original" });
  //   }
  // }

  async deleteUrl(req: any, res: any) {
    try {
      const { id } = req.params;

      // Aquí podrías verificar si el usuario tiene permisos para eliminar la URL

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