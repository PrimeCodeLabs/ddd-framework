import { DomainEvent } from "./DomainEvent";

export interface EventHandler<T extends DomainEvent> {
  handle(event: T): void;
}

export class EventDispatcher {
  private handlers: { [eventName: string]: EventHandler<DomainEvent>[] } = {};

  register<T extends DomainEvent>(
    eventName: string,
    handler: EventHandler<T>
  ): void {
    if (!this.handlers[eventName]) {
      this.handlers[eventName] = [];
    }
    this.handlers[eventName].push(handler);
  }

  dispatch(event: DomainEvent): void {
    const eventName = event.constructor.name;
    const handlers = this.handlers[eventName];
    if (handlers) {
      handlers.forEach((handler) => handler.handle(event));
    }
  }
}
