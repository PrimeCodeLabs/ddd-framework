import { OrderPaidEvent } from "../examples/events/OrderPaidEvent";

describe("OrderPaidEvent DomainEvent", () => {
  it("should create an event with the correct values", () => {
    const event = new OrderPaidEvent("1");
    expect(event.orderId).toBe("1");
    expect(event.occurredOn).toBeInstanceOf(Date);
  });
});
