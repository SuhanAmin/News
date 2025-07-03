const express = require('express')
const app=express();
const cors=require('cors')
const cookieParser = require('cookie-parser');
app.use(cookieParser());
require('dotenv').config()
const port=process.env.PORT || 3000;
const mongoose=require('mongoose')
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

app.use(cors({
  origin:"https://news-frontend-uksv.onrender.com",
  credentials:true
}
))

app.use(express.urlencoded({extended:true,limit: '10mb' }))
app.use(express.json({ limit: '10mb' }))

app.use('/uploads',express.static('public/uploads'))

const authroutes=require('./routes/auth');


app.use('/api/auth',authroutes)

app.listen(port)
