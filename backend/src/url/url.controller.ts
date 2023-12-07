import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  HttpStatus,
  Res,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Response } from 'express';
import { UrlService } from './url.service';
import { ShortenUrlDto } from './dto/url.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('shorten')
  @UseGuards(AuthGuard())
  @UsePipes(new ValidationPipe({ transform: true }))
  async shortenUrl(
    @Body() shortenUrlDto: ShortenUrlDto,
    @Res() res: Response,
    @Req() req,
  ) {
    try {
      const userId = req.user.id;
      const shortId = await this.urlService.generateShortUrl(
        shortenUrlDto.originalUrl,
        userId,
      );
      return res.status(HttpStatus.CREATED).json({ shortId });
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Shortening URL failed' });
    }
  }

  @Get(':shortId')
  async redirectToOriginalUrl(
    @Param('shortId') shortId: string,
    @Res() res: Response,
  ) {
    try {
      const originalUrl = await this.urlService.getOriginalUrl(shortId);

      if (originalUrl) {
        return res.redirect(HttpStatus.FOUND, originalUrl);
      } else {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'URL not found' });
      }
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error redirecting' });
    }
  }
}
