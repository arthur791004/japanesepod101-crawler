const fetch = require('node-fetch');
const { JSDOM } = require('jsdom');
const { URLSearchParams } = require('url');

const { SEARCH_URL, SEARCH_PAGE_URL, HIRAGANA, KATAKANA } = require('../constants');
const { saveData } = require('../utils');

Promise.all([
  ...HIRAGANA.map(search),
  ...KATAKANA.map(search),
]);
// search(HIRAGANA[0]);

function search(query) {
  const params = new URLSearchParams();

  params.append('search_query', query);
  params.append('post', 'dictionary_reference');
  // starts with
  params.append('match_type', 'starts');
  // only 20,000 most commonly-used
  params.append('common', true);

  fetchData(params)
    .then(html => new JSDOM(html))
    .then(({ window }) => parseData(window.document))
    .then((data) => {
      saveData(`${query}.json`, data);
    });
}

function parseData(document) {
  const $pages = document.querySelectorAll('.r101-pagination--a__item');

  return Promise.all(Array.from($pages).map((_, i) => getNextPage(i + 2)))
    .then((resp) => {
      const $elems = resp
        .map(({ window }) => window.document.querySelectorAll('.dc-result-row'))
        .reduce(
          (acc, cur) => acc.concat(Array.from(cur)),
          Array.from(document.querySelectorAll('.dc-result-row'))
        );

      const results = $elems
        .map(($elem) => {
          const word = $elem.querySelector('.dc-vocab').textContent;
          const audio = $elem.querySelector('.di-player audio source').src;
          const ja = $elem.querySelector('.dc-vocab_kana').textContent;
          const en = $elem.querySelector('.dc-english').textContent;
      
          return {
            word,
            audio,
            ja,
            en,
          };
        });

      return results;
    })
}

function getNextPage(page) {
  const url = `${SEARCH_PAGE_URL}/${page}`;
  const payload = {
    method: 'GET',
    headers: {
      cookie: 'PHPSESSID=ckod93caa57iv4quked2b2kvv6'
    },
  };

  return fetch(url, payload)
    .then(res => res.text())
    .then(html => new JSDOM(html));
}

function fetchData(params) {
  const url = SEARCH_URL;
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params,
  }

  return fetch(url, payload)
    .then(res => res.text())
}