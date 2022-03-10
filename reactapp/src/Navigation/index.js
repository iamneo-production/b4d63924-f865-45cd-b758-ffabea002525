import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  Redirect,
} from "react-router-dom";
import AdminDashboard from "../components/admin_components/Dashboard";
import UserDashboard from "../components/user_components/Dashboard";
import AddVehicle from "../components/admin_components/AddVehicle";
import EditVehicle from "../components/admin_components/EditVehicle";
import Login from "../components/Login";
import SignUp from "../components/Signup";

export default function Navigation(props) {
  const { currentUser } = props;
  console.log("currentUser");
  console.log(currentUser);
  console.log("currentUser");
  
  const loginHandler = () => {
    return <Login currentUser={currentUser} />;
  };

  if (currentUser === "Admin") {
    console.log("Admin");
    return (
      <Router>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path={"/login"} component={loginHandler} />
        <Route path={"/signup"} component={SignUp} />
        <Route
          path="/admin"
          render={({ match: { url } }) => (
            <>
              <Route exact path="/">
                <Redirect to="/login" />
              </Route>
              <Route
                path={`${url}/Dashboard`}
                component={AdminDashboard}
                exact
              />
              <Route path={`${url}/user`} component={UserDashboard} />
              <Route path={`${url}/addVehicle`} component={AddVehicle} />
            </>
          )}
        />
      </Router>
    );
  }

  return (
    <Router>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route path={"/login"} component={loginHandler} />
      <Route path={"/signup"} component={SignUp} />
      <Route
        path="/user"
        render={({ match: { url } }) => (
          <>
            <Route path={`${url}/dashboard`} component={UserDashboard} exact />
            <Route path={`${url}/addvehicle`} component={AddVehicle} />
          </>
        )}
      />
    </Router>
  );
}
