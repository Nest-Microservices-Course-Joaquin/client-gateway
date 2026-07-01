import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PRODUCTS_SERVICE } from 'src/config/services';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCTS_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  createProduct() {
    return 'Product created';
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send(
      { cmd: 'find_all_products' },
      paginationDto,
    );
  }

  @Get(':id')
  async findProductById(@Param('id') id: number) {
    try {
      const product = await firstValueFrom(
        this.productsClient.send({ cmd: 'find_product_by_id' }, { id }),
      );
      return product;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Patch(':id')
  patchProduct(@Param('id') id: string) {
    return `Product ${id} updated`;
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return `Product ${id} deleted`;
  }
}
