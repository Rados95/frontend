export class Product {
  code: string;
  name: string;
  productType: string;
  price: number;
  seller?: string;
  sold?: boolean;

  constructor(code: string, name: string, productType: string, price: number, seller?: string, sold?: boolean) {
    this.code = code;
    this.name = name;
    this.productType = productType;
    this.price = price;
    this.seller = seller;
    this.sold = sold;
  }
}
