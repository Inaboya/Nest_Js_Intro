/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Products } from './products.model';
import { v4 as uuidv4 } from 'uuid';
import { uuid } from 'uuidv4';

@Injectable()
export class ProductService {
  private products: Products[] = [];

  insertProduct(name: string, price: number, description: string) {
    const productId = uuid();
    const newProduct = new Products(productId, name, price, description);
    this.products.push(newProduct);
    return productId;
  }

  getProducts() {
    return [...this.products];
  }
    
    private findProduct(productId: string) {
        const product = this.products.find((el) => el.id === productId);

        if (!product) {
          throw new NotFoundException('Product not found');
        }

        return product;
    }

    getProduct(productId: string) {
        const product = this.findProduct(productId);

        return { ...product };
      
    }
    
    updateProduct(productId: string, name: string, price: number, description: string) {
        const product = this.findProduct(productId);

        const updatedProduct = {
            ...product,
            name: name,
            price: price,
            description: description,
        }

        this.products = this.products.map((el) => (el.id === productId ? updatedProduct : el));
    }

    deleteProduct(productId: string) {
        const product = this.findProduct(productId);

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        this.products = this.products.filter((el) => el.id !== productId);
    }
}
