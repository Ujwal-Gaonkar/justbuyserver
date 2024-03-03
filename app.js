const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const errorMiddleware = require("./middleware/error");
const cors = require('cors');
//config
  require("dotenv").config({ path: "config/config.env" });

app.use(express.json());
app.use(cors({
  origin: 'https://justbuyco.netlify.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
//Route imports

const product=require("./routes/productRoute");

const user = require("./routes/userRoute");

const order = require("./routes/orderRoute");

const payment = require("./routes/paymentRoute");

app.use("/api/v1",product);

app.use("/api/v1",user)

app.use("/api/v1",order);

app.use("/api/v1", payment);

//Middleware for Errors
app.use(errorMiddleware);

module.exports = app