import { generateRandomString } from "../../utils.ts/urlGenerator";
import { CreateUrlsDto } from "../dtos/urls.dto";
import Url from "../models/url.model";

class UrlService {
    async createShortUrl(body: CreateUrlsDto) {
      try {
        const shortUrl = `https://bu.ex/${generateRandomString()}`;

        const createdUrl = await Url.create({
          original_url: body.original_url,
          short_url: shortUrl,
        });
  
        return createdUrl;
      } catch (error) {
        throw new Error("No se pudo crear la URL");
      }
    }
  
    // async findUrlByShortUrl(dto: GetShortenUrlDto) {
    //   try {
    //     const urls = await Url.findAll();
  
    //     return urls;
    //   } catch (error) {
    //     throw new Error("No se pudo obtener las URLS");
    //   }
    // }
  
    async deleteUrlById(id: any) {
      return await Url.destroy({
        where: { id },
      });
    }
  }
  
  export default new UrlService();