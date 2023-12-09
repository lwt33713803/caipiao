import { Body, Controller, Headers, Get, Post, Query } from '@nestjs/common';
import { OssService } from './oss.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('oss模块')
@Controller('oss')
export class OssController {
  constructor(private oss: OssService) {}

  @Get('signature')
  getOssSignature() {
    return this.oss.getSignature();
  }
  @Get('download')
  async downloadPrivateFile(@Query('key') key: string) {
    const signedUrl = await this.oss.generateSignedUrl(key);
    console.log(signedUrl);

    return { url: signedUrl }; // 重定向到签名URL
  }
  @Post('result')
  getResult(
    @Headers('x-oss-pub-key-url') xOssPubKeyUrl: string,
    @Body() file: any,
  ) {
    return this.oss.getResult(xOssPubKeyUrl, file);
  }
}
