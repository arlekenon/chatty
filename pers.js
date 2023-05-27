const axios = require("axios");

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
            return  bot.sendMessage(chatId, `${response.data.choices[0].message.content}`);
        })
        .catch(error => {
            console.log(error);
            return bot.sendMessage(chatId, `${error}`);
        });
}

module.exports = {getAnswer}

roleOptions: {
    '':'',
        'Обычный':'',
        'Фитнес тренер':'Представь что ты фитнес тренер',
        'Учитель':'Представь что ты учитель',
        'Весельчак':'Представь что ты развлекательный собеседник',
        'Виртуальный гид':'Представь что ты виртуальный гид',
        'Консультант':'Представь что ты консультант'
},