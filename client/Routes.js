import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login } from "./components/LoginAuthForm";
import { Signup } from "./components/signupAuthForm";
import Home from "./components/Home";
import { me } from "./store";
import AllHotSauces from "./components/AllHotSauces";
import SingleHotSauce from "./components/SingleHotSauce";
import AllCustomers from "./components/AllCustomers";
import SingleCustomer from "./components/SingleCustomer";
import EditCustomer from "./components/EditCustomer";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import ConfirmationPage from "./components/ConfirmationPage";



/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route exact path="/hotsauces" component={AllHotSauces} />
            <Route path="/hotsauces/:id" component={SingleHotSauce} />
            <Route exact path="/customers" component={AllCustomers} />
            <Route path="/profile/:id/edit" component={EditCustomer} />
            <Route path="/customers/:id" component={SingleCustomer} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/confirmation" component={ConfirmationPage} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/hotsauces" component={AllHotSauces} />
            <Route path="/hotsauces/:id" component={SingleHotSauce} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/confirmation" component={ConfirmationPage} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
