import React, {Component} from 'react';
import './App.css';
import LoginScreen from './Screens/LoginScreen/LoginScreen';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Auth from "./Contexts/Auth";
import LandingScreen from "./Screens/LandingScreen/LandingScreen";
import MyPropertiesScreen from "./Screens/MyPropertiesScreen/MyPropertiesScreen";
import UserScreen from "./Screens/UserScreen/UserScreen";
import CreateUserScreen from "./Screens/CreateUserScreen/CreateUserScreen";
import BrowsePropertiesScreen from "./Screens/BrowsePropertiesScreen/BrowsePropertiesScreen";
import VisitingListScreen from "./Screens/VisitingListScreen/VisitingListScreen";
import NavBar from "./NavBar/NavBar";
import { library } from '@fortawesome/fontawesome-svg-core';
import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';

[
  faCheck, faTimes
].forEach(icon => library.add(icon));

export default class App extends Component {

  render() {
    return <Auth>
      <BrowserRouter>
        <div>
        <NavBar/>
          <Switch>
            <Route path="/" component={LandingScreen} exact={true}/>
            <Route path="/login" component={LoginScreen}/>
            <Route path="/my-properties" component={MyPropertiesScreen}/>
            <Route path="/my-account" component={UserScreen}/>
            <Route path="/create-account" component={CreateUserScreen}/>
            <Route path="/browse" component={BrowsePropertiesScreen}/>
            <Route path="/visiting-list" component={VisitingListScreen}/>
          </Switch>
        </div>
      </BrowserRouter>
    </Auth>
  }
}
