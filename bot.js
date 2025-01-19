const TelegramBot = require('node-telegram-bot-api');
const { Configuration, OpenAIApi } = require('openai');
const TELEGRAM_BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';
const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY';
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
async function getAIResponse(message) {
  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: message,
      max_tokens: 100,
    });
    return completion.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error getting AI response:', error);
    return 'Sorry, something went wrong. Please try again later.';
  }
}

// Handle incoming messages
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const message = msg.text;

  // Get AI response
  const aiResponse = await getAIResponse(message);

  // Send AI response back to the user
  bot.sendMessage(chatId, aiResponse);
});

console.log('Bot is running...');
