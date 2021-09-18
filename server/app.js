const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

//Routes
const authRoutes = require("./api/routes/auth.route");
const employeeRoutes = require("./api/routes/employee.route");
const customerRoutes = require("./api/routes/customer.route");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

//DB Connection
mongoose.connect("mongodb://localhost:27017/sak_distributors", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
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

app.use("/auth", authRoutes);
app.use("/employees", employeeRoutes);
app.use("/customers", customerRoutes);

module.exports = app;