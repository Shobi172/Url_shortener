import { IsNotEmpty, IsUrl } from 'class-validator';

export class ShortenUrlDto {
  @IsNotEmpty({ message: 'Original URL must not be empty' })
  @IsUrl({}, { message: 'Invalid URL format' })
  originalUrl: string;
}
