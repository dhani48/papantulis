import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { connect } from "react-redux";
import Dashboard from './Dashboard.jsx';


// function AuthRoute ({component: Component, authed, ...rest}) {
//     alert(authed)
//     return (
//       <Route
//         {...rest}
//         render={(props) => authed === true
//           ? <Component {...props} />
//           : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
//       />
//     )
//   }

// export default AuthRoute;

class AuthRoute extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <Route
          render={props => this.props.authorized === true
            ? <Dashboard {...this.props} />
            : <Redirect to={{pathname: '/login', state: {from: this.props.location}}} />}
        />
      )
  }
}
function mapStateToProps(state) {
    return {
      authorized: state.authorized
    };
  }

export default connect(mapStateToProps)(AuthRoute)