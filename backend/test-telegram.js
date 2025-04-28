// import TelegramBot from 'node-telegram-bot-api';
// import dotenv from 'dotenv';

// dotenv.config();

// const testTelegramBot = async () => {
//   try {
//     const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });
//     const chatId = process.env.TELEGRAM_CHAT_ID;
    
//     console.log('Bot token length:', process.env.TELEGRAM_BOT_TOKEN?.length);
//     console.log('Chat ID:', process.env.TELEGRAM_CHAT_ID);
    
//     const message = 'This is a test message from your e-commerce app!';
    
//     await bot.sendMessage(chatId, message);
//     console.log('Test message sent successfully!');
//   } catch (error) {
//     console.error('Error sending test message:', error.message);
//   }
// };

// testTelegramBot();



import dotenv from 'dotenv';
import fetch from 'node-fetch'; // You may need to install this: npm install node-fetch

dotenv.config();

const testTelegramBot = async () => {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    
    console.log('Bot token length:', botToken?.length);
    console.log('Chat ID:', chatId);
    
    const message = 'This is a test message from your e-commerce app using fetch API!';
    
    // Use fetch API to send the message
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message
      })
    });
    
    if (!response.ok) {
      throw new Error(`Telegram API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Test message sent successfully!');
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error sending test message:', error.message);
  }
};

testTelegramBot();