import React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.scss';

//Development Stage
import Page from '../shared/Page/Page.js';

import Login from '../pages/LoginPage/Login';
import Dashboard from '../pages/Distributor/Dashboard';
import ChangePassword from '../pages/Distributor/ChangePassword';

//Distributor
import SalesReport from '../pages/Distributor/SalesReport';
import SalesRepresentativeAnalytics from '../pages/Distributor/SalesRepresentativeAnalytics';

//HR
import ManageAdmin from '../pages/HR/ManageAdmin';
import ManageEmployee from '../pages/HR/ManageEmployee';

//Manager
import ManageCustomer from '../pages/Manager/ManageCustomer';
import ManageProduct from '../pages/Manager/ManageProduct';
import ManageSupplier from '../pages/Manager/ManageSupplier';
import OrderHistory from '../pages/Manager/OrderHistory';

//Purchasing Manager
import ManagePOQuotation from '../pages/PurchasingManager/ManagePOQuotation';
import ManageSales from '../pages/PurchasingManager/ManageSales';
import SalesTrendAnalytics from '../pages/PurchasingManager/SalesTrendAnalytics';
import SupplierPayment from '../pages/PurchasingManager/SupplierPayment';

//Sales Representative
import PersonalOrderHistory from '../pages/SalesRepresentative/PersonalOrderHistory';
import SalesAndInvoicing from '../pages/SalesRepresentative/SalesAndInvoicing';

//Store Keeper
import GRNGIN from '../pages/StoreKeeper/GRNGIN';

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
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/change-password' component={ChangePassword} />
            <Route exact path='/sales-report' component={SalesReport} />
            <Route exact path='/sales-representative-analytics' component={SalesRepresentativeAnalytics} />
            <Route exact path='/manage-admin' component={ManageAdmin} />
            <Route exact path='/manage-employee' component={ManageEmployee} />
            <Route exact path='/manage-customer' component={ManageCustomer} />
            <Route exact path='/manage-product' component={ManageProduct} />
            <Route exact path='/manage-supplier' component={ManageSupplier} />
            <Route exact path='/order-history' component={OrderHistory} />
            <Route exact path='/manage-po-quotation' component={ManagePOQuotation} />
            <Route exact path='/manage-sales' component={ManageSales} />
            <Route exact path='/sales-trend-analytics' component={SalesTrendAnalytics} />
            <Route exact path='/supplier-payment' component={SupplierPayment} />
            <Route exact path='/personal-order-history' component={PersonalOrderHistory} />
            <Route exact path='/sales-and-invoicing' component={SalesAndInvoicing} />
            <Route exact path='/grn-gin' component={GRNGIN} />
          </Switch>
        </BrowserRouter>
      }
    </ThemeProvider>
  );
}

export default App;