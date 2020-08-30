# Result

A `Result` type for typescript

# What?

A `Result` type is a type holding a returned value or an error code. They provide
an elegant way of handling errors, without resorting to exception handling.

Read more on [wikipedia](https://en.wikipedia.org/wiki/Result_type)

# Why?

Typescript does not have a native `Result` type

# Features:

- fully documented, [documentation](https://thxi.github.io/resultts/) is hosted using github pages
- fully tested / _100%_ code coverage
- has [rust Result](https://doc.rust-lang.org/stable/std/result/enum.Result.html#method.map) api

# Install and Use

```bash
npm i @ixl/result
```

```typescript
import { Result, Ok, Err } from '@ixl/result';

function mayFail(a: string): Result<number, string> {
  if (a == 'fail') {
    return new Err('something went wrong');
  }
  return new Ok(123);
}
```

For more examples, see the [documentation](https://thxi.github.io/resultts/)
