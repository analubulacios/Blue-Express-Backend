import { generateRandomString } from "../../utils.ts/urlGenerator";
import { CreateUrlsDto, GetShortenUrlDto } from "../dtos/urls.dto";
import Url from "../models/url.model";

class UrlService {
  async createShortUrl(
    body: CreateUrlsDto,
    user_id?: string,
  ) {
    try {

     // This measures the time taken for URL shortening
     // const startTime = new Date().getTime(); // Captures the start time

     // Your code for URL shortening goes here

     // const endTime = new Date().getTime(); // Captures the end time
     // const elapsedTimeInSeconds = (endTime - startTime) / 1000; // Calculates the elapsed time in seconds

     // console.log(`The short URL was generated in ${elapsedTimeInSeconds} seconds.`);


      const shortUrl = await generateRandomString(process.env.DOMAIN);

      const createdUrl = await Url.create({
        original_url: body.original_url,
        short_url: shortUrl,
        clicks: 0,
        user_id: user_id,
      });

      return createdUrl;
    } catch (error) {
      throw new Error("Could not create URL");
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

      if (!url) {
        throw new Error("URL not found in the database.");
    }

    if (url) {
      await url.increment('clicks', { by: 1 });
  }
      return url?.dataValues.original_url;
    } catch (error) {
      throw new Error("Could not get URL:" + error);
    }
  }

  async getAllUrls(user_id: string) {
    try {
      const urls = await Url.findAll({
        where: {
          user_id,
        },
      });

      if (urls.length === 0) {
        throw new Error("No URLs were found for the given user.");
    }

      return urls;
    } catch (error) {
      throw new Error("There are no short or long urls" + error);
    }
  }

  async deleteUrlById(id: any) {
    try {
      const url = await Url.findByPk(id);

      if (!url) {
        throw new Error("URL not found");
      }

      await url.destroy();
    } catch (error) {
      throw new Error("Error deleting URL");
    }
  }
}

export default new UrlService();