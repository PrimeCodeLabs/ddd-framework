import { DateRange } from "../examples/value-objects/DateRange";

describe("DateRange Value Object", () => {
  it("should create a valid date range", () => {
    const startDate = new Date("2023-01-01");
    const endDate = new Date("2023-01-31");
    const dateRange = new DateRange(startDate, endDate);

    expect(dateRange.startDate).toBe(startDate);
    expect(dateRange.endDate).toBe(endDate);
  });

  it("should throw an error if end date is before start date", () => {
    const startDate = new Date("2023-01-31");
    const endDate = new Date("2023-01-01");

    expect(() => new DateRange(startDate, endDate)).toThrow(
      "End date must be after start date"
    );
  });

  it("should be equal to the same date range object", () => {
    const startDate = new Date("2023-01-01");
    const endDate = new Date("2023-01-31");
    const dateRange1 = new DateRange(startDate, endDate);
    const dateRange2 = new DateRange(startDate, endDate);

    expect(dateRange1.equals(dateRange2)).toBe(true);
  });

  it("should not be equal to a different date range object", () => {
    const startDate1 = new Date("2023-01-01");
    const endDate1 = new Date("2023-01-31");
    const dateRange1 = new DateRange(startDate1, endDate1);

    const startDate2 = new Date("2023-02-01");
    const endDate2 = new Date("2023-02-28");
    const dateRange2 = new DateRange(startDate2, endDate2);

    expect(dateRange1.equals(dateRange2)).toBe(false);
  });
});
