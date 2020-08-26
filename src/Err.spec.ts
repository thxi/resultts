import { Err } from './index';

test('unwrap', () => {
  const err = new Err('expected');
  expect(() => err.unwrap()).toThrow('unwrap on an Err value');
});
