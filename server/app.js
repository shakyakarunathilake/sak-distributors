const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

//Routes
const userRoutes = require("./api/routes/user.route")
const employeeRoutes = require("./api/routes/employee.route")

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

//DB Connection
mongoose.connect("mongodb://localhost:27017/sak_distributors", { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Error:'));
db.once('open', () => {
    console.log("Successfully connected to MongoDB");
});


//Error Handling
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: "Server Error"
    });
});

app.use(express.static("uploads"));

app.use("/users", userRoutes);
app.use("/employees", employeeRoutes);

module.exports = app;