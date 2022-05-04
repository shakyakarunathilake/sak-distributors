import React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.scss';

import Login from '../pages/LoginPage/Login';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
import NotFound from '../pages/ErrorPages/NotFound';

//Distributor
import ChangePassword from '../pages/Distributor/ChangePassword';
import Dashboard from '../pages/Distributor/Dashboard';
import SalesRepresentativeAnalytics from '../pages/Distributor/SalesRepresentativeAnalytics';
import SalesReport from '../pages/Distributor/SalesReport';

//HR
import ManageEmployee from '../pages/HR/ManageEmployee';

//Manager
import ManageCustomer from '../pages/Manager/ManageCustomer';
import ManageProduct from '../pages/Manager/ManageProduct';
import ManageSupplier from '../pages/Manager/ManageSupplier';
import ManageVehicle from '../pages/Manager/ManageVehicle';

//Purchasing Manager
import ManagePurchaseOrder from '../pages/PurchasingManager/ManagePurchaseOrder';
import ManageQuotations from '../pages/PurchasingManager/ManageQuotations';
import SalesTrendAnalytics from '../pages/PurchasingManager/SalesTrendAnalytics';
import ManageSupplierPayment from '../pages/PurchasingManager/ManageSupplierPayment';

//Store Keeper
import ManageGRN from '../pages/StoreKeeper/ManageGRN';
import ManageGIN from '../pages/StoreKeeper/ManageGIN';
import ManageStore from '../pages/StoreKeeper/ManageStore';
import ViewOrderDetails from '../pages/StoreKeeper/ViewOrderDetails';
import ViewGRNDetails from '../pages/StoreKeeper/ViewGRNDetails';
import ViewGINDetails from '../pages/StoreKeeper/ViewGINDetails';

//Sales Representative
import SalesAndInvoice from '../pages/SalesRepresentative/SalesAndInvoice';

//Analytics
import SalesAnalytics from '../pages/Analytics/SalesAnalytics';

import ProtectedRoute from './ProtectedRoute';

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

  let authStatus;
  let designation;

  if (JSON.parse(sessionStorage.getItem("Auth"))) {
    authStatus = (JSON.parse(sessionStorage.getItem("Auth")).auth_status === "AUTHORIZED");
    designation = JSON.parse(sessionStorage.getItem("Auth")).designation;
  }

  return (
    <ThemeProvider theme={theme}>
      {
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Login} />

            <ProtectedRoute isAuth={authStatus} path='/dashboard' component={Dashboard} />
            <ProtectedRoute isAuth={authStatus} path='/forgot-password' component={ForgotPassword} />
            <ProtectedRoute isAuth={authStatus} path='/change-password' component={ChangePassword} />

            <ProtectedRoute isAuth={authStatus} path='/sales-analytics' component={SalesAnalytics} />

            {/* <ProtectedRoute isAuth={authStatus} path='/sales-report' component={SalesReport} />
            <ProtectedRoute isAuth={authStatus} path='/sales-representative-analytics' component={SalesRepresentativeAnalytics} />
            <ProtectedRoute isAuth={authStatus} path='/sales-trend-analytics' component={SalesTrendAnalytics} /> */}

            <ProtectedRoute isAuth={authStatus && designation === "Distributor"} path='/distributor/manage-purchase-orders' component={ManagePurchaseOrder} />
            <ProtectedRoute isAuth={authStatus && designation === "Distributor"} path='/distributor/manage-employee' component={ManageEmployee} />

            <ProtectedRoute isAuth={authStatus && designation === "Human Resources"} path='/human-resources/manage-employee' component={ManageEmployee} />

            <ProtectedRoute isAuth={authStatus && designation === "Manager"} path='/manager/manage-suppliers' component={ManageSupplier} />
            <ProtectedRoute isAuth={authStatus && designation === "Manager"} path='/manager/manage-products' component={ManageProduct} />
            <ProtectedRoute isAuth={authStatus && designation === "Manager"} path='/manager/manage-customers' component={ManageCustomer} />
            <ProtectedRoute isAuth={authStatus && designation === "Manager"} path='/manager/sales-and-invoice' component={SalesAndInvoice} />
            <ProtectedRoute isAuth={authStatus && designation === "Manager"} path='/manager/manage-vehicles' component={ManageVehicle} />
            
            <ProtectedRoute isAuth={authStatus && designation === "Purchasing Manager"} path='/purchasing-manager/manage-products' component={ManageProduct} />
            <ProtectedRoute isAuth={authStatus && designation === "Purchasing Manager"} path='/purchasing-manager/manage-purchase-orders' component={ManagePurchaseOrder} />
            <ProtectedRoute isAuth={authStatus && designation === "Purchasing Manager"} path='/purchasing-manager/manage-quotations' component={ManageQuotations} />
            <ProtectedRoute isAuth={authStatus && designation === "Purchasing Manager"} path='/purchasing-manager/manage-supplier-payment' component={ManageSupplierPayment} />
            
            <ProtectedRoute isAuth={authStatus && designation === "Store Keeper"} path='/storekeeper/manage-grn' component={ManageGRN} />
            <ProtectedRoute isAuth={authStatus && designation === "Store Keeper"} path='/storekeeper/manage-gin' component={ManageGIN} />
            <ProtectedRoute isAuth={authStatus && designation === "Store Keeper"} path='/storekeeper/manage-store' component={ManageStore} />
            <ProtectedRoute isAuth={authStatus && designation === "Store Keeper"} path='/storekeeper/manage-products' component={ManageProduct} />
            <ProtectedRoute isAuth={authStatus && designation === "Store Keeper"} path='/storekeeper/view-order-details/:ordernumber' component={ViewOrderDetails} />
            <ProtectedRoute isAuth={authStatus && designation === "Store Keeper"} path='/storekeeper/view-grn-details/:grnnumberginnumber' component={ViewGRNDetails} />
            <ProtectedRoute isAuth={authStatus && designation === "Store Keeper"} path='/storekeeper/view-gin-details/:grnnumberginnumber' component={ViewGINDetails} />
            
            <ProtectedRoute isAuth={authStatus && designation === "Sales Representative"} path='/sales-representative/manage-customers' component={ManageCustomer} />
            <ProtectedRoute isAuth={authStatus && designation === "Sales Representative"} path='/sales-representative/sales-and-invoice' component={SalesAndInvoice} />
            
            <ProtectedRoute isAuth={authStatus && designation === "Delivery Representative"} path='/delivery-representative/manage-gin' component={ManageGIN} />
            <ProtectedRoute isAuth={authStatus && designation === "Delivery Representative"} path='/delivery-representative/sales-and-invoice' component={SalesAndInvoice} />
            <ProtectedRoute isAuth={authStatus && designation === "Delivery Representative"} path='/delivery-representative/manage-customers' component={ManageCustomer} />

            <ProtectedRoute isAuth={authStatus} path='' component={NotFound} />

          </Switch>
        </BrowserRouter>
      }
    </ThemeProvider>

  );

}

export default App;