const fs = require('fs');

const { BASE_URL, PAGE_COUNT } = require('./constants');

const getPage = (page) => `${BASE_URL}?page=${page}`;

const getPages = () => Array.from({ length: PAGE_COUNT }, (v, index) => getPage(index + 1));

const getVocabulary = ($elem) => {
  const word = $elem.find('.wlv-item__word.js-wlv-word').text();
  const ja = $elem.find('.wlv-item__word-field-container .wlv-item__word').text();
  const en = $elem.find('.wlv-item__english.js-wlv-english').text();
  const picture = $elem.find('img').attr('src');
  const audio = $elem.find('audio').attr('src');
  const type = $elem.find('.wlv-item__word-class').text();

  return {
    word,
    ja,
    en,
    picture,
    audio,
    type,
  };
};

const getExample = ($elem) => {
  const sentence = $elem.find('.wlv-item__word').text();
  const ja = $elem.find('.wlv-item__word-field > span').text();
  const en = $elem.find('.wlv-item__english').text();
  const audio = $elem.find('audio').attr('src');

  return {
    sentence,
    ja,
    en,
    audio,
  };
};

const parseData = ($) => {
  const results = [];

  $('.wlv-item__box').each((i, element) => {
    const $elem = $(element);

    results.push({
      vocabulary: getVocabulary($elem),
      example: getExample($elem.find('.wlv-item__samples-box')),
    });
  });

  return results;
};

const saveData = (filename, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, JSON.stringify(data, null, 2), 'utf8', (err) => {
      if (err) {
        return reject(`Save ${filename} failed: ${err}`);
      }

      return resolve(`Save ${filename} success`);
    });
  })
};

module.exports = {
  getPages,
  parseData,
  saveData,
};