/**
 * {@link Result} type represents either success({@link Ok}) or failure({@link Err})<br>
 */
export interface Result<T, E> {
  /**
   * Returns `res` if the result is {@link Ok}, otherwise returns
   * the {@link Err} value of self
   * 
    ```typescript
    const x = new Ok(123);
    const y = new Err('late error');
    expect(x.and(y).expectErr()).toBe('late error');

    const x: Result<number, string> = new Err('early error');
    const y: Result<string, string> = new Ok('foo');
    expect(x.and(y).expectErr()).toBe('early error');

    const x: Result<number, string> = new Err('not a 2');
    const y: Result<string, string> = new Err('late error');
    expect(x.and(y).expectErr()).toBe('not a 2');

    const x = new Ok(2);
    const y = new Ok('different result type');
    expect(x.and(y).expect()).toBe('different result type');
    ```
   * @param res
   */
  and<U>(res: Result<U, E>): Result<U, E>;
  /**
   * Calls `op` if the result is {@link Ok}, otherwise returns the
   * {@link Err} value of self<br>
   * 
    ```typescript
    const sq = (x: number) => new Ok<number, number>(x * x);
    const err = (x: number) => new Err<number, number>(x);

    const x = new Ok(2);
    expect(x.andThen(sq).andThen(sq).expect()).toBe(16);
    expect(x.andThen(sq).andThen(err).expectErr()).toBe(4);
    expect(x.andThen(err).andThen(sq).expectErr()).toBe(2);

    const y = new Err<number, number>(3);
    expect(y.andThen(sq).andThen(sq).expectErr()).toBe(3);
    ```
   * @param op
   */
  andThen<U>(op: (v: T) => Result<U, E>): Result<U, E>;

  /**
   * Returns the contained {@link Ok} value.<br>
   * Throws if the value is an {@link Err}, with a message including the passed
   * `msg` and the content of the {@link Err}
   * 
    ```typescript
    const x = new Ok('12');
    expect(() => x.expect()).toBe('12');
    ```
   * @param msg
   */
  expect(msg?: string): T;
  /**
   * Returns the contained {@link Err} value.<br>
   * Throws if the value is an {@link Ok}, with a message including the passed
   * `msg` and the content of the {@link Ok}
   * 
    ```typescript
    const x = new Err('emergency');
    expect(() => x.expectErr()).toBe('emergency');
    ```
   * @param msg
   */
  expectErr(msg?: string): E;

  /**
   * Returns `true` if the result if {@link Err}
   * 
    ```typescript
    const x = new Ok(-3);
    expect(x.isErr()).toBe(false);

    const y = new Err(-3);
    expect(y.isErr()).toBe(true);
    ```
   */
  isErr(): boolean;
  /**
   * Returns `true` if the result if {@link Ok}
   * 
    ```typescript
    const x = new Ok(-3);
    expect(x.isOk()).toBe(true);

    const y = new Err(-3);
    expect(y.isOk()).toBe(false);
    ```
   */
  isOk(): boolean;

  /**
   * Maps a `Result<T, E>` to `Result<U, E>` by applying a function to a
   * contained {@link Ok} value, leaving an {@link Err} value untouched
   * 
    ```typescript
    const x = new Ok(1);
    expect(x.map((v) => v + 10).expect()).toBe(11);

    const x: Result<number, number> = new Err(1);
    expect(x.map((v) => v + 10).expectErr()).toBe(1);
    ```
   * @param op
   */
  map<U>(op: (v: T) => U): Result<U, E>;
  /**
   * Applies a function to the contained value (if {@link Ok}), or returns the
   * provided `defaultValue` (if {@link Err})
   * 
    ```typescript
    const x = new Ok('foo');
    expect(x.mapOr(42, (v) => v.length)).toBe(3);

    const x: Result<string, number> = new Err(1);
    expect(x.mapOr(228, (v) => v.length)).toBe(228);
    ```
   * @param defaultValue
   * @param op
   */
  mapOr<U>(defaultValue: U, op: (v: T) => U): U;
  /**
   * Maps a `Result<T, E>` to `Result<T, F>` by applying a function to a
   * contained {@link Err} value, leaving an {@link Ok} value untouched
   * 
    ```typescript
    const stringify = (x: number) => `error code: ${x}`;
    const x = new Ok<string, number>('foo');
    expect(x.mapErr(stringify).expect()).toBe('foo');

    const stringify = (x: number) => `error code: ${x}`;
    const x = new Err<string, number>(228);
    expect(x.mapErr(stringify).expectErr()).toBe('error code: 228');
    ```
   * @param op
   */
  mapErr<F>(op: (e: E) => F): Result<T, F>;
  /**
   * Maps a `Result<T, E>` to `U` by applying a function to a
   * contained {@link Ok} value, or a fallback function to a contained
   * 
    ```typescript
    const mapOk = (x: number) => x + 3;
    const mapErr = (x: number) => x;
    const x = new Ok<number, number>(0);
    expect(x.mapOrElse(mapErr, mapOk)).toBe(3);

    const mapOk = (x: number) => x + 3;
    const mapErr = (x: number) => x;
    const x = new Err<number, number>(0);
    expect(x.mapOrElse(mapErr, mapOk)).toBe(0);
    ```
   * {@link Err} value
   * @param op
   */
  mapOrElse<U>(mapErr: (e: E) => U, mapOk: (v: T) => U): U;

