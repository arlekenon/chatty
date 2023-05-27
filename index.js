const TelegramApi = require('node-telegram-bot-api')
//const OpenAiApi = require('openai')
const {addtOptions,nastOptions, roleOptions, vibeOptions,persOptions, numbOptions, againOptions, keyOptions, iionkeyOptions,
    addvOptions
} = require('./poptions')
const {vozm, surp} =require('./infofile')
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const openai = require('./openai/getAnswer')
var chatgpt = false

const chatsroles = {}
const chatsnasts = {}

const bot = new TelegramApi(process.env.TG_API_KEY, {polling: true})
//const openai = OpenAiApi
//openai.api_key = OAI_API_KEY



const startGame = async(chatId) => {
    await bot.sendMessage(chatId, `Клавиатура`, numbOptions);
}

const rolefunction = async(roleprompt) => {
    const roleprompton = roleprompt
    console.log(roleprompton)
}
const start = (roleprompton) => {
    bot.setMyCommands([
        {command:'/start', description: 'Начальное приветствие'},
        {command:'/info', description: 'Информация о боте'},
        {command:'/on', description: 'Включить ChatGPT'},
        {command:'/off', description: 'Выключить ChatGPT'},
        //{command:'/numboard', description: 'Клавиатура'},
    ])


    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text === '/start') {
            await bot.sendSticker(chatId, `https://tlgrm.ru/_/stickers/348/e30/348e3088-126b-4939-b317-e9036499c515/1.webp`);
            return bot.sendMessage(chatId, `Добро пожаловать в телеграм ChatGPT бот!`, keyOptions);
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`);

        }
        if (text === '/off') {
            chatgpt = false
            return bot.sendMessage(chatId, `ChatGPT выключен.`);
        }

        if (text === 'Выключить ChatGPT') {
            chatgpt = false
            return bot.sendMessage(chatId, `ChatGPT выключен, можешь занятся настройками.`, keyOptions);
        }

        if (chatgpt === true) {
            const content = chatsroles[chatId] + chatsnasts[chatId] + text
            console.log(content);
            return openai.getAnswer(chatId, content, bot)
        }

        if (text === '/on') {
            chatgpt = true
            return bot.sendMessage(chatId, `ChatGPT включён.`);
        }



        if (text === 'Начать чат💭') {
            chatgpt = true
            return bot.sendMessage(chatId, `🔥 Чтобы начать общение, просто напиши что-нибудь в строку ниже 👇🏻 Не стесняйся, я не кусаюсь... в основном.`, iionkeyOptions);
        }

        if (text === 'Выбрать персонажа😜') {
            return bot.sendMessage(chatId, `Выбери персонажа`, persOptions);
        }

        if (text === 'Выбрать настроение🧐') {
            return bot.sendMessage(chatId, `Выбери настроение персонажа`, vibeOptions);
        }

        if (text === 'Возможности💫') {
            return bot.sendMessage(chatId, vozm, keyOptions);
        }

        if (text === 'Сюрприз🎁') {
            return bot.sendMessage(chatId, surp, keyOptions);
        }

        if (text === 'Продвинутые настройки🗝') {
            return bot.sendMessage(chatId, `Продвинутые настройки доступны премиум пользователем`, keyOptions);
        }

        if (text === 'О боте ❤') {
            return bot.sendMessage(chatId, `ChatGPT бот - общайся, твари, играй!`, keyOptions);
        }
        if (text === 'Подключить премиум💎') {
            return bot.sendMessage(chatId, `Ваша заявка принята, с вами свяжится админ!`, keyOptions);
        }

        return bot.sendMessage(chatId, `Ты написал мне ${text}`)
    })

    bot.on ('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        //console.log(roleOptions[data]);
        //console.log(nastOptions[data]);

        if (chatgpt === true) {
            console.log(data)
            const promptadd = addtOptions[data]
            console.log(promptadd)
            //await bot.sendMessage(chatId, `${promptadd}`)
            //await bot.sendMessage(chatId, `${data}`)
            const lustcont = openai.chatslastcont[chatId]
            const content = lustcont + promptadd
            console.log(content);
            return openai.getAnswer(chatId, content, bot)
        }

        if(data === '/again'){
            return startGame(chatId)
     }
        if(roleOptions[data] != undefined){
            chatsroles[chatId] = roleOptions[data]
            console.log(chatsroles[chatId]);
            return bot.sendMessage(chatId, `Ты выбрал ${data}`, keyOptions)
        }
        if(nastOptions[data] != undefined){
            chatsnasts[chatId] = nastOptions[data]
            console.log(chatsnasts[chatId]);
            return bot.sendMessage(chatId, `Ты выбрал ${data}`, keyOptions)
        }

        return bot.sendMessage(chatId, `Ты выбрал ${data}`, keyOptions)
    })

    bot.on ('voice', async msg => {
        try {
            const chatId = msg.chat.id;
            const link = await bot.getFileLink(msg.voice.file_id)
            return bot.sendMessage(chatId, `Ссылка ${link}`, keyOptions)
        } catch (e) {
            return bot.sendMessage(chatId, `Ошибка ${e}`, keyOptions)
        }
    })

}

start()
