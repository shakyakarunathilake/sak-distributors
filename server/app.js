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
const ginRoutes = require("./api/routes/gin.route");
const metaDataRoutes = require("./api/routes/metadata.route");
const storeRoutes = require("./api/routes/store.route");
const quotationRoutes = require("./api/routes/quotation.route");
const supplierPaymentRoutes = require("./api/routes/supplierpayment.route");
const vehicleRoutes = require("./api/routes/vehicle.route");
const routeRoutes = require("./api/routes/routes.route");
const totalSalesRoutes = require("./api/routes/totalsales.route");
const salesPerCustomerRoutes = require("./api/routes/salespercustomer.route");
const salesPerRouteRoutes = require("./api/routes/salesperroute.route");
const salesPerSalesRepresentativeRoutes = require("./api/routes/salespersalesrepresentative.route");


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

app.use("/password", checkAuth, passwordRoutes);
app.use("/employees", checkAuth, employeeRoutes);
app.use("/customers", checkAuth, customerRoutes);
app.use("/products", checkAuth, productRoutes);
app.use("/orders", checkAuth, orderRoutes);
app.use("/options", checkAuth, optionRoutes);
app.use("/admin", checkAuth, adminRoutes);
app.use("/suppliers", checkAuth, supplierRoutes);
app.use("/purchaseorder", checkAuth, purchaseOrderRoutes);
app.use("/grn", checkAuth, grnRoutes);
app.use("/gin", checkAuth, ginRoutes);
app.use("/store", checkAuth, storeRoutes);
// app.use("/metadata", checkAuth, metaDataRoutes);
app.use("/quotations", checkAuth, quotationRoutes);
app.use("/supplier-payments", checkAuth, supplierPaymentRoutes);
app.use("/vehicles", checkAuth, vehicleRoutes);
app.use("/routes", checkAuth, routeRoutes);
app.use("/total-sales", checkAuth, totalSalesRoutes);
app.use("/sales-per-customer", checkAuth, salesPerCustomerRoutes);
app.use("/sales-per-route", checkAuth, salesPerRouteRoutes);
app.use("/sales-per-sales-representative", checkAuth, salesPerSalesRepresentativeRoutes);

app.use("/metadata",  metaDataRoutes);

module.exports = app;