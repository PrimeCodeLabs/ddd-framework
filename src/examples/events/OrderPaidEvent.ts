import { DomainEvent } from "../../domain/DomainEvent";

export class OrderPaidEvent implements DomainEvent {
  occurredOn: Date;
  orderId: string;

  constructor(orderId: string) {
    this.occurredOn = new Date();
    this.orderId = orderId;
  }
}
