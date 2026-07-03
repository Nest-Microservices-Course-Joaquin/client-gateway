import { IsEnum, IsNotEmpty } from 'class-validator';
import { OrderStatus } from '../enum/order.enum';

export class ChangeOrderStatusDto {
  @IsEnum(OrderStatus)
  @IsNotEmpty()
  status: OrderStatus;
}
