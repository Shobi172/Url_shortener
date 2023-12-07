import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Url } from './schemas/url.schema';
import * as shortid from 'shortid';

@Injectable()
export class UrlService {
  constructor(@InjectModel('Url') private readonly urlModel: Model<Url>) {}

  async generateShortUrl(originalUrl: string, userId: string): Promise<string> {
    const shortId = shortid.generate();
    const url = new this.urlModel({ shortId, originalUrl, user: userId });
    await url.save();
    return shortId;
  }

  async getOriginalUrl(shortId: string): Promise<string | null> {
    const url = await this.urlModel.findOne({ shortId }).exec();
    return url ? url.originalUrl : null;
  }
}
