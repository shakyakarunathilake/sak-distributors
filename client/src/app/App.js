import React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.scss';

import Login from '../pages/LoginPage/Login';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
import NotFound from '../pages/ErrorPages/NotFound';

//Distributor
import DistributorDashboard from '../pages/Distributor/DistributorDashboard';
import ChangePassword from '../pages/Distributor/ChangePassword';

//HR
import HumanResourcesDashboard from '../pages/HR/HumanResourcesDashboard';
import ManageEmployee from '../pages/HR/ManageEmployee';

//Manager
import ManagerDashboard from '../pages/Manager/ManagerDashboard';
import ManageCustomer from '../pages/Manager/ManageCustomer';
import ManageProduct from '../pages/Manager/ManageProduct';
import ManageSupplier from '../pages/Manager/ManageSupplier';
import ManageVehicle from '../pages/Manager/ManageVehicle';
import ManageRoute from '../pages/Manager/ManageRoutes';

//Purchasing Manager
import PurchasingManagerDashboard from '../pages/PurchasingManager/PurchasingManagerDashboard';
import ManagePurchaseOrder from '../pages/PurchasingManager/ManagePurchaseOrder';
import ManageQuotations from '../pages/PurchasingManager/ManageQuotations';
import ManageSupplierPayment from '../pages/PurchasingManager/ManageSupplierPayment';

//Store Keeper
import StorekeeperDashboard from '../pages/StoreKeeper/StorekeeperDashboard';
import ManageGRN from '../pages/StoreKeeper/ManageGRN';
import ManageGIN from '../pages/StoreKeeper/ManageGIN';
import ManageStore from '../pages/StoreKeeper/ManageStore';
import ViewOrderDetails from '../pages/StoreKeeper/ViewOrderDetails';
import ViewGRNDetails from '../pages/StoreKeeper/ViewGRNDetails';
import ViewGINDetails from '../pages/StoreKeeper/ViewGINDetails';

//Sales Representative
import SalesRepresentativeDashboard from '../pages/SalesRepresentative/SalesRepresentativeDashboard';
import SalesAndInvoice from '../pages/SalesRepresentative/SalesAndInvoice';

//Delivery Representative
import DeliveryRepresentativeDashboard from '../pages/DeliveryRepresentative/DeliveryRepresentativeDashboard';

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
            <Route exact path='/forgot-password' component={ForgotPassword} />

            <ProtectedRoute isAuth={authStatus} path='/change-password' component={ChangePassword} />

            <ProtectedRoute isAuth={authStatus} path='/sales-analytics' component={SalesAnalytics} />

            <ProtectedRoute isAuth={authStatus && designation === "Distributor"} path='/distributor/dashboard' component={DistributorDashboard} />
            <ProtectedRoute isAuth={authStatus && designation === "Distributor"} path='/distributor/manage-purchase-orders' component={ManagePurchaseOrder} />
            <ProtectedRoute isAuth={authStatus && designation === "Distributor"} path='/distributor/manage-employee' component={ManageEmployee} />

            <ProtectedRoute isAuth={authStatus && designation === "Human Resources"} path='/human-resources/dashboard' component={HumanResourcesDashboard} />
            <ProtectedRoute isAuth={authStatus && designation === "Human Resources"} path='/human-resources/manage-employee' component={ManageEmployee} />

            <ProtectedRoute isAuth={authStatus && designation === "Manager"} path='/manager/dashboard' component={ManagerDashboard} />
            <ProtectedRoute isAuth={authStatus && designation === "Manager"} path='/manager/manage-suppliers' component={ManageSupplier} />
            <ProtectedRoute isAuth={authStatus && designation === "Manager"} path='/manager/manage-products' component={ManageProduct} />
            <ProtectedRoute isAuth={authStatus && designation === "Manager"} path='/manager/manage-customers' component={ManageCustomer} />
            <ProtectedRoute isAuth={authStatus && designation === "Manager"} path='/manager/sales-and-invoice' component={SalesAndInvoice} />
            <ProtectedRoute isAuth={authStatus && designation === "Manager"} path='/manager/manage-vehicles' component={ManageVehicle} />
            <ProtectedRoute isAuth={authStatus && designation === "Manager"} path='/manager/manage-routes' component={ManageRoute} />

            <ProtectedRoute isAuth={authStatus && designation === "Purchasing Manager"} path='/purchasing-manager/dashboard' component={PurchasingManagerDashboard} />
            <ProtectedRoute isAuth={authStatus && designation === "Purchasing Manager"} path='/purchasing-manager/manage-products' component={ManageProduct} />
            <ProtectedRoute isAuth={authStatus && designation === "Purchasing Manager"} path='/purchasing-manager/manage-purchase-orders' component={ManagePurchaseOrder} />
            <ProtectedRoute isAuth={authStatus && designation === "Purchasing Manager"} path='/purchasing-manager/manage-quotations' component={ManageQuotations} />
            <ProtectedRoute isAuth={authStatus && designation === "Purchasing Manager"} path='/purchasing-manager/manage-supplier-payment' component={ManageSupplierPayment} />

            <ProtectedRoute isAuth={authStatus && designation === "Store Keeper"} path='/store-keeper/dashboard' component={StorekeeperDashboard} />
            <ProtectedRoute isAuth={authStatus && designation === "Store Keeper"} path='/store-keeper/manage-grn' component={ManageGRN} />
            <ProtectedRoute isAuth={authStatus && designation === "Store Keeper"} path='/store-keeper/manage-gin' component={ManageGIN} />
            <ProtectedRoute isAuth={authStatus && designation === "Store Keeper"} path='/store-keeper/manage-store' component={ManageStore} />
            <ProtectedRoute isAuth={authStatus && designation === "Store Keeper"} path='/store-keeper/manage-products' component={ManageProduct} />
            <ProtectedRoute isAuth={authStatus && designation === "Store Keeper"} path='/store-keeper/view-order-details/:ordernumber' component={ViewOrderDetails} />
            <ProtectedRoute isAuth={authStatus && designation === "Store Keeper"} path='/store-keeper/view-grn-details/:grnnumberginnumber' component={ViewGRNDetails} />
            <ProtectedRoute isAuth={authStatus && designation === "Store Keeper"} path='/store-keeper/view-gin-details/:grnnumberginnumber' component={ViewGINDetails} />

            <ProtectedRoute isAuth={authStatus && designation === "Sales Representative"} path='/sales-representative/dashboard' component={SalesRepresentativeDashboard} />
            <ProtectedRoute isAuth={authStatus && designation === "Sales Representative"} path='/sales-representative/manage-customers' component={ManageCustomer} />
            <ProtectedRoute isAuth={authStatus && designation === "Sales Representative"} path='/sales-representative/sales-and-invoice' component={SalesAndInvoice} />

            <ProtectedRoute isAuth={authStatus && designation === "Delivery Representative"} path='/delivery-representative/dashboard' component={DeliveryRepresentativeDashboard} />
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