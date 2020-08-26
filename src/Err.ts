import { Result } from './Result';

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

  expect(msg = 'expect on Err'): T {
    throw new Error(`${msg}: ${this.error}`);
  }

  expectErr(_msg = ''): E {
    return this.error;
  }

  unwrap(): T {
    throw new Error(`unwrap on an Err value ${this.error}`);
  }

  isOk(): boolean {
    return false;
  }
  isErr(): boolean {
    return true;
  }

  map<U>(_op: (v: T) => U): Result<U, E> {
    return new Err(this.error);
  }

  mapOr<U>(defaultValue: U, _op: (v: T) => U): U {
    return defaultValue;
  }

  mapErr<F>(op: (e: E) => F): Result<T, F> {
    return new Err(op(this.error));
  }

  mapOrElse<U>(mapErr: (e: E) => U, _mapOk: (v: T) => U): U {
    return this.mapErr(mapErr).expectErr();
  }

  or<F>(res: Result<T, F>): Result<T, F> {
    return res;
  }

  orElse<F>(op: (e: E) => Result<T, F>): Result<T, F> {
    return op(this.error);
  }

  unwrapErr(): E {
    return this.error;
  }

  unwrapOr(defaultValue: T): T {
    return defaultValue;
  }

  unwrapOrElse(op: (e: E) => T): T {
    return op(this.error);
  }
}
