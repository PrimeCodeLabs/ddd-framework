import { ValueObject } from "../../domain/ValueObject";

interface DateRangeProps {
  startDate: Date;
  endDate: Date;
}

export class DateRange extends ValueObject<DateRangeProps> {
  constructor(startDate: Date, endDate: Date) {
    if (endDate <= startDate) {
      throw new Error("End date must be after start date");
    }
    super({ startDate, endDate });
  }

  get startDate(): Date {
    return this.props.startDate;
  }

  get endDate(): Date {
    return this.props.endDate;
  }
}
