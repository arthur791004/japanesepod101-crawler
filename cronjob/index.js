const fetch = require('node-fetch');

const words = require('../data/jp100words');
const { createMessage, getDayOfYear } = require('./utils');

require('dotenv').config();

const index = getDayOfYear() % words.length;

fetch(process.env.SLACK_WEBHOOK_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: createMessage(words[index]),
});