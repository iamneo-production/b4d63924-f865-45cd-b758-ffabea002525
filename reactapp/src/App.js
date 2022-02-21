import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/user_components/Dashboard';

function App() {
  return (
    <>
    <Login/>
    <Signup/>
    <Dashboard/>
    </>
  );
}

export default App;
