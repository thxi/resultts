import { Result } from './Result';

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

  expect(_msg = ''): T {
    return this.value;
  }

  expectErr(msg = 'expectErr on Ok'): E {
    throw new Error(`${msg}: ${this.value}`);
  }

  unwrap(): T {
    return this.value;
  }

  isOk(): boolean {
    return true;
  }
  isErr(): boolean {
    return false;
  }

  map<U>(op: (v: T) => U): Result<U, E> {
    return new Ok(op(this.value));
  }

  mapOr<U>(_defaultValue: U, op: (v: T) => U): U {
    return this.map(op).unwrap();
  }

  mapErr<F>(_op: (e: E) => F): Result<T, F> {
    return new Ok(this.value);
  }

  mapOrElse<U>(_mapErr: (e: E) => U, mapOk: (v: T) => U): U {
    return this.map(mapOk).expect();
  }

  or<F>(_res: Result<T, F>): Result<T, F> {
    return new Ok(this.value);
  }

  orElse<F>(_op: (e: E) => Result<T, F>): Result<T, F> {
    return new Ok(this.value);
  }

  unwrapErr(): E {
    throw new Error(`${this.value}`);
  }

  unwrapOr(_defaultValue: T): T {
    return this.value;
  }

  unwrapOrElse(_op: (e: E) => T): T {
    return this.value;
  }
}
