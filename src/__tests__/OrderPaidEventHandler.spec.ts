import { Order } from "../examples/aggregates/Order";
import { OrderPaidEvent } from "../examples/events/OrderPaidEvent";
import { OrderPaidEventHandler } from "../examples/events/OrderPaidEventHandler";
import { OrderRepository } from "../examples/repositories/OrderRepository";
import { EmailService } from "../examples/services/EmailService";
import { Money } from "../examples/value-objects/Money";

describe("OrderPaidEventHandler", () => {
  it("should handle OrderPaidEvent and send an email", () => {
    const mockOrderRepository = {
      findById: jest.fn().mockReturnValue(
        new Order("1", {
          totalAmount: new Money(100, "USD"),
          status: "created",
          items: [],
        })
      ),
    } as unknown as OrderRepository;

    const mockEmailService = {
      sendPaymentConfirmation: jest.fn(),
    } as unknown as EmailService;

    const handler = new OrderPaidEventHandler(
      mockOrderRepository,
      mockEmailService
    );
    const event = new OrderPaidEvent("1");

    handler.handle(event);

    expect(mockOrderRepository.findById).toHaveBeenCalledWith("1");
    expect(mockEmailService.sendPaymentConfirmation).toHaveBeenCalledWith(
      "1",
      "customer@example.com"
    );
    console.log = jest.fn(); // Mock console.log to suppress output during tests
    handler.handle(event); // Handle the event again to ensure no errors

    // Restore original console.log
    (console.log as jest.Mock).mockRestore();
  });
});
