﻿import {Injectable} from '@angular/core';
import {Product} from './Product';
import {StaticDataSource} from './StaticDataSource';

@Injectable()
export class ProductRepository {
  private products: Product[] = [];
  private categories: string[] = [];

  constructor(dataSource: StaticDataSource) {
    dataSource.getProducts().subscribe(data => {
      this.products = data;
      this.categories = data.map(p => p.category)
        .filter((c, index, array) => array.indexOf(c) === index).sort();
    });
  }

  getProducts(category: string = null): Product[] {
    if (category == null) {
      return this.products;
    }
    return this.products
      .filter(p => category === p.category);
  }

  getProductCount(): number {
    return this.products.length;
  }

  getProduct(id: number): Product {
    return this.products.find(p => p.id === id);
  }

  getCategories(): string[] {
    return this.categories;
  }
}
