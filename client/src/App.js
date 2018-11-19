import React, { Component } from 'react';
import './App.css';
import LoginScreen from './Screens/LoginScreen/LoginScreen';
import {BrowserRouter, Route} from "react-router-dom";
import LandingScreen from "./Screens/LandingScreen/LandingScreen";
import MyPropertiesScreen from "./Screens/MyPropertiesScreen/MyPropertiesScreen";
import UserScreen from "./Screens/UserScreen/UserScreen";
import CreateUserScreen from "./Screens/CreateUserScreen/CreateUserScreen";
import BrowsePropertiesScreen from "./Screens/BrowsePropertiesScreen/BrowsePropertiesScreen";
import VisitingListScreen from "./Screens/VisitingListScreen/VisitingListScreen";



export default class App extends Component {

  render() {
    return <BrowserRouter>
      <div>
        <Route path="/" component={LandingScreen} exact={true}/>
        <Route path="/login" component={LoginScreen}/>
        <Route path="/my-properties" component={MyPropertiesScreen}/>
        <Route path="/my-account" component={UserScreen}/>
        <Route path="/create-account" component={CreateUserScreen}/>
        <Route path="/browse" component={BrowsePropertiesScreen}/>
        <Route path="/visiting-list" component={VisitingListScreen}/>
      </div>
    </BrowserRouter>
  }
}
