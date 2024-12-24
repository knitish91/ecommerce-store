import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((resultData) => {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;

        // The controller should set a meaningful message and data
        const message = resultData.message || 'Request processed successfully';
        const data = resultData.data !== undefined ? resultData.data : resultData;

        return {
          success: true,
          statusCode: statusCode,
          message: message,
          data: data, // The actual result from the controller
        };
      }),
    );
  }
}