import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { NATS_SERVICE } from 'src/config/services';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly natsClient: ClientProxy) {}

  @Post('register')
  registerUser() {
    return this.natsClient.send('auth_register_user', {}).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Post('login')
  loginUser() {
    return this.natsClient.send('auth_login_user', {}).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get('verify-token')
  verifyToken() {
    return this.natsClient.send('auth_verify_token', {}).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
