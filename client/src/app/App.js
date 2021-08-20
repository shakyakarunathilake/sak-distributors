import './App.scss';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

//Development Stage
import Page from '../shared/Page/Page.js';
import EmployeesForm from '../pages/EmployeesPage/EmployeesForm/EmployeesForm';

//Pages
import Login from '../pages/LoginPage/Login';
import Employees from '../pages/EmployeesPage/Employees';

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
            <Route exact path='/employees' component={Employees} />
            <Route exact path='/employees-form' component={EmployeesForm} />

          </Switch>
        </BrowserRouter>
      }
    </ThemeProvider>
  );
}

export default App;
