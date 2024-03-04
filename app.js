const express = require('express');
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const {body} = require('express-validator')
const mongoose = require('mongoose')
const cookieParser= require('cookie-parser')
// les routes 
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const categoryRouter = require('./routes/category');
const productRouter = require('./routes/product')


const app = express();
app.use(bodyParser.json());// pour convirtire le body en JSON 
app.use(bodyParser.urlencoded({ extended: true }))// pour lire data se forme de key value

require('dotenv').config();
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'uploads')))

mongoose.set("strictQuery", true);
// app.use(express.json()); 
// app.use(express.urlencoded()); 
mongoose.connect(process.env.DATABASE_CONNECT,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{console.log('DATA BASE EST BIEN CONNCTE')}).catch((exception)=>{console.error(exception)})

//middlewares

app.use('/auth',authRouter);
app.use('/user',userRouter);
app.use('/category',categoryRouter);
app.use('/product',productRouter);




const port = process.env.PORT || 3500;
app.listen(port,()=>{console.log(`app is running on port ${port}`)})