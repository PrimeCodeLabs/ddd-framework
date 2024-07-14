import { DomainEvent } from "../../domain/DomainEvent";
import { EventBus } from "../../domain/EventBus";
import { EventHandler } from "../../domain/EventDispatcher";
import { OrderPaidEvent } from "./OrderPaidEvent";

export class OrderEventBus implements EventBus<OrderPaidEvent> {
  private handlers: Map<string, EventHandler<OrderPaidEvent>[]> = new Map();

  subscribe(eventName: string, handler: EventHandler<OrderPaidEvent>): void {
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, []);
    }
    this.handlers.get(eventName)!.push(handler);
  }

  publish(event: OrderPaidEvent): void {
    const eventName = event.constructor.name;
    const handlers = this.handlers.get(eventName);
    if (handlers) {
      handlers.forEach((handler) => handler.handle(event));
    }
  }
}
