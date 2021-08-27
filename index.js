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
const start = () => {
    bot.setMyCommands( [
        {command: '/start', description : 'Начальное приветствие'},
        {command: '/info', description: 'Информация о пользователе'},
        {command: '/functions', description: 'Функции бота'}
    ]);
    bot.on('message', (msg) =>{
        const text = msg.text;
        const chatId = msg.chat.id; //получаем идентификатор диалога, чтобы отвечать именно тому пользователю, который нам что-то прислал
    
        if(text === '/start'){
            // отправляем сообщение
            bot.sendMessage(chatId, 'Добро пожаловать, я личный бот величайшего программиста сэра @ivanidze14');
            return bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/5d3/60d/5d360d48-7760-3804-9cd9-6c8e5cda6cb1/12.webp');
        }
        if(text === '/info'){
            // отправляем сообщение
            return bot.sendMessage(chatId, `Вас зовут ${msg.from.first_name}`);
        }
        if(text === '/functions'){
            const chatId = msg.chat.id; //получаем идентификатор диалога, чтобы отвечать именно тому пользователю, который нам что-то прислал
              
            // отправляем сообщение
            bot.sendMessage(chatId, 'Привет, Друг! чего хочешь?', { // прикрутим клаву
                 reply_markup: {
                     inline_keyboard: keyboard
                }
            });
            
            return bot.on('callback_query', (query) => {
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
    
                } 
            });
        } 
        else {
            return bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/404/da2/404da2f2-bf31-485c-a11a-9f9774f546e1/1.webp');
        }
        
    });
}

start();
