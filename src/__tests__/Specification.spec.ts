import { Product } from "../examples/entities/Product";
import { Money } from "../examples/value-objects/Money";
import { PriceSpecification } from "../examples/specifications/PriceSpecification";
import {
  AndSpecification,
  OrSpecification,
  NotSpecification,
} from "../domain/Specification";

describe("Specifications", () => {
  let cheapProduct: Product;
  let expensiveProduct: Product;
  let midRangeProduct: Product;

  beforeAll(() => {
    cheapProduct = Product.create("1", {
      name: "Cheap Product",
      price: Money.create(50, "USD"),
    });
    expensiveProduct = Product.create("2", {
      name: "Expensive Product",
      price: Money.create(500, "USD"),
    });
    midRangeProduct = Product.create("3", {
      name: "Mid Range Product",
      price: Money.create(150, "USD"),
    });
  });

  describe("PriceSpecification", () => {
    it("should be satisfied when product price is within range", () => {
      const spec = new PriceSpecification(100, 200);
      expect(spec.isSatisfiedBy(midRangeProduct)).toBe(true);
    });

    it("should not be satisfied when product price is out of range", () => {
      const spec = new PriceSpecification(100, 200);
      expect(spec.isSatisfiedBy(cheapProduct)).toBe(false);
      expect(spec.isSatisfiedBy(expensiveProduct)).toBe(false);
    });
  });

  describe("AndSpecification", () => {
    it("should be satisfied when both specifications are satisfied", () => {
      const spec1 = new PriceSpecification(100, 200);
      const spec2 = new PriceSpecification(0, 200);
      const andSpec = new AndSpecification(spec1, spec2);

      expect(andSpec.isSatisfiedBy(midRangeProduct)).toBe(true);
    });

    it("should not be satisfied when one of the specifications is not satisfied", () => {
      const spec1 = new PriceSpecification(100, 200);
      const spec2 = new PriceSpecification(0, 100);
      const andSpec = new AndSpecification(spec1, spec2);

      expect(andSpec.isSatisfiedBy(midRangeProduct)).toBe(false);
    });
  });

  describe("OrSpecification", () => {
    it("should be satisfied when at least one of the specifications is satisfied", () => {
      const spec1 = new PriceSpecification(100, 200);
      const spec2 = new PriceSpecification(0, 100);
      const orSpec = new OrSpecification(spec1, spec2);

      expect(orSpec.isSatisfiedBy(midRangeProduct)).toBe(true);
      expect(orSpec.isSatisfiedBy(cheapProduct)).toBe(true);
    });

    it("should not be satisfied when none of the specifications are satisfied", () => {
      const spec1 = new PriceSpecification(100, 200);
      const spec2 = new PriceSpecification(200, 300);
      const orSpec = new OrSpecification(spec1, spec2);

      expect(orSpec.isSatisfiedBy(expensiveProduct)).toBe(false);
    });
  });

  describe("NotSpecification", () => {
    it("should be satisfied when the specification is not satisfied", () => {
      const spec = new PriceSpecification(100, 200);
      const notSpec = new NotSpecification(spec);

      expect(notSpec.isSatisfiedBy(cheapProduct)).toBe(true);
      expect(notSpec.isSatisfiedBy(expensiveProduct)).toBe(true);
    });

    it("should not be satisfied when the specification is satisfied", () => {
      const spec = new PriceSpecification(100, 200);
      const notSpec = new NotSpecification(spec);

      expect(notSpec.isSatisfiedBy(midRangeProduct)).toBe(false);
    });
  });
});
