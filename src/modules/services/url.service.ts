import { generateRandomString } from "../../utils.ts/urlGenerator";
import { CreateUrlsDto, GetShortenUrlDto } from "../dtos/urls.dto";
import Url from "../models/url.model";


class UrlService {
  async createShortUrl(body: CreateUrlsDto) {
    try {
      const shortUrl = `https://short.url/${generateRandomString()}`;

      const createdUrl = await Url.create({
        original_url: body.original_url,
        short_url: shortUrl,
      });

      return createdUrl;
    } catch (error) {
      throw new Error("No se pudo crear la URL");
    }
  }

  async findUrlByShortUrl(dto: GetShortenUrlDto) {
    try {
      const { short_url } = dto;
      const url = await Url.findOne({
        where: {
          short_url: short_url,
        },
      });

      return url?.dataValues;
    } catch (error) {
      console.error(error);
      throw new Error("No se pudo obtener la URL: " + error);
    }
  }

  async deleteUrlById(id: any) {
    return await Url.destroy({
      where: { id },
    });
  }
}

export default new UrlService();