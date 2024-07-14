import { ValueObject } from "../../domain/ValueObject";

interface EmailProps {
  value: string;
}

export class Email extends ValueObject<EmailProps> {
  constructor(value: string) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      throw new Error("Invalid email format");
    }
    super({ value });
  }

  get value(): string {
    return this.props.value;
  }
}
