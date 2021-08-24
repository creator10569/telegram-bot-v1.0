const TelegramBot = require('node-telegram-bot-api');
const token = '1939366379:AAE023kVbFf1phQJLXOEpYDnmo4VthfZydk';
const bot = new TelegramBot(token, {polling: true});
const keyboard = [
    [
        {
            text:'хочу смешнявку',
            callback_data: 'memes'
        }
    ],
    [
        {
            text:'хочу пивасика',
            callback_data: 'pivasik'
        }
    ],
    [
        {
            text:'хочу в ютубчике позалипать',
            url:'https://www.youtube.com'
        }
    ]
];
bot.on('message', (msg) => {
    const chatId = msg.chat.id; //получаем идентификатор диалога, чтобы отвечать именно тому пользователю, который нам что-то прислал
  
    // отправляем сообщение
    bot.sendMessage(chatId, 'Привет, Друг! чего хочешь?', { // прикрутим клаву
          reply_markup: {
              inline_keyboard: keyboard
          }
      });
  });

bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;

    let img = '';

    if(query.data === 'memes') {
        img = 'meme.jpg';
    }

    if(query.data === 'pivasik') {
        img = 'piva.png';
    }

    if(img) {
        bot.sendPhoto(chatId, img, {
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    } else {
        bot.sendMessage(chatId, 'Не понял давай ещё раз', {
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    }
});
