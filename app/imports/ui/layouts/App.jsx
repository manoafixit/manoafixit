import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/global/navbar/NavBar';
import Footer from '../components/global/Footer';
import Landing from '../pages/Landing';
import SubmitPage from '../pages/SubmitPage';
import FeedPage from '../pages/feed/FeedPage';
import IssuePage from '../pages/issue/IssuePage';
import MapPage from '../pages/MapPage';
import EditIssuePage from '../pages/issue/EditIssuePage';
// import AdminsPage from '../pages/admins/AdminsPage';
// import AddAdminsPage from '../pages/admins/AddAdminsPage';

import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
        <Router>
          <div>
            <NavBar/>
            <Switch>
              <Route exact path="/" component={Landing}/>
              <Route path="/signin" component={Signin}/>
              <Route path="/signup" component={Signup}/>
              <ProtectedRoute path="/map" component={MapPage}/>
              <ProtectedRoute path="/submit" component={SubmitPage}/>
              <ProtectedRoute path="/feed" component={FeedPage}/>
              <ProtectedRoute path="/issue/:_id" component={IssuePage}/>
              <ProtectedRoute path="/edit/:_id" component={EditIssuePage}/>
              {/* <SuperAdminProtectedRoute path="/admins" component={AdminsPage}/> */}
              {/* <SuperAdminProtectedRoute path="/createAdmin" component={AddAdminsPage}/> */}
              <ProtectedRoute path="/signout" component={Signout}/>
              <Route component={NotFound}/>
            </Switch>
            <Footer/>
          </div>
        </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null;
          return isLogged ?
              (<Component {...props} />) :
              (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
              );
        }}
    />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null;
          const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
          return (isLogged && isAdmin) ?
              (<Component {...props} />) :
              (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
              );
        }}
    />
);

// const SuperAdminProtectedRoute = ({ component: Component, ...rest }) => (
//     <Route
//         {...rest}
//         render={(props) => {
//           const isLogged = Meteor.userId() !== null;
//           const isSuperAdmin = Roles.userIsInRole(Meteor.userId(), ROLE.SUPERADMIN);
//           return (isLogged && isSuperAdmin) ?
//               (<Component {...props} />) :
//               (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
//               );
//         }}
//     />
// );

/** Require a component and location to be passed to each ProtectedRoute. */
ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

/** Require a component and location to be passed to each AdminProtectedRoute. */
AdminProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

export default App;
