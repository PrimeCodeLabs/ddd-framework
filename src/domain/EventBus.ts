import { DomainEvent } from "./DomainEvent";
import { EventHandler } from "./EventDispatcher";

export interface EventBus<T extends DomainEvent> {
  subscribe(eventName: string, handler: EventHandler<T>): void;
  publish(event: T): void;
}
