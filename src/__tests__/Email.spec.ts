import { Email } from "../examples/value-objects/Email";

describe("Email Value Object", () => {
  it("should create a valid email object", () => {
    const email = new Email("test@example.com");
    expect(email.value).toBe("test@example.com");
  });

  it("should throw an error for an invalid email format", () => {
    expect(() => new Email("invalid-email")).toThrow("Invalid email format");
  });

  it("should be equal to the same email object", () => {
    const email1 = new Email("test@example.com");
    const email2 = new Email("test@example.com");
    expect(email1.equals(email2)).toBe(true);
  });

  it("should not be equal to a different email object", () => {
    const email1 = new Email("test1@example.com");
    const email2 = new Email("test2@example.com");
    expect(email1.equals(email2)).toBe(false);
  });
});
