import React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.scss';

import Login from '../pages/LoginPage/Login';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';

//Distributor
import ChangePassword from '../pages/Distributor/ChangePassword';
import Dashboard from '../pages/Distributor/Dashboard';
import SalesRepresentativeAnalytics from '../pages/Distributor/SalesRepresentativeAnalytics';
import SalesReport from '../pages/Distributor/SalesReport';

//HR
import ManageAdmin from '../pages/HR/ManageAdmin';
import ManageEmployee from '../pages/HR/ManageEmployee';

//Manager
import ManageCustomer from '../pages/Manager/ManageCustomer';
import ManageProduct from '../pages/Manager/ManageProduct';
import ManageSupplier from '../pages/Manager/ManageSupplier';
import OrderHistory from '../pages/Manager/OrderHistory';

//Purchasing Manager
import ManagePurchaseOrder from '../pages/PurchasingManager/ManagePurchaseOrder';
import ManageQuotations from '../pages/PurchasingManager/ManageQuotations';
import ManageSales from '../pages/PurchasingManager/ManageSales';
import SalesTrendAnalytics from '../pages/PurchasingManager/SalesTrendAnalytics';
import SupplierPayment from '../pages/PurchasingManager/SupplierPayment';

//Store Keeper
import ManageGRN from '../pages/StoreKeeper/ManageGRN';
import ManageGIN from '../pages/StoreKeeper/ManageGIN';
import ManageStore from '../pages/StoreKeeper/ManageStore';

//Sales Representative
import SalesAndInvoice from '../pages/SalesRepresentative/SalesAndInvoice';

const theme = createTheme({
  palette: {
    primary: {
      main: '#20369f'
    },
    secondary: {
      main: '#323232'
    },
    neutral: {
      main: '#ACA9BB',
    },
    warning: {
      main: '#f44336',
    },
    success: {
      main: '#4caf50',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Poppins", sans-serif',
    fontSize: 12
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      {
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/forgot-password' component={ForgotPassword} />
            <Route exact path='/change-password' component={ChangePassword} />
            <Route exact path='/sales-report' component={SalesReport} />
            <Route exact path='/sales-representative-analytics' component={SalesRepresentativeAnalytics} />
            <Route exact path='/sales-trend-analytics' component={SalesTrendAnalytics} />

            {/* Distributor */}
            <Route exact path='/distributor/dashboard' component={Dashboard} />
            <Route exact path='/distributor/manage-purchase-orders' component={ManagePurchaseOrder} />

            {/* Human Resources */}
            <Route exact path='/human-resources/dashboard' component={Dashboard} />
            <Route exact path='/human-resources/manage-admin' component={ManageAdmin} />
            <Route exact path='/human-resources/manage-employee' component={ManageEmployee} />

            {/* Manager */}
            <Route exact path='/manager/dashboard' component={Dashboard} />
            <Route exact path='/manager/manage-suppliers' component={ManageSupplier} />
            <Route exact path='/manager/manage-products' component={ManageProduct} />
            <Route exact path='/manager/manage-customers' component={ManageCustomer} />
            <Route exact path='/manager/order-history' component={OrderHistory} />

            {/* Purchasing Manager */}
            <Route exact path='/purchasing-manager/dashboard' component={Dashboard} />
            <Route exact path='/purchasing-manager/manage-products' component={ManageProduct} />
            <Route exact path='/purchasing-manager/manage-sales' component={ManageSales} />
            <Route exact path='/purchasing-manager/manage-purchase-orders' component={ManagePurchaseOrder} />
            <Route exact path='/purchasing-manager/manage-quotations' component={ManageQuotations} />
            <Route exact path='/purchasing-manager/supplier-payment' component={SupplierPayment} />

            {/* Store Keeper */}
            <Route exact path='/store-keeper/dashboard' component={Dashboard} />
            <Route exact path='/store-keeper/manage-grn' component={ManageGRN} />
            <Route exact path='/store-keeper/manage-gin' component={ManageGIN} />
            <Route exact path='/store-keeper/manage-store' component={ManageStore} />
            <Route exact path='/store-keeper/manage-products' component={ManageProduct} />

            {/* Sales Representative */}
            <Route exact path='/sales-representative/dashboard' component={Dashboard} />
            <Route exact path='/sales-representative/manage-customers' component={ManageCustomer} />
            <Route exact path='/sales-representative/sales-and-invoice' component={SalesAndInvoice} />
          </Switch>
        </BrowserRouter>
      }
    </ThemeProvider>
  );
}

export default App;