import { Specification } from "../../domain/Specification";
import { Product } from "../entities/Product";

export class PriceSpecification implements Specification<Product> {
  constructor(
    private readonly minPrice: number,
    private readonly maxPrice: number
  ) {}

  isSatisfiedBy(product: Product): boolean {
    return (
      product.price.amount.greaterThanOrEqualTo(this.minPrice) &&
      product.price.amount.lessThanOrEqualTo(this.maxPrice)
    );
  }
}
