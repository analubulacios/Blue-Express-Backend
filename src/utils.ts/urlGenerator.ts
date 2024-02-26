import { customAlphabet } from 'nanoid'
import Url from '../modules/models/url.model';
const nanoid = customAlphabet("abcdefghkmnpqrstuvwxyzABCDEFGHKLMNPQRSTUVWXYZ23456789", 5);

export async function generateRandomString(domain?: string): Promise<string> {
  const shortUrl = nanoid();

  const completeShortUrl = domain ? `${domain}/${shortUrl}` : shortUrl;

  const searchDb = await Url.findOne({
    where: {
      short_url: completeShortUrl,
    },
  });

  if (!searchDb) {
    return shortUrl;
  }

  return generateRandomString();
}