import React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.scss';

//Development Stage
import Page from '../shared/Page/Page.js';

import Login from '../pages/LoginPage/Login';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
import ChangePassword from '../pages/Distributor/ChangePassword';
import SalesRepresentativeAnalytics from '../pages/SalesRepresentativeAnalytics/SalesRepresentativeAnalytics';
import SalesReport from '../pages/SalesReport/SalesReport';

//Distributor
import DistributorDashboard from '../pages/Distributor/Dashboard';

//HR
import HRDashboard from '../pages/HR/Dashboard';
import ManageAdmin from '../pages/HR/ManageAdmin';
import ManageEmployee from '../pages/HR/ManageEmployee';

//Manager
import ManagerDashboard from '../pages/Manager/Dashboard';
import ManageCustomer from '../pages/Manager/ManageCustomer';
import ManagerManageProduct from '../pages/Manager/ManageProduct';
import ManageSupplier from '../pages/Manager/ManageSupplier';
import OrderHistory from '../pages/Manager/OrderHistory';

//Purchasing Manager
import PurchasingManagerDashboard from '../pages/PurchasingManager/Dashboard';
import PurchasingManagerManageProduct from '../pages/PurchasingManager/ManageProduct';
import ManagePOQuotation from '../pages/PurchasingManager/ManagePOQuotation';
import ManageSales from '../pages/PurchasingManager/ManageSales';
import SalesTrendAnalytics from '../pages/PurchasingManager/SalesTrendAnalytics';
import SupplierPayment from '../pages/PurchasingManager/SupplierPayment';

//Store Keeper
import StoreKeeperDashboard from '../pages/StoreKeeper/Dashboard';
import GRNGIN from '../pages/StoreKeeper/GRNGIN';
import StoreKeeperManageProduct from '../pages/StoreKeeper/ManageProduct';

//Sales Representative
import SalesRepresentativeDashboard from '../pages/SalesRepresentative/Dashboard';
import PersonalOrderHistory from '../pages/SalesRepresentative/PersonalOrderHistory';
import SalesAndInvoice from '../pages/SalesRepresentative/SalesAndInvoice';
import SalesRepresentativeManageCustomer from '../pages/SalesRepresentative/ManageCustomer';


const theme = createTheme({
  palette: {
    primary: {
      main: '#20369f'
    },
    secondary: {
      main: '#000b4f'
    },
    warning: {
      main: '#f44336',
    },
    success: {
      main: '#4caf50',
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
    fontSize: 12
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      {
        <BrowserRouter>
          <Switch>
            <Route exact path='/page' component={Page} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/forgot-password' component={ForgotPassword} />
            <Route exact path='/change-password' component={ChangePassword} />
            <Route exact path='/sales-report' component={SalesReport} />
            <Route exact path='/sales-representative-analytics' component={SalesRepresentativeAnalytics} />
            <Route exact path='/sales-trend-analytics' component={SalesTrendAnalytics} />

            {/* Distributor */}
            <Route exact path='/distributor/dashboard' component={DistributorDashboard} />

            {/* Human Resources */}
            <Route exact path='/human-resources/dashboard' component={HRDashboard} />
            <Route exact path='/human-resources/manage-admin' component={ManageAdmin} />
            <Route exact path='/human-resources/manage-employee' component={ManageEmployee} />

            {/* Manager */}
            <Route exact path='/manager/dashboard' component={ManagerDashboard} />
            <Route exact path='/manager/manage-supplier' component={ManageSupplier} />
            <Route exact path='/manager/manage-product' component={ManagerManageProduct} />
            <Route exact path='/manager/manage-customer' component={ManageCustomer} />
            <Route exact path='/manager/order-history' component={OrderHistory} />

            {/* Purchasing Manager */}
            <Route exact path='/purchasing-manager/dashboard' component={PurchasingManagerDashboard} />
            <Route exact path='/purchasing-manager/manage-product' component={PurchasingManagerManageProduct} />
            <Route exact path='/purchasing-manager/manage-sales' component={ManageSales} />
            <Route exact path='/purchasing-manager/manage-po-quotation' component={ManagePOQuotation} />
            <Route exact path='/purchasing-manager/supplier-payment' component={SupplierPayment} />

            {/* Store Keeper */}
            <Route exact path='/store-keeper/dashboard' component={StoreKeeperDashboard} />
            <Route exact path='/store-keeper/grn-gin' component={GRNGIN} />
            <Route exact path='/store-keeper/manage-products' component={StoreKeeperManageProduct} />

            {/* Sales Representative */}
            <Route exact path='/sales-representative/dashboard' component={SalesRepresentativeDashboard} />
            <Route exact path='/sales-representative/manage-customers' component={SalesRepresentativeManageCustomer} />
            <Route exact path='/sales-representative/personal-order-history' component={PersonalOrderHistory} />
            <Route exact path='/sales-representative/sales-and-invoice' component={SalesAndInvoice} />
          </Switch>
        </BrowserRouter>
      }
    </ThemeProvider>
  );
}

export default App;