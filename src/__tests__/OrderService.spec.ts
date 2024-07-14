import { OrderService } from "../examples/services/OrderService";
import { OrderRepository } from "../examples/repositories/OrderRepository";
import { Order } from "../examples/aggregates/Order";
import { Money } from "../examples/value-objects/Money";
import { OrderEventBus } from "../examples/events/OrderEventBus";
import { OrderPaidEventHandler } from "../examples/events/OrderPaidEventHandler";
import { EmailService } from "../examples/services/EmailService";

describe("OrderService", () => {
  let mockOrderRepository = new OrderRepository();
  let mockEmailService = new EmailService();
  let eventBus = new OrderEventBus();
  let service: OrderService;

  beforeEach(() => {
    mockOrderRepository = {
      findById: jest.fn().mockImplementation((id: string) => {
        if (id === "1") {
          return new Order(id, {
            totalAmount: new Money(100, "USD"),
            status: "created",
            items: [],
          });
        }
        return undefined;
      }),
      save: jest.fn(),
    } as unknown as jest.Mocked<OrderRepository>;

    mockEmailService = {
      sendPaymentConfirmation: jest.fn(),
    } as unknown as jest.Mocked<EmailService>;

    eventBus = new OrderEventBus();
    const orderPaidEventHandler = new OrderPaidEventHandler(
      mockOrderRepository,
      mockEmailService
    );
    eventBus.subscribe("OrderPaidEvent", orderPaidEventHandler);

    service = new OrderService(eventBus, mockOrderRepository);
  });

  it("should create an order", () => {
    const amount = new Money(100, "USD");
    const order = service.createOrder("1", amount);

    expect(order.totalAmount.amount.toNumber()).toBe(100); // Use toNumber() for Decimal
    expect(order.totalAmount.currency).toBe("USD");
    expect(order.status).toBe("created");
    expect(mockOrderRepository.save).toHaveBeenCalledWith(order);
  });

  it("should mark an order as paid and trigger OrderPaidEvent", () => {
    const amount = new Money(100, "USD");
    const order = service.createOrder("1", amount);

    service.payOrder(order);

    expect(order.status).toBe("paid");
    expect(mockOrderRepository.findById).toHaveBeenCalledWith("1");
    expect(mockOrderRepository.save).toHaveBeenCalledWith(order);
    expect(mockEmailService.sendPaymentConfirmation).toHaveBeenCalledWith(
      "1",
      "customer@example.com"
    );
  });
});
