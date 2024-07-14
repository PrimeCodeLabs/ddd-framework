import { EventHandler } from "../../domain/EventDispatcher";
import { OrderRepository } from "../repositories/OrderRepository";
import { EmailService } from "../services/EmailService";
import { OrderPaidEvent } from "./OrderPaidEvent";

export class OrderPaidEventHandler implements EventHandler<OrderPaidEvent> {
  private orderRepository: OrderRepository;
  private emailService: EmailService;

  constructor(orderRepository: OrderRepository, emailService: EmailService) {
    this.orderRepository = orderRepository;
    this.emailService = emailService;
  }

  handle(event: OrderPaidEvent): void {
    const order = this.orderRepository.findById(event.orderId);
    if (order) {
      const customerEmail = "customer@example.com";
      this.emailService.sendPaymentConfirmation(event.orderId, customerEmail);
      console.log(
        `Order with ID ${event.orderId} was paid at ${event.occurredOn}`
      );
    } else {
      console.error(`Order with ID ${event.orderId} not found`);
    }
  }
}
