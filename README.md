# DDD Framework

A framework to facilitate building domain-driven applications with value objects, entities, and aggregates.

## Features

- **Value Objects**: Encapsulate value types.
- **Entities**: Unique objects with identity.
- **Aggregates**: Clusters of entities treated as a single unit.
- **Domain Events**: Events that represent significant actions within the domain.
- **Event Dispatching**: Handling and dispatching domain events.
- **Repositories**: Abstract storage for aggregates.
- **Specifications**: Encapsulate business rules and criteria.
- **Factories**: Simplify complex object creation.

## Installation

To install the package, use npm:

```sh
npm install @PrimeCodeLabs/ddd-framework
```

## Usage

### Value Objects

Value Objects are immutable and defined by their values. An example of a value object is `Money`.

#### Money

```typescript
import { Money } from "@PrimeCodeLabs/ddd-framework";

const price = Money.create(100, "USD");
const discountedPrice = price.subtract(Money.create(20, "USD"));

console.log(price.amount.toString()); // '100'
console.log(discountedPrice.amount.toString()); // '80'
console.log(price.currency); // 'USD'
```

### Entities

Entities are objects that are defined by their identity rather than their attributes.

#### Product

```typescript
import { Entity } from "@PrimeCodeLabs/ddd-framework";
import { Money } from "@PrimeCodeLabs/ddd-framework";

interface ProductProps {
  name: string;
  price: Money;
  category: string;
}

class Product extends Entity<ProductProps> {
  static create(id: string, props: ProductProps): Product {
    return new Product(id, props);
  }

  get name(): string {
    return this.props.name;
  }

  get price(): Money {
    return this.props.price;
  }

  get category(): string {
    return this.props.category;
  }

  changePrice(newPrice: Money): void {
    this.props.price = newPrice;
  }
}

const product = Product.create("1", {
  name: "Product A",
  price: Money.create(100, "USD"),
  category: "Electronics",
});
product.changePrice(Money.create(150, "USD"));

console.log(product.price.amount.toString()); // '150'
```

### Aggregates

Aggregates are clusters of entities that are treated as a single unit. The root entity of an aggregate is known as the aggregate root.

#### Order

```typescript
import { AggregateRoot } from "@PrimeCodeLabs/ddd-framework";
import { Money } from "@PrimeCodeLabs/ddd-framework";
import { OrderItem } from "./OrderItem";

interface OrderProps {
  totalAmount: Money;
  status: "created" | "paid" | "shipped" | "delivered";
  items: OrderItem[];
}

class Order extends AggregateRoot<OrderProps> {
  static create(id: string, props: OrderProps): Order {
    return new Order(id, {
      ...props,
      totalAmount: Money.create(0, props.totalAmount.currency),
    });
  }

  get totalAmount(): Money {
    return this.props.totalAmount;
  }

  get status(): string {
    return this.props.status;
  }

  get items(): OrderItem[] {
    return this.props.items;
  }

  addItem(item: OrderItem): void {
    this.props.items.push(item);
    this.recalculateTotalAmount();
  }

  markAsPaid(): void {
    if (this.props.status !== "created") {
      throw new Error("Order cannot be marked as paid");
    }
    this.props.status = "paid";
  }

  private recalculateTotalAmount(): void {
    const total = this.props.items.reduce((sum, item) => {
      const itemTotal = item.price.multiply(item.quantity);
      return sum.add(itemTotal);
    }, Money.create(0, this.props.totalAmount.currency));
    this.props.totalAmount = total;
  }
}
```

### Domain Events

Domain Events are used to model significant events that happen within the domain.

#### OrderPaidEvent

```typescript
import { DomainEvent } from "@PrimeCodeLabs/ddd-framework";

class OrderPaidEvent extends DomainEvent {
  constructor(public readonly orderId: string) {
    super();
  }
}
```

### Event Dispatching

Event Dispatching is used to handle and dispatch domain events.

#### EventDispatcher

