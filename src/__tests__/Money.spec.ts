import { Money } from "../examples/value-objects/Money";
import Decimal from "decimal.js";

describe("Money Value Object", () => {
  it("should create a valid money object", () => {
    const money = new Money(100, "USD");
    expect(money.amount.equals(new Decimal(100))).toBe(true);
    expect(money.currency).toBe("USD");
  });

  it("should throw an error for invalid amount", () => {
    expect(() => new Money(NaN, "USD")).toThrow("Invalid amount");
    expect(() => new Money(null as any, "USD")).toThrow("Invalid amount");
    expect(() => new Money(undefined as any, "USD")).toThrow("Invalid amount");
  });

  it("should throw an error for invalid currency", () => {
    expect(() => new Money(100, "")).toThrow("Invalid currency");
    expect(() => new Money(100, null as any)).toThrow("Invalid currency");
    expect(() => new Money(100, undefined as any)).toThrow("Invalid currency");
  });

  it("should add two Money objects correctly", () => {
    const money1 = new Money(100, "USD");
    const money2 = new Money(200, "USD");
    const result = money1.add(money2);
    expect(result.amount.equals(new Decimal(300))).toBe(true);
    expect(result.currency).toBe("USD");
  });

  it("should throw an error when adding Money objects with different currencies", () => {
    const money1 = new Money(100, "USD");
    const money2 = new Money(200, "EUR");
    expect(() => money1.add(money2)).toThrow("Currencies do not match");
  });

  it("should subtract two Money objects correctly", () => {
    const money1 = new Money(200, "USD");
    const money2 = new Money(100, "USD");
    const result = money1.subtract(money2);
    expect(result.amount.equals(new Decimal(100))).toBe(true);
    expect(result.currency).toBe("USD");
  });

  it("should throw an error when subtracting Money objects with different currencies", () => {
    const money1 = new Money(200, "USD");
    const money2 = new Money(100, "EUR");
    expect(() => money1.subtract(money2)).toThrow("Currencies do not match");
  });

  it("should multiply Money correctly", () => {
    const money = new Money(100, "USD");
    const result = money.multiply(2);
    expect(result.amount.equals(new Decimal(200))).toBe(true);
    expect(result.currency).toBe("USD");
  });

  it("should throw an error for invalid multiplication factor", () => {
    const money = new Money(100, "USD");
    expect(() => money.multiply(NaN)).toThrow();
  });

  it("should divide Money correctly", () => {
    const money = new Money(100, "USD");
    const result = money.divide(2);
    expect(result.amount.equals(new Decimal(50))).toBe(true);
    expect(result.currency).toBe("USD");
  });

  it("should throw an error for division by zero", () => {
    const money = new Money(100, "USD");
    expect(() => money.divide(0)).toThrow("Division by zero");
  });

  it("should throw an error for invalid division divisor", () => {
    const money = new Money(100, "USD");
    expect(() => money.divide(NaN)).toThrow();
  });

  it("should compare Money objects correctly", () => {
    const money1 = new Money(100, "USD");
    const money2 = new Money(200, "USD");
    expect(money1.isLessThan(money2)).toBe(true);
    expect(money2.isGreaterThan(money1)).toBe(true);
    expect(money1.equals(new Money(100, "USD"))).toBe(true);
  });

  it("should throw an error when comparing Money objects with different currencies", () => {
    const money1 = new Money(100, "USD");
    const money2 = new Money(200, "EUR");
    expect(() => money1.isGreaterThan(money2)).toThrow(
      "Currencies do not match"
    );
    expect(() => money1.isLessThan(money2)).toThrow("Currencies do not match");
  });

  it("should return correct string representation", () => {
    const money = new Money(100.567, "USD");
    expect(money.toString()).toBe("100.57 USD");
  });
});
