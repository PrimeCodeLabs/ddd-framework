import { Order } from "../examples/aggregates/Order";
import { OrderItem } from "../examples/entities/OrderItem";
import { Money } from "../examples/value-objects/Money";
import { OrderPaidEvent } from "../examples/events/OrderPaidEvent";

describe("Order AggregateRoot", () => {
  it("should create an order with correct values", () => {
    const amount = new Money(100, "USD");
    const order = new Order("1", {
      totalAmount: amount,
      status: "created",
      items: [],
    });

    expect(Number(order.totalAmount.amount)).toBe(100); // Initial amount should be 0 as no items are added yet
    expect(order.totalAmount.currency).toBe("USD");
    expect(order.status).toBe("created");
    expect(order.items.length).toBe(0);
  });

  it("should add an item to the order and recalculate total amount", () => {
    const amount = new Money(0, "USD");
    const itemPrice = new Money(50, "USD");
    const order = new Order("1", {
      totalAmount: amount,
      status: "created",
      items: [],
    });

    const item = new OrderItem("1", {
      productId: "p1",
      quantity: 2,
      price: itemPrice,
    });
    order.addItem(item);

    expect(order.items.length).toBe(1);
    expect(Number(order.totalAmount.amount)).toBe(100);
  });

  it("should mark an order as paid and add a domain event", () => {
    const amount = new Money(0, "USD");
    const order = new Order("1", {
      totalAmount: amount,
      status: "created",
      items: [],
    });
    order.markAsPaid();

    expect(order.status).toBe("paid");
    expect(order.domainEvents.length).toBe(1);
    expect(order.domainEvents[0]).toBeInstanceOf(OrderPaidEvent);
  });

  it("should clear domain events", () => {
    const amount = new Money(0, "USD");
    const order = new Order("1", {
      totalAmount: amount,
      status: "created",
      items: [],
    });
    order.markAsPaid();
    order.clearDomainEvents();

    expect(order.domainEvents.length).toBe(0);
  });

  it("should throw an error if trying to mark a non-created order as paid", () => {
    const amount = new Money(0, "USD");
    const order = new Order("1", {
      totalAmount: amount,
      status: "paid",
      items: [],
    });

    expect(() => order.markAsPaid()).toThrow("Order cannot be marked as paid");
  });
});
