import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route } from 'react-router-dom';

import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import LandingScreen from "./Screens/LandingScreen/LandingScreen";

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route path="/" component={LandingScreen} exact={true}/>
      <Route path="/login" component={LoginScreen}/>
    </div>
  </BrowserRouter>,
  document.getElementById('root'));