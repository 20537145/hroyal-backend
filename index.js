const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use('/uploads', express.static('uploads'));
app.use(cors());

const userRouter = require('./routes/userRoute');
const productSchema = require('./routes/ProductRoute');



app.use(express.json());

// Connect to MongoDB with the correct connection URL and options
mongoose.connect('mongodb+srv://ahmedcherif19x:123@cluster0.di7vh4t.mongodb.net/hroyal');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const PORT = 6010;
app.listen(PORT, () => {
  console.log('The server is running on port ', PORT);
});

app.use('/', userRouter);
app.use('/products', productSchema);
