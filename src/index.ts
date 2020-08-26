export interface Result<T, E> {
  and<U>(res: Result<U, E>): Result<U, E>;
  andThen<U>(op: (v: T) => Result<U, E>): Result<U, E>;

  expect(msg: string): T;

  unwrap(): T;
}

export class Ok<T, E> implements Result<T, E> {
  private value: T;

  constructor(v: T) {
    this.value = v;
  }
  and<U>(res: Result<U, E>): Result<U, E> {
    return res;
  }

  andThen<U>(op: (v: T) => Result<U, E>): Result<U, E> {
    return op(this.value);
  }

  expect(_msg: string): T {
    return this.value;
  }

  unwrap(): T {
    return this.value;
  }
}

export class Err<T, E> implements Result<T, E> {
  private error: E;

  constructor(error: E) {
    this.error = error;
  }

  and<U>(_res: Result<U, E>): Result<U, E> {
    return new Err<U, E>(this.error);
  }

  andThen<U>(_op: (v: T) => Result<U, E>): Result<U, E> {
    return new Err<U, E>(this.error);
  }

  expect(msg: string): T {
    throw new Error(msg);
  }

  unwrap(): T {
    throw new Error(`unwrap on an Err value ${this.error}`);
  }
}
