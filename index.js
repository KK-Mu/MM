const express = require('express');
const { Client, middleware } = require('@line/bot-sdk');

// �]�w Line bot �t�m
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
};
const app = express();
const client = new Client(config);

// �]�w Webhook ����
app.post('/webhook', middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then(result => res.json(result))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
});

function handleEvent(event) {
  if (event.type === 'message' && event.message.type === 'text') {
    const message = {
      type: 'text',
      text: `����z���T���G${event.message.text}`
    };
    return client.replyMessage(event.replyToken, message);
  }
  return Promise.resolve(null);
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`���A���w�b http://localhost:${port} �W�B��`);
});