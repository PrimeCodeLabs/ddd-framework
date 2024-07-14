import { Entity } from "../../domain/Entity";
import { Address } from "../value-objects/Address";

interface UserProps {
  name: string;
  email: string;
  address: Address;
}

export class User extends Entity<UserProps> {
  constructor(id: string, props: UserProps) {
    super(id, props);
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get address(): Address {
    return this.props.address;
  }

  changeAddress(newAddress: Address): void {
    this.props.address = newAddress;
  }
}
