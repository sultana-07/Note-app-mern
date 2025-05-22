const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const express = require('express');
const createRouter = require('./routes/create-note');
const userRouter = require('./routes/user.router');
const app = express();
app.use(cors({
  origin : 'https://note-app07.netlify.app',
  credentials : true
}));
const connectDB = require('./db/db');
connectDB();


app.use(express.json());
app.use(express.urlencoded({extended : true}))

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/user",userRouter)
app.use("/note",createRouter)

module.exports = app;