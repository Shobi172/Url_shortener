import * as mongoose from 'mongoose';

export const UrlSchema = new mongoose.Schema({
  shortId: String,
  originalUrl: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export interface Url extends mongoose.Document {
  shortId: string;
  originalUrl: string;
  user: mongoose.Types.ObjectId;
}
