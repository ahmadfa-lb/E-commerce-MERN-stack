import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

dotenv.config();

const testTelegramBot = async () => {
  try {
    const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });
    const chatId = process.env.TELEGRAM_CHAT_ID;
    
    console.log('Bot token length:', process.env.TELEGRAM_BOT_TOKEN?.length);
    console.log('Chat ID:', process.env.TELEGRAM_CHAT_ID);
    
    const message = 'hello mohamad jamil  i am  ahmad !';
    
    await bot.sendMessage(chatId, message);
    console.log('Test message sent successfully!');
  } catch (error) {
    console.error('Error sending test message:', error.message);
  }
};

testTelegramBot();