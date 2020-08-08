# hn-latest-stream

> hackernews stream of latest stories as JSON or HTML

## Usage

```js
const hnLatestStream = require('hn-latest-stream')

const stream = hnLatestStream()

stream.pipe(process.stdout)
```

## API

### `hnLatestStream(max = 10, output = 'html') => Stream`

Requiring this module results in a function which when called will
return a stream that outputs the latest Hackernews stories either
as HTML (default) or as JSON. Two parameters are accepted:

* `max` - the maximum amount of stories, defaults to 10
* `output` - the output type, must be `'html'` or `'json'` (case-insensitive). Defaults to `'html'`.


## License
[ISC]()
