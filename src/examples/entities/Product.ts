import { Entity } from "../../domain/Entity";
import { Money } from "../value-objects/Money";

interface ProductProps {
  name: string;
  price: Money;
}

export class Product extends Entity<ProductProps> {
  static create(id: string, props: ProductProps): Product {
    return new Product(id, props);
  }

  constructor(id: string, props: ProductProps) {
    super(id, props);
  }

  get name(): string {
    return this.props.name;
  }

  get price(): Money {
    return this.props.price;
  }

  changePrice(newPrice: Money): void {
    this.props.price = newPrice;
  }
}
