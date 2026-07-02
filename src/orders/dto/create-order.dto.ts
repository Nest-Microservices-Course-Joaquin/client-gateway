import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';
import { OrderStatus } from '../enum/order.enum';

export class CreateOrderDto {
  @IsNumber()
  @IsPositive()
  totalAmount: number;

  @IsNumber()
  @IsPositive()
  @Min(1)
  totalItems: number;

  @IsEnum(OrderStatus, { message: 'Invalid order status' })
  @IsOptional()
  status?: OrderStatus = OrderStatus.PENDING;

  @IsBoolean()
  @IsOptional()
  paid?: boolean = false;
}
