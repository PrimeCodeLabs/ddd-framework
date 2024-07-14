import { ValueObject } from "../../domain/ValueObject";
import Decimal from "decimal.js";

interface MoneyProps {
  amount: Decimal;
  currency: string;
}

export class Money extends ValueObject<MoneyProps> {
  constructor(amount: number | string | Decimal, currency: string) {
    if (amount === null || amount === undefined || isNaN(Number(amount))) {
      throw new Error("Invalid amount");
    }
    if (!currency || typeof currency !== "string" || currency.trim() === "") {
      throw new Error("Invalid currency");
    }
    super({ amount: new Decimal(amount), currency });
  }

  get amount(): Decimal {
    return this.props.amount;
  }

  get currency(): string {
    return this.props.currency;
  }

  private ensureSameCurrency(other: Money): void {
    if (this.currency !== other.currency) {
      throw new Error("Currencies do not match");
    }
  }

  public add(other: Money): Money {
    this.ensureSameCurrency(other);
    return new Money(this.amount.plus(other.amount), this.currency);
  }

  public subtract(other: Money): Money {
    this.ensureSameCurrency(other);
    return new Money(this.amount.minus(other.amount), this.currency);
  }

  public multiply(factor: number | string | Decimal): Money {
    if (factor === null || factor === undefined || isNaN(Number(factor))) {
      throw new Error("Invalid multiplication factor");
    }
    return new Money(this.amount.mul(new Decimal(factor)), this.currency);
  }

  public divide(divisor: number | string | Decimal): Money {
    if (divisor === null || divisor === undefined || isNaN(Number(divisor))) {
      throw new Error("Invalid division divisor");
    }
    if (new Decimal(divisor).equals(0)) {
      throw new Error("Division by zero");
    }
    return new Money(this.amount.div(new Decimal(divisor)), this.currency);
  }

  public equals(other: Money): boolean {
    return this.currency === other.currency && this.amount.equals(other.amount);
  }

  public isGreaterThan(other: Money): boolean {
    this.ensureSameCurrency(other);
    return this.amount.greaterThan(other.amount);
  }

  public isLessThan(other: Money): boolean {
    this.ensureSameCurrency(other);
    return this.amount.lessThan(other.amount);
  }

  public toString(): string {
    return `${this.amount.toFixed(2)} ${this.currency}`;
  }
}
