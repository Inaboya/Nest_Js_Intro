import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}
  @Post()
  async addProduct(
    @Body('name') productName: string,
    @Body('price') productPrice: number,
    @Body('description') productDescription: string,
  ) {
    const generatedProductId = await this.productService.insertProduct(
      productName,
      productPrice,
      productDescription,
    );

    return { id: generatedProductId };
  }

  @Get()
  async getAllProducts() {
    return await this.productService.getProducts();
  }

  @Get(':id')
  async getProduct(@Param('id') productId: string) {
    const product = await this.productService.getProduct(productId);
    return product;
  }
  @Patch(':id')
  async updateProduct(
    @Param('id') productId: string,
    @Body('name') productName: string,
    @Body('price') productPrice: number,
    @Body('description') productDescription: string,
  ) {
    await this.productService.updateProduct(
      productId,
      productName,
      productPrice,
      productDescription,
    );
  }

  @Delete(':id')
  async deleteProduct(@Param('id') productId: string) {
    await this.productService.deleteProduct(productId);
  }
}
