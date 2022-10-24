import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom/cjs/react-router-dom.min";

export const AuthRoute = ( {component: Component, path, exact }) => {
  const loggedIn = useSelector(state => !!state.session.user);

  return (
    <Route path={path} exact={exact} render={(props) => (
      !loggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to="/tweets" />
      )
    )} />
  )
}

export const ProtectedRoute = ( {component: Component, ...rest }) => {
  const loggedIn = useSelector(state => !!state.session.user);

  return (
    <Route
      {...rest}
      render={props => 
        loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to="/tweets" />
        )
      }
    />
  );
};