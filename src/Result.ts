export interface Result<T, E> {
  and<U>(res: Result<U, E>): Result<U, E>;
  andThen<U>(op: (v: T) => Result<U, E>): Result<U, E>;

  expect(msg?: string): T;
  expectErr(msg?: string): E;

  isErr(): boolean;
  isOk(): boolean;

  map<U>(op: (v: T) => U): Result<U, E>;
  mapOr<U>(defaultValue: U, op: (v: T) => U): U;
  mapErr<F>(op: (e: E) => F): Result<T, F>;
  mapOrElse<U>(mapErr: (e: E) => U, mapOk: (v: T) => U): U;

  or<F>(res: Result<T, F>): Result<T, F>;
  orElse<F>(op: (e: E) => Result<T, F>): Result<T, F>;

  unwrap(): T;
  unwrapErr(): E;
  unwrapOr(defaultValue: T): T;
  unwrapOrElse(op: (e: E) => T): T;
}
