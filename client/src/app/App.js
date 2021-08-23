import './App.scss';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

//Development Stage
import Page from '../shared/Page/Page.js';
import EmployeesForm from '../pages/EmployeesPage/EmployeesForm/EmployeesForm';
import CustomersForm from '../pages/CustomersPage/CustomersForm/CustomersForm';

//Pages
import Login from '../pages/LoginPage/Login';
import Employees from '../pages/EmployeesPage/Employees';
import Customers from '../pages/CustomersPage/Customers';

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
            <Route exact path='/' component={Login} />
            <Route exact path='/employees' component={Employees} />
            <Route exact path='/employees-form' component={EmployeesForm} />
            <Route exact path='/customers' component={Customers} />
            <Route exact path='/customers-form' component={CustomersForm} />

          </Switch>
        </BrowserRouter>
      }
    </ThemeProvider>
  );
}

export default App;
