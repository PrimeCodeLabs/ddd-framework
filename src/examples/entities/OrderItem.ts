import { Entity } from "../../domain/Entity";
import { Money } from "../value-objects/Money";

interface OrderItemProps {
  productId: string;
  quantity: number;
  price: Money;
}

export class OrderItem extends Entity<OrderItemProps> {
  constructor(id: string, props: OrderItemProps) {
    super(id, props);
  }

  get productId(): string {
    return this.props.productId;
  }

  get quantity(): number {
    return this.props.quantity;
  }

  get price(): Money {
    return this.props.price;
  }
}
