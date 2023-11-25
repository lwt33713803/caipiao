import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
// import { XCommonRet } from 'xmcommon';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// const paramData = new XCommonRet();

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next
      .handle()
      .pipe(map((data) => ({ data, code: 200, message: 'Success' })));
  }
}
