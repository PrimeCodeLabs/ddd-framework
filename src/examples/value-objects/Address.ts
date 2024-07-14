import { ValueObject } from "../../domain/ValueObject";

interface AddressProps {
  street: string;
  city: string;
  state: string;
  postalCode: string;
}

export class Address extends ValueObject<AddressProps> {
  constructor(street: string, city: string, state: string, postalCode: string) {
    super({ street, city, state, postalCode });
  }

  get street(): string {
    return this.props.street;
  }

  get city(): string {
    return this.props.city;
  }

  get state(): string {
    return this.props.state;
  }

  get postalCode(): string {
    return this.props.postalCode;
  }
}
