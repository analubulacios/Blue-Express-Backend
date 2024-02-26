import { generateRandomString } from "../../utils.ts/urlGenerator";
import { CreateUrlsDto, GetShortenUrlDto } from "../dtos/urls.dto";
import Url from "../models/url.model";

class UrlService {
  async createShortUrl(
    body: CreateUrlsDto,
    user_id?: string
  ) {
    try {
      const shortUrl = await generateRandomString();

      const createdUrl = await Url.create({
        original_url: body.original_url,
        short_url: shortUrl,
        clicks: 0,
        user_id: user_id,
      });

      return createdUrl;
    } catch (error) {
      console.error(error)
      throw new Error("No se pudo crear la URL");
    }
  }

  async findUrlByShortUrl(dto: GetShortenUrlDto) {
    try {
      const { short_url } = dto;
      let url = await Url.findOne({
          where: {
              short_url: short_url,
          },
      });

    if (url) {
      await url.increment('clicks', { by: 1 });
  }
      return url?.dataValues.original_url;
    } catch (error) {
      console.error(error);
      throw new Error("No se pudo obtener la URL: " + error);
    }
  }

  async getAllUrls(user_id: string) {
    try {
      const urls = await Url.findAll({
        where: {
          user_id,
          // deletion_date: null
        },
      });
      return urls;
    } catch (error) {
      console.error(error);
      throw new Error("No hay urls ni cortas ni largas " + error);
    }
  }

  async deleteUrlById(id: any) {
    try {
      const url = await Url.findByPk(id);

      if (!url) {
        throw new Error("URL no encontrada");
      }

      await url.destroy();
    } catch (error) {
      console.error(error);
      throw new Error("Error al eliminar la URL");
    }
  }
}

export default new UrlService();