const { COLORS } = require('./constants');

const createButton = url => ({
  type: 'button',
  text: '🔊',
  url,
});

const createMessage = ({ vocabulary, example }) => {
  const title = `每日一字: ${vocabulary.word} ${vocabulary.type}`;
  const attachments = [
    {
      image_url: vocabulary.picture,
      color: COLORS.WORD,
      fallback: `${title} ${vocabulary.ja}`,
      title,
      fields: [
        {
          title: vocabulary.ja,
          value: vocabulary.en,
        },
      ],
      actions: [
        createButton(vocabulary.audio),
      ],
    },
  ];

  if (example.sentence) {
    attachments.push({
      color: COLORS.EXAMPLE,
      title: `Example: ${example.sentence}`,
      fields: [
        {
          title: example.ja,
          value: example.en,
        },
      ],
      actions: [
        createButton(example.audio),
      ],
    });
  };

  return JSON.stringify({ attachments });
};

const getDayOfYear = () => {
  const DAY_MS = 1000 * 60 * 60 * 24;
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);

  return Math.floor((now - start) / DAY_MS);
};

module.exports = {
  createMessage,
  getDayOfYear,
};