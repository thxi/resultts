import { Ok } from './index';

test('unwrap', () => {
  const ok = new Ok(123);
  expect(ok.unwrap()).toBe(123);
});
