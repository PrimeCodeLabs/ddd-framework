import { AggregateRoot } from "../../domain/AggregateRoot";
import { Money } from "../value-objects/Money";
import { OrderItem } from "../entities/OrderItem";
import { OrderPaidEvent } from "../events/OrderPaidEvent";

interface OrderProps {
  totalAmount: Money;
  status: "created" | "paid";
  items: OrderItem[];
}

export class Order extends AggregateRoot<OrderProps> {
  constructor(id: string, props: OrderProps) {
    super(id, props);
  }

  get totalAmount(): Money {
    return this.props.totalAmount;
  }

  get status(): string {
    return this.props.status;
  }

  get items(): OrderItem[] {
    return this.props.items;
  }

  addItem(item: OrderItem): void {
    this.props.items.push(item);
    this.recalculateTotalAmount();
  }

  markAsPaid(): void {
    if (this.props.status !== "created") {
      throw new Error("Order cannot be marked as paid");
    }
    this.props.status = "paid";
    const event = new OrderPaidEvent(this.id);
    this.addDomainEvent(event);
  }

  private recalculateTotalAmount(): void {
    const total = this.props.items.reduce((sum, item) => {
      return sum.add(item.price.multiply(item.quantity));
    }, new Money(0, this.props.totalAmount.currency));
    this.props.totalAmount = total;
  }
}
