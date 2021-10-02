const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

//Routes
const authRoutes = require("./api/routes/auth.route");
const passwordRoutes = require("./api/routes/password.route");
const employeeRoutes = require("./api/routes/employee.route");
const customerRoutes = require("./api/routes/customer.route");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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
app.use("/password", passwordRoutes);
app.use("/employees", employeeRoutes);
app.use("/customers", customerRoutes);

module.exports = app;