import { Switch } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm';
import MainPage from './components/MainPage/MainPage';
import NavBar from './components/NavBar/NavBar';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import SignupForm from './components/SignupForm/SignupForm';

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <AuthRoute exact path="/" component={MainPage} />
        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />
      </Switch>
    </>
  );
}

export default App;
