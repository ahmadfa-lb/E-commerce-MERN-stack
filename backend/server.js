import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
// import initializeFirebase from './config/firebase.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import contactRoutes from './routes/contactRoutes.js';
import adminRouter from './routes/adminRoute.js'
import websiteReviewRouter from './routes/websiteReviewRoute.js';


// App Config
const app = express()
const port = process.env.PORT || 4000
connectDB()
// initializeFirebase()

// middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRouter)
app.use('/api/reviews', websiteReviewRouter);

app.get('/', (req, res) => {
    res.send("API Working")
})

app.listen(port, () => console.log('Server started on PORT : ' + port))