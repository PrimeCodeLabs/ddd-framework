import { OrderEventBus } from "./events/OrderEventBus";
import { OrderPaidEventHandler } from "./events/OrderPaidEventHandler";
import { OrderPaidEvent } from "./events/OrderPaidEvent";
import { OrderRepository } from "./repositories/OrderRepository";
import { EmailService } from "./services/EmailService";

const eventBus = new OrderEventBus();

const orderRepository = new OrderRepository();
const emailService = new EmailService();

const orderPaidEventHandler = new OrderPaidEventHandler(
  orderRepository,
  emailService
);
eventBus.subscribe("OrderPaidEvent", orderPaidEventHandler);

export { eventBus };
