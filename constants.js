const BASE_URL = 'https://www.japanesepod101.com';
const PAGE_COUNT = 5;
const TOP_100_URL = `${BASE_URL}/japanese-word-lists`;
const SEARCH_URL = `${BASE_URL}/learningcenter/reference/dictionary_post`;
const SEARCH_PAGE_URL = `${BASE_URL}/learningcenter/reference/offsetdictionary`;

// 平假名 ひらがな
const HIRAGANA = [
  'あ', 'い', 'う', 'え', 'お',
  'か', 'き', 'く', 'け', 'こ',
  'さ', 'し', 'す', 'せ', 'そ',
  'た', 'ち', 'つ', 'て', 'と',
  'な', 'に', 'ぬ', 'ね', 'の',
  'は', 'ひ', 'ふ', 'へ', 'ほ',
  'ま', 'み', 'む', 'め', 'も',
  'や',       'ゆ',      'よ',
  'ら', 'り', 'る', 'れ', 'ろ',
  'わ',                  'を',
  'ん',
];

// 片假名 カタカナ
const KATAKANA = [
  'ア', 'イ', 'ウ', 'エ', 'オ',
  'カ', 'キ', 'ク', 'ケ', 'コ',
  'サ', 'シ', 'ス', 'セ', 'ソ',
  'タ', 'チ', 'ツ', 'テ', 'ト',
  'ナ', 'ニ', 'ヌ', 'ネ', 'ノ',
  'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
  'マ', 'ミ', 'ム', 'メ', 'モ',
  'ヤ',       'ユ',      'ヨ',
  'ラ', 'リ', 'ル', 'レ', 'ロ',
  'ワ',                  'ヲ',
  'ン',
];

module.exports = {
  BASE_URL,
  PAGE_COUNT,
  TOP_100_URL,
  SEARCH_URL,
  SEARCH_PAGE_URL,
  HIRAGANA,
  KATAKANA
};