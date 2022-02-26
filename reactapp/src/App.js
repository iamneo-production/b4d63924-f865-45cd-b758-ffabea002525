import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/user_components/Dashboard';
import Error from './components/Error';
import Vehicle from './components/user_components/Vehicle';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login/>
        </Route>
        <Route path="/signup">
          <Signup/>
        </Route>
        <Route path="/user/dashboard">
          <Dashboard/>
        </Route>
        <Route path="/user/vehicles">
          <Vehicle/>
        </Route>
        <Route path="*">
          <Error/>
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
