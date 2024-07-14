import { Product } from "../examples/entities/Product";
import { Money } from "../examples/value-objects/Money";
import exp from "constants";

describe("Product Entity", () => {
  it("should create a product entity", () => {
    const price = new Money(100, "USD");
    const product1 = new Product("1", { name: "Product A", price });
    const product2 = new Product("1", { name: "Product A", price });

    expect(product1.id).toBe("1");
    expect(product1.name).toBe("Product A");
    expect(Number(product1.price.amount)).toBe(100);
    expect(product1.price.currency).toBe("USD");
    expect(product1.equals(product2)).toBe(true);
    expect(product1.equals(null as unknown as Product)).toBe(false);
  });

  it("should change product price", () => {
    const price = new Money(100, "USD");
    const product = new Product("1", { name: "Product A", price });

    const newPrice = new Money(150, "USD");
    product.changePrice(newPrice);

    expect(Number(product.price.amount)).toBe(150);
    expect(product.price.currency).toBe("USD");
  });
});
