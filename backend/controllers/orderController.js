import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import nodemailer from "nodemailer";
import TelegramBot from 'node-telegram-bot-api';


// Function to send email notification
const sendEmailNotification = async (order) => {
    try {
        // Create a transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Your Gmail address
                pass: process.env.EMAIL_PASSWORD // Your Gmail password or app password
            }
        });

        // Format order items for email
        const itemsList = order.items.map(item =>
            `${item.name} (Size: ${item.size}) x ${item.quantity}`
        ).join('<br>');

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL,
            subject: `New Order Received - Order #${order._id}`,
            html: `
                <h2>New Order Received</h2>
                <p><strong>Order ID:</strong> ${order._id}</p>
                <p><strong>Date:</strong> ${new Date(order.date).toLocaleString()}</p>
                <p><strong>Customer:</strong> ${order.address.firstName} ${order.address.lastName}</p>
                <p><strong>Amount:</strong> $${order.amount}</p>
                <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
                <h3>Items:</h3>
                <p>${itemsList}</p>
                <h3>Shipping Address:</h3>
                <p>${order.address.street}, ${order.address.city}, ${order.address.country}</p>
                <p>Phone: ${order.address.phone}</p>
                <p>Please log in to the admin panel to process this order.</p>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);
        console.log('Order notification email sent successfully');
    } catch (error) {
        console.error('Error sending email notification:', error);
    }
};


// Function to send Telegram notification
// const sendTelegramNotification = async (order) => {
//     try {
//         // Create a bot instance
//         const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });
//         const chatId = process.env.TELEGRAM_CHAT_ID;

//         // Debug logs
//         console.log('Attempting to send Telegram notification');
//         console.log('Bot token length:', process.env.TELEGRAM_BOT_TOKEN?.length);
//         console.log('Chat ID:', process.env.TELEGRAM_CHAT_ID);

//         // Format order items for message
//         const itemsList = order.items.map(item =>
//             `- ${item.name} (Size: ${item.size}) x ${item.quantity}`
//         ).join('\n');

//         // Create message
//         const message = `
// 🛍️ *NEW ORDER RECEIVED* 🛍️

// *Order ID:* ${order._id}
// *Date:* ${new Date(order.date).toLocaleString()}
// *Customer:* ${order.address.firstName} ${order.address.lastName}
// *Amount:* $${order.amount}
// *Payment Method:* ${order.paymentMethod}

// *Items:*
// ${itemsList}

// *Shipping Address:*
// ${order.address.street}, ${order.address.city}, ${order.address.country}
// *Phone:* ${order.address.phone}

// Please log in to the admin panel to process this order.
// `;

//         // Send message
//         await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
//         console.log('Telegram notification sent successfully');
//     } catch (error) {
//         console.error('Error sending Telegram notification:', error);
//         console.error('Error details:', error.message);
//     }
// };

// Alternative function using fetch instead of the Telegram bot library
const sendTelegramNotification = async (order) => {
    try {
        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;
        
        // Format message
        const itemsList = order.items.map(item => 
            `- ${item.name} (Size: ${item.size}) x ${item.quantity}`
        ).join('\n');

        //         // Debug logs
        console.log('Attempting to send Telegram notification');
        console.log('Bot token length:', process.env.TELEGRAM_BOT_TOKEN?.length);
        console.log('Chat ID:', process.env.TELEGRAM_CHAT_ID);

        
        const text = `
NEW ORDER RECEIVED

Order ID: ${order._id}
Date: ${new Date(order.date).toLocaleString()}
Customer: ${order.address.firstName} ${order.address.lastName}
Amount: $${order.amount}
Payment Method: ${order.paymentMethod}

Items:
${itemsList}

Shipping Address:
${order.address.street}, ${order.address.city}, ${order.address.country}
Phone: ${order.address.phone}
`;

        // Use fetch API instead of the bot library
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: text
            }),
            timeout: 8000
        });
        
        if (!response.ok) {
            throw new Error(`Telegram API error: ${response.status}`);
        }
        
        console.log('Telegram notification sent successfully via fetch');
    } catch (error) {
        console.error('Error sending Telegram notification:', error.message);
    }
};

// Placing orders using COD Method
const placeOrder = async (req, res) => {

    try {

        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        // Send notification email after order is placed
        // await sendEmailNotification(newOrder);

        // Send Telegram notification
        await sendTelegramNotification(newOrder);


        res.json({ success: true, message: "Order Placed" })


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// All Orders data for Admin Panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// User Order Data For Forntend
const userOrders = async (req, res) => {
    try {

        const { userId } = req.body

        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// update order status from Admin Panel
const updateStatus = async (req, res) => {
    try {

        const { orderId, status } = req.body

        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: 'Status Updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const updatePaymentStatus = async (req, res) => {
    try {
        const { orderId, payment } = req.body;

        if (!orderId) {
            return res.json({ success: false, message: 'Order ID is required' });
        }

        const order = await orderModel.findById(orderId);

        if (!order) {
            return res.json({ success: false, message: 'Order not found' });
        }

        // Update payment status
        order.payment = payment;
        await order.save();

        return res.json({
            success: true,
            message: `Payment status updated to ${payment ? 'paid' : 'pending'}`
        });
    } catch (error) {
        console.error('Error updating payment status:', error);
        return res.json({ success: false, message: error.message });
    }
};

export { placeOrder, allOrders, userOrders, updateStatus, updatePaymentStatus }