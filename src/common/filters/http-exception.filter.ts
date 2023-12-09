import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  // Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiException } from './api.exception';
// import { Logger } from 'winston';
// import { getReqMainInfo } from '../../../utils/utils';
// import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  // 注入日志服务相关依赖
  // @Inject(WINSTON_MODULE_PROVIDER)
  // private logger: Logger;
  // // constructor(
  //   @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  // ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const msg = (exception as any)?.response?.message?.join
      ? (exception as any)?.response?.message[0]
      : exception.message;

    // 记录日志（错误消息，错误码，请求信息等）
    // .error(msg + '999', {
    //     status,
    //     req: getReqMainInfo(request),
    //     // stack: exception.stack,
    //   });
    // this.logger.info(999);
    // this.logger.error(msg + '999', {
    //   status,
    //   req: getReqMainInfo(request),
    // });
    if (exception instanceof ApiException) {
      response.status(status).json({
        code: exception.getErrorCode(),
        timestamp: new Date().toISOString(),
        path: request.url,
        describe: exception.getErrorMessage(),
      });
      return;
    }

    response.status(status).json({
      code: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      describe: msg,
    });
  }
}
