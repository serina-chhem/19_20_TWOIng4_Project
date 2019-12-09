var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require('mongoose');
var router = express.Router();

const bodyParser = require('body-parser');

const cors = require('cors');
const PORT = 4000;

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/User");
const adminRouter = require("./routes/admin");


var app = express();


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use("/", indexRouter);

mongoose.connect('mongodb://127.0.0.1:27017/DashboardProject', { useNewUrlParser: true } );
const connection = mongoose.connection;
connection.once('open', function() {
	console.log("MongoDB database connection established successfully");
})


app.use("/admin", adminRouter);
app.use("/User", usersRouter);



app.use(bodyParser.json());

app.listen(PORT, function() {
	console.log("Server is running on Port: " + PORT);
});





module.exports = app;
