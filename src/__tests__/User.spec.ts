import { User } from "../examples/entities/User";
import { Address } from "../examples/value-objects/Address";

describe("User Entity", () => {
  it("should create a user entity", () => {
    const address = new Address("123 Main St", "Springfield", "IL", "62701");
    const user = new User("1", {
      name: "John Doe",
      email: "john.doe@example.com",
      address,
    });

    expect(user.name).toBe("John Doe");
    expect(user.email).toBe("john.doe@example.com");
    expect(user.address.street).toBe("123 Main St");
  });

  it("should change user address", () => {
    const address = new Address("123 Main St", "Springfield", "IL", "62701");
    const user = new User("1", {
      name: "John Doe",
      email: "john.doe@example.com",
      address,
    });

    const newAddress = new Address("456 Elm St", "Springfield", "IL", "62702");
    user.changeAddress(newAddress);

    expect(user.address.street).toBe("456 Elm St");
  });
});
