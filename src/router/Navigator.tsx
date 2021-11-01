import { Routes } from "./routes";
import { useSelector } from "react-redux";
import { RootStore } from "../state/Store";
import Login from "../pages/Login";
import Root from "../pages/Root";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  RouteProps,
} from "react-router-dom";

interface Props extends RouteProps {
  isAuth: boolean;
  restricted?: boolean;
  component: React.ComponentType<any>;
}

export const Navigator = () => {
  //Redux
  const { isAuthenticated } = useSelector((state: RootStore) => state.session);

  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute
          path={Routes.Signin}
          exact
          restricted={true}
          isAuth={isAuthenticated}
          component={Login}
        />
        <PrivateRoute
          path={Routes.Home}
          isAuth={isAuthenticated}
          component={Root}
        />
      </Switch>
    </BrowserRouter>
  );
};

const PrivateRoute: React.FC<Props> = ({
  component: Component,
  isAuth,
  ...rest
}) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to={Routes.Signin} />
      }
    />
  );
};

const PublicRoute: React.FC<Props> = ({
  component: Component,
  restricted,
  isAuth,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth && restricted ? (
          <Redirect to={Routes.Home} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
