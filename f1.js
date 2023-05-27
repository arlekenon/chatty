const {OAI_API_KEY} = require("./infofile");

async function createChatCompletion(chatId, content) {
    try {
        const openai = axios.create({
            baseURL: "https://api.openai.com/v1",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OAI_API_KEY}`,
            },
        });
        const response = await openai.post("/chat/completions", {
            model: "gpt-3.5-turbo",
            messages: [{
                role: "user",
                content: content
            }],
            options: [{
                temperature: 0.8,
                max_tokens: 100,
            }],
        });

        const datadd = await response.data.choices;

        console.log(choices[0].message);
        await bot.sendMessage(chatId, `Ответ - ERROR: ${choices[0].message}`);

    } catch (error) {
        console.error("Error creating chat completion:", error);
        await bot.sendMessage(chatId, `Ответ - ERROR: ${error}`);
    }
}


const startIi = async (chatId, content) => {
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{
                    role: "user",
                    content: content
                }],
            })
        })
        const data = await response.json()
        console.log(data)
        await bot.sendMessage(chatId, `${data.choices[0].message.content}`);
        console.log(data.choices[0].message)

    } catch (error) {
        const data = await response.json()
        console.log(data)
        await bot.sendMessage(chatId, `Ответ - ERROR: ${error}`);
    }
}


[{text: 'Меланхоличный стёб', callback_data:' Улучши текст, добавь меланхоличного стёба.'}],
// [{text: 'Острота', callback_data:' Улучши текст, добавь остроты.'}],
//[{text: 'Юмор', callback_data:' Улучши текст, добавь юмора.'}],
//[{text: 'Флирт', callback_data:' Улучши текст, добавь флирта.'}],
//[{text: 'Смайлики', callback_data:' Улучши текст, добавь смайликов.'}]

    limit: '20',
    lat: '52.2854834',
    lng: '104.28902219999999'


async function getCoins() {
    let coin = 0

    const coinSymbol = 'START'
    await minterNode.getCoinInfo(coin)
        .then((coinInfo) => {
            console.log(coinInfo.id, coinInfo.symbol);
            const coinSymbol = coinInfo.symbol
            coin++
        });

    while (coinSymbol != undefined) {
        await minterNode.getCoinInfo(coin)
            .then((coinInfo) => {
                console.log(coinInfo.id, coinInfo.symbol);
                const coinSymbol = coinInfo.symbol
                coin++
            });
    }
}

const dotenv = require("dotenv");
dotenv.config();

const axios = require('axios');

const openai = axios.create({
    baseURL: "https://api.openai.com/v1/",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.TG_API_KEY}`,
    },
});

module.exports = { openai }
