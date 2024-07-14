import { Address } from "../examples/value-objects/Address";

describe("Address Value Object", () => {
  it("should create an address value object", () => {
    const address = new Address("123 Main St", "Springfield", "IL", "62701");
    expect(address.street).toBe("123 Main St");
    expect(address.city).toBe("Springfield");
    expect(address.state).toBe("IL");
    expect(address.postalCode).toBe("62701");
  });

  it("should be equal to the same address object", () => {
    const address1 = new Address("123 Main St", "Springfield", "IL", "62701");
    const address2 = new Address("123 Main St", "Springfield", "IL", "62701");
    expect(address1.equals(address2)).toBe(true);
    expect(address1.equals(null as unknown as Address)).toBe(false);
  });

  it("should not be equal to a different address object", () => {
    const address1 = new Address("123 Main St", "Springfield", "IL", "62701");
    const address2 = new Address("456 Elm St", "Springfield", "IL", "62702");
    expect(address1.equals(address2)).toBe(false);
  });
});
