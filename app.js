const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const speedTestRoutes = require('./routes/speed-test');

const app = express();

app.use(bodyParser.json());
app.get('/', speedTestRoutes);
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    message: error.message,
    data: error.data,
  });
});

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => {
    app.listen(process.env.SERVER_PORT);
  })
  .catch((err) => console.log(err));
