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
  addProduct(
    @Body('name') productName: string,
    @Body('price') productPrice: number,
    @Body('description') productDescription: string,
  ) {
    const generatedProductId = this.productService.insertProduct(
      productName,
      productPrice,
      productDescription,
    );

    return { id: generatedProductId };
  }

  @Get()
  getAllProducts() {
    return this.productService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') productId: string) {
    return this.productService.getProduct(productId);
  }
  @Patch(':id')
  updateProduct(
    @Param('id') productId: string,
    @Body('name') productName: string,
    @Body('price') productPrice: number,
    @Body('description') productDescription: string,
  ) {
    this.productService.updateProduct(
      productId,
      productName,
      productPrice,
      productDescription,
    );
    return null;
  }

  @Delete(':id')
  deleteProduct(@Param('id') productId: string) {
    this.productService.deleteProduct(productId);
  }
}
