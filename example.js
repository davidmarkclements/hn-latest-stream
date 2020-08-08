const hnLatestStream = require('.')

const stream = hnLatestStream()

stream.pipe(process.stdout)
