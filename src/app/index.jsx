import React from 'react';
import {render} from 'react-dom';
// import { Router, Route, IndexRoute } from 'react-router'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import axios from 'axios'

import global from './helpers/global'

import './../scss/main.scss';
import rootReducers from './reducers/rootReducer'
import axiosConfig from './axiosConfig.jsx';
import AuthRoute from './components/CMS/AuthRoute.jsx';

window.cookie = () => global.Cookie();


//components

//CMS
import Main from './components/Main.jsx';
import Dashboard from './components/CMS/Dashboard.jsx';
import LoginPage from './components/CMS/LoginPage.jsx';

//MAIN
import User from './components/User.jsx';
import PlacesList from './components/PlacesList.jsx';
import PlaceDetail from './components/PlaceDetail.jsx';


//Configure Store
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = state => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem("state", serializedState);
};

const store = createStore(rootReducers,loadState(),applyMiddleware(thunk,logger))

store.subscribe(()=> {
  saveState(store.getState())
})

// axios.defaults.headers.common = {
//   "x-access-token": cookie().getCookie('papantulis'),
// };

axios.interceptors.response.use((response) => { // intercept the global error
  return response
},(err)=> {
  console.log(err.response.status)
  if(err.response.status == 401){
    window.location.href = '/login'
    alert(err.response.data.message)
  }
})

const App = (props) => {
  console.log(props)
    return (
      <BrowserRouter>
        <Switch>
            <Route exact path="/" component={PlacesList}>
            </Route>
            {/* <Route onEnter={checkAuth}>
              <Route path="/login" component={LoginPage} />
              <Route path="/dashboard" component={Dashboard} />
            </Route> */}
            
            <AuthRoute authed={props.state.authorized} component={ Dashboard } path="/cms" />
            <Route component={ LoginPage } path="/login" />
            <Route path="/:placeUrl" component={PlaceDetail}>
            </Route>
      
        </Switch>
      </BrowserRouter>
    );
}

render(
  <Provider store={store}>
    <App state={store.getState()}/>
  </Provider>, document.getElementById('app'));
