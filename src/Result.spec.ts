import { Result, Ok, Err } from './index';

describe('and', () => {
  test('late error', () => {
    const x = new Ok(123);
    const y = new Err('late error');
    expect(x.and(y).expectErr()).toBe('late error');
  });

  test('early error', () => {
    const x: Result<number, string> = new Err('early error');
    const y: Result<string, string> = new Ok('foo');
    expect(x.and(y).expectErr()).toBe('early error');
  });

  test('error + late error', () => {
    const x: Result<number, string> = new Err('not a 2');
    const y: Result<string, string> = new Err('late error');
    expect(x.and(y).expectErr()).toBe('not a 2');
  });

  test('different result type', () => {
    const x = new Ok(2);
    const y = new Ok('different result type');
    expect(x.and(y).expect()).toBe('different result type');
  });
});

test('andThen', () => {
  const sq = (x: number) => new Ok<number, number>(x * x);
  const err = (x: number) => new Err<number, number>(x);

  const x = new Ok(2);
  expect(x.andThen(sq).andThen(sq).expect()).toBe(16);
  expect(x.andThen(sq).andThen(err).expectErr()).toBe(4);
  expect(x.andThen(err).andThen(sq).expectErr()).toBe(2);

  const y = new Err<number, number>(3);
  expect(y.andThen(sq).andThen(sq).expectErr()).toBe(3);
});

test('expect', () => {
  const x = new Err('emergency');
  expect(() => x.expect()).toThrow('expect on Err');
});

test('expectErr', () => {
  const x = new Ok(10);
  expect(() => x.expectErr()).toThrow('expectErr on Ok');
});

describe('is', () => {
  test('ok', () => {
    const x = new Ok(-3);
    expect(x.isOk()).toBe(true);

    const y = new Err(-3);
    expect(y.isOk()).toBe(false);
  });

  test('err', () => {
    const x = new Ok(-3);
    expect(x.isErr()).toBe(false);

    const y = new Err(-3);
    expect(y.isErr()).toBe(true);
  });
});

describe('map', () => {
  test('ok', () => {
    const x = new Ok(1);
    expect(x.map((v) => v + 10).expect()).toBe(11);
  });
  test('err', () => {
    const x: Result<number, number> = new Err(1);
    expect(x.map((v) => v + 10).expectErr()).toBe(1);
  });
});

describe('mapOr', () => {
  test('ok', () => {
    const x = new Ok('foo');
    expect(x.mapOr(42, (v) => v.length)).toBe(3);
  });

  test('err', () => {
    const x: Result<string, number> = new Err(1);
    expect(x.mapOr(228, (v) => v.length)).toBe(228);
  });
});

describe('mapErr', () => {
  test('ok', () => {
    const stringify = (x: number) => `error code: ${x}`;
    const x = new Ok<string, number>('foo');
    expect(x.mapErr(stringify).expect()).toBe('foo');
  });

  test('err', () => {
    const stringify = (x: number) => `error code: ${x}`;
    const x = new Err<string, number>(228);
    expect(x.mapErr(stringify).expectErr()).toBe('error code: 228');
  });
});

describe('mapOrElse', () => {
  test('ok', () => {
    const mapOk = (x: number) => x + 3;
    const mapErr = (x: number) => x;
    const x = new Ok<number, number>(0);
    expect(x.mapOrElse(mapErr, mapOk)).toBe(3);
  });

  test('err', () => {
    const mapOk = (x: number) => x + 3;
    const mapErr = (x: number) => x;
    const x = new Err<number, number>(0);
    expect(x.mapOrElse(mapErr, mapOk)).toBe(0);
  });
});

describe('or', () => {
  test('late error', () => {
    const x = new Ok<number, string>(123);
    const y = new Err<number, string>('late error');
    expect(x.or(y).expect()).toBe(123);
  });

  test('early error', () => {
    const x: Result<number, string> = new Err('early error');
    const y: Result<number, string> = new Ok(2);
    expect(x.or(y).expect()).toBe(2);
  });

  test('error + late error', () => {
    const x: Result<number, string> = new Err('not a 2');
    const y: Result<number, string> = new Err('late error');
    expect(x.or(y).expectErr()).toBe('late error');
  });

  test('both ok', () => {
    const x = new Ok(2);
    const y = new Ok(228);
    expect(x.or(y).expect()).toBe(2);
  });
});

test('orElse', () => {
  const sq = (x: number) => new Ok<number, number>(x * x);
  const err = (x: number) => new Err<number, number>(x);

  const x = new Ok<number, number>(2);
  expect(x.orElse(sq).orElse(sq).expect()).toBe(2);
  expect(x.orElse(err).orElse(sq).expect()).toBe(2);

  const y = new Err<number, number>(3);
  expect(y.orElse(sq).orElse(err).expect()).toBe(9);
  expect(y.orElse(err).orElse(err).expectErr()).toBe(3);
});

test('unwrap', () => {
  const ok = new Ok(123);
  expect(ok.unwrap()).toBe(123);
  const err = new Err('expected');
  expect(() => err.unwrap()).toThrow('unwrap on an Err value');
});

test('unwrapErr', () => {
  const err = new Err('expected');
  expect(err.unwrapErr()).toBe('expected');

  const ok = new Ok(123);
  expect(() => ok.unwrapErr()).toThrow('123');
});

test('unwrapOr', () => {
  const ok = new Ok(123);
  expect(ok.unwrapOr(228)).toBe(123);

  const err = new Err('expected');
  expect(err.unwrapOr('default')).toBe('default');
});

test('unwrapOrElse', () => {
  const ok = new Ok<number, number>(123);
  expect(ok.unwrapOrElse((e) => e + 1)).toBe(123);

  const err = new Err<number, string>('hello');
  expect(err.unwrapOrElse((e) => e.length)).toBe(5);
});
