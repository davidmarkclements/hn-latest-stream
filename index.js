'use strict'
const stream = require('readable-stream')
const got = require('got')

const { PassThrough } = stream

const base = 'https://hacker-news.firebaseio.com/v0'

function htmlify (story) {
  const { by, title, url } = story

  return `
  <article class='hn-article'>
    <h2> ${by} </h2>
    <h3>${title}<h3>
    <a href="${url}">${url}</a>
  </article>
  `
}

async function hydrate (stream, max, json) {
  const stories = await got(`${base}/newstories.json`).json()
  let comma = ''
  if (json) stream.push('[')
  for (const id of stories) {
    const story = await got(`${base}/item/${id}.json`).json()
    if (json) {
      stream.push(comma + JSON.stringify(story))
      comma = ','
    } else {
      stream.push(htmlify(story))
    }
    if (--max <= 0) break
  }
  if (json) stream.push(']')
  stream.end()
}

// output may be "HTML" or "objects"
// if objects then the stream is an object mode stream
function hnLatestStream (max = 10, output = 'html') {
  output = (output + '').toLowerCase()
  if (output !== 'html' && output !== 'json') {
    throw Error('output parameter must be "html" or "json"')
  }
  if (max <= 0) {
    throw Error('max parameter must be greater than 0')
  }
  const json = output === 'json'
  const stream = PassThrough()

  hydrate(stream, max, json).catch((err) => {
    stream.emit('error', err)
  })
  return stream
}

module.exports = hnLatestStream
