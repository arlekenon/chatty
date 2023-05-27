const axios = require('axios');
const dotenv = require("dotenv");
dotenv.config();
const {addvOptions} = require('../options')

const chatslastcont = {}
async function getAnswer (chatId, content, bot)  {

    const openai = axios.create({
        baseURL: "https://api.openai.com/v1/",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        },
    });

    const data = {
        model: "gpt-3.5-turbo",
        messages: [{
            role: "user",
            content: content
        }],
    }

    await openai.post("/chat/completions", data)
        .then(response => {
            console.log(response.data.choices[0].message.content);
            chatslastcont[chatId] = response.data.choices[0].message.content
            return  bot.sendMessage(chatId, `${response.data.choices[0].message.content}`,addvOptions);
        })
        .catch(error => {
            console.log(error);
            return bot.sendMessage(chatId, `${error}`);
        });
}

module.exports = {getAnswer, chatslastcont}