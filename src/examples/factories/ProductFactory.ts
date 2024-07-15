import { Product } from "../entities/Product";
import { Money } from "../value-objects/Money";

export class ProductFactory {
  static create(name: string, amount: number, currency: string): Product {
    if (!name || typeof name !== "string" || name.trim() === "") {
      throw new Error("Product name cannot be empty");
    }
    if (amount < 0) {
      throw new Error("Price cannot be negative");
    }
    const price = Money.create(amount, currency);
    return Product.create("1", { name, price });
  }
}
