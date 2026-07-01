import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() {}

  @Post()
  createProduct() {
    return 'Product created';
  }

  @Get()
  findAllProducts() {
    return 'Products';
  }

  @Get(':id')
  findOneProduct(@Param('id') id: string) {
    return `Product ${id}`;
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
