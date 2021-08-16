import './App.scss';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

//Development Stage
import Page from '../shared/Page/Page.js';

//Pages
import Login from '../pages/LoginPage/Login';

const theme = createTheme({
  palette: {
    primaryDark2: {
      main: '#25333B'
    },
    primaryDark1: {
      main: '#132E3B'
    },
    primary: {
      main: '#2B6684'
    },
    primaryLight1: {
      main: '#3D91BA'
    },
    primaryLight2: {
      main: '#7DADC6'
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
            {/* <Route exact path='/login' component={Login} /> */}
          </Switch>
        </BrowserRouter>
      }
    </ThemeProvider>
  );
}

export default App;
