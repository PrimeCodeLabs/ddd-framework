import { DomainService } from "../../domain/DomainService";
import { Order } from "../aggregates/Order";
import { OrderEventBus } from "../events/OrderEventBus";
import { OrderPaidEvent } from "../events/OrderPaidEvent";
import { Money } from "../value-objects/Money";
import { OrderRepository } from "../repositories/OrderRepository";

export class OrderService extends DomainService {
  private eventBus: OrderEventBus;
  private orderRepository: OrderRepository;

  constructor(eventBus: OrderEventBus, orderRepository: OrderRepository) {
    super();
    this.eventBus = eventBus;
    this.orderRepository = orderRepository;
  }

  createOrder(id: string, amount: Money): Order {
    const order = new Order(id, {
      totalAmount: amount,
      status: "created",
      items: [],
    });
    this.orderRepository.save(order);
    return order;
  }

  payOrder(order: Order): void {
    order.markAsPaid();
    this.orderRepository.save(order);
    this.eventBus.publish(new OrderPaidEvent(order.id));
  }
}
