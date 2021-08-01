import React from 'react'
import './App.scss'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login from './pages/Login/Login'
import Employees from './pages/Employees/Employees'

//Delete this
import EmployeesForm from './pages/Employees/EmployeesForm'
import Page from './shared/Page/Page'
import SideBar from './shared/SideBar/SideBar'
import MenuBar from './shared/MenuBar/MenuBar'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#829CD0',
      main: '#20368F',
      dark: '#000B4F'
    },
    secondary: {
      main: '#6D6D6D',
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
      <BrowserRouter>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/employees' component={Employees} />

          {/* Delete this  */}
          <Route exact path='/employees-form' component={EmployeesForm} />
          <Route exact path='/page' component={Page} />
          <Route exact path='/sidebar' component={SideBar} />
          <Route exact path='/menubar' component={MenuBar} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
