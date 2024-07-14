import { EventDispatcher, EventHandler } from "../domain/EventDispatcher";
import { OrderPaidEvent } from "../examples/events/OrderPaidEvent";

class MockEventHandler implements EventHandler<OrderPaidEvent> {
  handle(event: OrderPaidEvent): void {
    console.log(`Mock handling event for Order ID: ${event.orderId}`);
  }
}

describe("EventDispatcher", () => {
  it("should register and dispatch events", () => {
    const dispatcher = new EventDispatcher();
    const handler = new MockEventHandler();
    const spy = jest.spyOn(handler, "handle");

    dispatcher.register<OrderPaidEvent>("OrderPaidEvent", handler);
    const event = new OrderPaidEvent("1");
    dispatcher.dispatch(event);

    expect(spy).toHaveBeenCalledWith(event);
  });
});
