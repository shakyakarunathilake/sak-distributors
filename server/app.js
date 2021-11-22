const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const checkAuth = require("./api/middleware/check.auth");

//Routes
const authRoutes = require("./api/routes/auth.route");
const passwordRoutes = require("./api/routes/password.route");
const employeeRoutes = require("./api/routes/employee.route");
const customerRoutes = require("./api/routes/customer.route");
const productRoutes = require("./api/routes/product.route");
const orderRoutes = require("./api/routes/order.route");
const optionRoutes = require("./api/routes/option.route");
const adminRoutes = require("./api/routes/admin.route");
const supplierRoutes = require("./api/routes/supplier.route");
const purchaseOrderRoutes = require("./api/routes/purchaseorder.route");
const grnRoutes = require("./api/routes/grn.route");

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
app.use("/password", passwordRoutes);
app.use("/employees", employeeRoutes);
app.use("/customers", customerRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/options", optionRoutes);
app.use("/admin", adminRoutes);
app.use("/suppliers", supplierRoutes);
app.use("/purchaseorder", purchaseOrderRoutes);
app.use("/grn", grnRoutes);

module.exports = app;