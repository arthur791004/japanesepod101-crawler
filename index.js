const Crawler = require('crawler');

const logger = require('./logger');
const { parseData, saveData, getPages } = require('./utils');

let count = 0;
let results = [];

const pages = getPages();
const callback = (error, res, done) => {
  if (error) {
    logger.error(error);
    return done();
  }

  const data = parseData(res.$);

  results = results.concat(data);
  count = count + 1;

  if (count < pages.length) {
    return done();
  }

  saveData('jp100words.json', results)
    .then(logger.log)
    .catch(logger.error)
    .then(done);
}

const crawler = new Crawler({
  maxConnections: 1,
  callback,
});

crawler.queue(pages);