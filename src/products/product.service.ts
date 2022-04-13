/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Products } from './products.model';
import { v4 as uuidv4 } from 'uuid';
import { uuid } from 'uuidv4';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  private products: Products[] = [];

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Products>,
  ) {}

  async insertProduct(name: string, price: number, description: string) {
    const newProduct = new this.productModel({ name, price, description });
    const result = await newProduct.save();
    return result.id as string;
  }

  async getProducts() {
    const result = await this.productModel.find().exec();
    if (!result) {
      throw new NotFoundException('Product not found');
    }
    return result;
  }

  async getProduct(productId: string) {
    const product = await this.findProduct(productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return { id: product.id, name: product.name, price: product.price };
  }

  async updateProduct(
    productId: string,
    name: string,
    price: number,
    description: string,
  ) {
    const product = await this.findProduct(productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (name) product.name = name;

    if (price) product.price = price;

    if (description) product.description = description;

    await product.save();
  }

  async deleteProduct(productId: string) {
    const product = await this.findProduct(productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await product.remove();

    return {
      message: 'Product deleted',
    };
  }

  private async findProduct(id: string): Promise<Products> {
    try {
      const product = await this.productModel.findById(id);

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      return product;
    } catch (error) {
      console.log(error.message);
    }
  }
}
