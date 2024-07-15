export interface Specification<T> {
  isSatisfiedBy(entity: T): boolean;
}

export class AndSpecification<T> implements Specification<T> {
  constructor(
    private readonly spec1: Specification<T>,
    private readonly spec2: Specification<T>
  ) {}

  isSatisfiedBy(entity: T): boolean {
    return this.spec1.isSatisfiedBy(entity) && this.spec2.isSatisfiedBy(entity);
  }
}

export class OrSpecification<T> implements Specification<T> {
  constructor(
    private readonly spec1: Specification<T>,
    private readonly spec2: Specification<T>
  ) {}

  isSatisfiedBy(entity: T): boolean {
    return this.spec1.isSatisfiedBy(entity) || this.spec2.isSatisfiedBy(entity);
  }
}

export class NotSpecification<T> implements Specification<T> {
  constructor(private readonly spec: Specification<T>) {}

  isSatisfiedBy(entity: T): boolean {
    return !this.spec.isSatisfiedBy(entity);
  }
}
