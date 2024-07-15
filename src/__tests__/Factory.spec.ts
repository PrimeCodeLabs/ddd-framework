import { ProductFactory } from "../examples/factories/ProductFactory";
import { Product } from "../examples/entities/Product";
import { Money } from "../examples/value-objects/Money";

describe("ProductFactory", () => {
  it("should create a product with the given name and price", () => {
    const product: Product = ProductFactory.create("Product A", 100, "USD");

    expect(product).toBeInstanceOf(Product);
    expect(product.name).toBe("Product A");
    expect(Number(product.price.amount)).toBe(100);
    expect(product.price.currency).toBe("USD");
  });

  it("should throw an error when name is empty", () => {
    expect(() => {
      ProductFactory.create("", 100, "USD");
    }).toThrow("Product name cannot be empty");
  });

  it("should throw an error when price is negative", () => {
    expect(() => {
      ProductFactory.create("Product A", -100, "USD");
    }).toThrow("Price cannot be negative");
  });

  it("should throw an error when currency is not provided", () => {
    expect(() => {
      ProductFactory.create("Product A", 100, "");
    }).toThrow("Invalid currency");
  });

  it("should create multiple products with different properties", () => {
    const product1: Product = ProductFactory.create("Product A", 100, "USD");
    const product2: Product = ProductFactory.create("Product B", 200, "EUR");

    expect(product1).toBeInstanceOf(Product);
    expect(product1.name).toBe("Product A");
    expect(Number(product1.price.amount)).toBe(100);
    expect(product1.price.currency).toBe("USD");

    expect(product2).toBeInstanceOf(Product);
    expect(product2.name).toBe("Product B");
    expect(Number(product2.price.amount)).toBe(200);
    expect(product2.price.currency).toBe("EUR");
  });

  it("should create a product and allow changing its price", () => {
    const product: Product = ProductFactory.create("Product A", 100, "USD");
    const newPrice = Money.create(150, "USD");
    product.changePrice(newPrice);

    expect(Number(product.price.amount)).toBe(150);
    expect(product.price.currency).toBe("USD");
  });
});
