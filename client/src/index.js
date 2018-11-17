import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route } from 'react-router-dom';

import LoginScreen from "./Screens/LoginScreen";

ReactDOM.render(
  <BrowserRouter>
    <Route path="/login" component={LoginScreen}/>
  </BrowserRouter>,
  document.getElementById('root'));