```typescript
import { EventDispatcher, EventHandler } from "@PrimeCodeLabs/ddd-framework";
import { OrderPaidEvent } from "./OrderPaidEvent";

class OrderPaidEventHandler implements EventHandler<OrderPaidEvent> {
  handle(event: OrderPaidEvent): void {
    console.log(`Order with ID ${event.orderId} was paid.`);
  }
}

const dispatcher = new EventDispatcher();
dispatcher.register("OrderPaidEvent", new OrderPaidEventHandler());

const event = new OrderPaidEvent("1");
dispatcher.dispatch(event);
```

### Repositories

Repositories are used to abstract storage for aggregates.

#### OrderRepository

```typescript
import { Repository } from "@PrimeCodeLabs/ddd-framework";
import { Order } from "./Order";

class OrderRepository extends Repository<Order> {
  private orders = new Map<string, Order>();

  async save(order: Order): Promise<void> {
    this.orders.set(order.id, order);
  }

  async findById(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }
}
```

### Specifications

Specifications are used to encapsulate business rules and criteria.

#### ProductPriceSpecification

```typescript
import { Specification } from "@PrimeCodeLabs/ddd-framework";
import { Product } from "./Product";
import { Money } from "@PrimeCodeLabs/ddd-framework";

class ProductPriceSpecification implements Specification<Product> {
  constructor(
    private readonly minPrice: Money,
    private readonly maxPrice: Money
  ) {}

  isSatisfiedBy(product: Product): boolean {
    return (
      product.price.greaterThanOrEqual(this.minPrice) &&
      product.price.lessThanOrEqual(this.maxPrice)
    );
  }
}
```

#### ProductCategorySpecification

```typescript
import { Specification } from "@PrimeCodeLabs/ddd-framework";
import { Product } from "./Product";

class ProductCategorySpecification implements Specification<Product> {
  constructor(private readonly category: string) {}

  isSatisfiedBy(product: Product): boolean {
    return product.category === this.category;
  }
}
```

### Combining Specifications

```typescript
import {
  AndSpecification,
  OrSpecification,
  NotSpecification,
} from "@PrimeCodeLabs/ddd-framework";
import { Product } from "./Product";
import { Money } from "@PrimeCodeLabs/ddd-framework";

const minPrice = Money.create(50, "USD");
const maxPrice = Money.create(150, "USD");
const priceSpec = new ProductPriceSpecification(minPrice, maxPrice);
const categorySpec = new ProductCategorySpecification("Electronics");

// Products must be in the Electronics category and within the price range
const combinedSpec = new AndSpecification(priceSpec, categorySpec);

// Alternatively, products could be in the Electronics category or within the price range
const orSpec = new OrSpecification(priceSpec, categorySpec);

// Products must not be in the Electronics category
const notSpec = new NotSpecification(categorySpec);
```

### Filtering Collections

```typescript
const products: Product[] = [
  // ... list of products
];

const filteredProducts = products.filter((product) =>
  combinedSpec.isSatisfiedBy(product)
);

filteredProducts.forEach((product) => {
  console.log(`${product.name} meets the criteria.`);
});
```

### Factories

Factories are used to simplify the creation of complex objects.

#### ProductFactory

```typescript
import { Factory } from "@PrimeCodeLabs/ddd-framework";
import { Product } from "./Product";
import { Money } from "@PrimeCodeLabs/ddd-framework";

class ProductFactory extends Factory<Product> {
  static createProduct(
    id: string,
    name: string,
    priceAmount: number,
    currency: string,
    category: string
  ): Product {
    const price = Money.create(priceAmount, currency);
    const props = { name, price, category };
    return Product.create(id, props);
  }
}

const product = ProductFactory.createProduct(
  "1",
  "Product A",
  100,
  "USD",
  "Electronics"
);
console.log(product);
```

## Running Tests

To run tests, use the following command:

```sh
npm run test
```

## Building the Project

To build the project, use the following command:

```sh
npm run build
```

## Generating Documentation

To generate documentation, use the following command:

```sh
npm run docs
```
