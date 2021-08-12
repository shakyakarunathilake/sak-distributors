import './App.scss';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

//Development Stage
import Page from '../shared/page/page.js'

const theme = createTheme({
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
          <Route exact path='/page' component={Page} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
