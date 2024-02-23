import { customAlphabet } from 'nanoid'
import Url from '../modules/models/url.model';
const nanoid = customAlphabet("abcdefghkmnpqrstuvwxyzABCDEFGHKLMNPQRSTUVWXYZ23456789", 5);

export async function generateRandomString(): Promise<string> {
  const shortUrl = nanoid();

  const searchDb = await Url.findOne({
    where: {
      short_url: shortUrl,
    },
  });

  if (!searchDb) {
    return shortUrl;
  }

  return generateRandomString();
}