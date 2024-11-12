const express = require('express');
const { Client, middleware } = require('@line/bot-sdk');

// �]�w Line bot �t�m
const config = {
  channelAccessToken: 'buH9bAFQTIazgCKVvaVD/mZB6cDs18oya4snMtGbESBTcVooTwgRv1o8DgALjFmGCUkXPyJ6jMcTVMEenysQNo+dF1IqQK7SSfMs6O1Y7Rb1BXtFiCvYXWtLv6ntflf5K7BOQk3F5Omq/130Yyky2wdB04t89/1O/w1cDnyilFU=',
  channelSecret: '82e14fdf9c538db469810c6915c6cd51'
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