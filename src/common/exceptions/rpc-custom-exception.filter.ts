import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

interface RpcCustomError {
  status: number;
  message: string;
}

function isValidHttpStatus(status: unknown): status is number {
  return (
    typeof status === 'number' &&
    Number.isInteger(status) &&
    status >= 100 &&
    status < 600
  );
}

function isRpcCustomError(error: unknown): error is RpcCustomError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    'message' in error &&
    isValidHttpStatus((error as RpcCustomError).status)
  );
}

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const rpcError = exception.getError();

    if (rpcError.toString().includes('Empty response')) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: rpcError
          .toString()
          .substring(0, rpcError.toString().indexOf('(') - 1),
      });
    }

    if (isRpcCustomError(rpcError)) {
      return response.status(rpcError.status).json({
        status: rpcError.status,
        message: rpcError.message,
      });
    }

    if (typeof rpcError === 'string') {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: rpcError,
      });
    }

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    });
  }
}