  /**
   * Returns `res` if the result is {@link Err}, otherwise returns the
   * {@link Ok} value of `self`
   *
    ```typescript
    const x = new Ok<number, string>(123);
    const y = new Err<number, string>('late error');
    expect(x.or(y).expect()).toBe(123);

    const x: Result<number, string> = new Err('early error');
    const y: Result<number, string> = new Ok(2);
    expect(x.or(y).expect()).toBe(2);

    const x: Result<number, string> = new Err('not a 2');
    const y: Result<number, string> = new Err('late error');
    expect(x.or(y).expectErr()).toBe('late error');

    const x = new Ok(2);
    const y = new Ok(228);
    expect(x.or(y).expect()).toBe(2);
    ```
   * @param res
   */
  or<F>(res: Result<T, F>): Result<T, F>;
  /**
   * Calls `op` if the result is {@link Err}, otherwise returns the {@link Ok}
   * value of `self`.
   *
    ```typescript
    const sq = (x: number) => new Ok<number, number>(x * x);
    const err = (x: number) => new Err<number, number>(x);

    const x = new Ok<number, number>(2);
    expect(x.orElse(sq).orElse(sq).expect()).toBe(2);
    expect(x.orElse(err).orElse(sq).expect()).toBe(2);

    const y = new Err<number, number>(3);
    expect(y.orElse(sq).orElse(err).expect()).toBe(9);
    expect(y.orElse(err).orElse(err).expectErr()).toBe(3);
    ```
   * @param op
   */
  orElse<F>(op: (e: E) => Result<T, F>): Result<T, F>;

  /**
   * Returns the contained {@link Ok} value.<br>
   * Throws if the value is {@link Err}
   *
    ```typescript
    const ok = new Ok(123);
    expect(ok.unwrap()).toBe(123);
    const err = new Err('expected');
    expect(() => err.unwrap()).toThrow('unwrap on an Err value');
    ```
   */
  unwrap(): T;
  /**
   * Returns the contained {@link Err} value.<br>
   * Throws if the value is {@link Ok}
   *
    ```typescript
    const err = new Err('expected');
    expect(err.unwrapErr()).toBe('expected');

    const ok = new Ok(123);
    expect(() => ok.unwrapErr()).toThrow('123');
    ```
   */
  unwrapErr(): E;
  /**
   * Returns the contained {@link Ok} value or a provided default
   *
    ```typescript
    const ok = new Ok(123);
    expect(ok.unwrapOr(228)).toBe(123);

    const err = new Err('expected');
    expect(err.unwrapOr('default')).toBe('default');
    ```
   * @param defaultValue
   */
  unwrapOr(defaultValue: T): T;
  /**
   * Returns the contained {@link Ok} value or computes it from a closure.
   *
    ```typescript
    const ok = new Ok<number, number>(123);
    expect(ok.unwrapOrElse((e) => e + 1)).toBe(123);

    const err = new Err<number, string>('hello');
    expect(err.unwrapOrElse((e) => e.length)).toBe(5);
    ```
   * @param op
   */
  unwrapOrElse(op: (e: E) => T): T;
}
