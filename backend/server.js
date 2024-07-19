const express = require('express')
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const errorHandler = require('./middleware/errorHandler');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const countryRouter = require('./routes/country');
const placeRouter = require('./routes/place');
const hotelRouter = require('./routes/hotel');
const reviewRouter = require('./routes/review');
const verifyRouter = require('./routes/verify');
const app = express()
const port = 5080

dotenv.config()


mongoose.connect(process.env.MONGODB)
.then(() => console.log("database connected"))
.catch((error) => console.log(error))

app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({limit: "10mb", extended: true}))

app.use(errorHandler);
app.use('/api/' , authRouter);
app.use('/api/users', userRouter);
app.use('/api/countries', countryRouter);
app.use('/api/places', placeRouter);
app.use('/api/hotels', hotelRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/code', verifyRouter);

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(process.env.PORT || port, () => console.log(`app listening on port ${process.env.PORT}!`))