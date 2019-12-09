import React from 'react';
import './App.css';
import Fragment from 'render-fragment';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavigationBar from './vue/navigationBar.js';
import { Switch, BrowserRouter, Route } from "react-router-dom";

import Formu from './vue/admin.js';
import Liste from './vue/liste.js';
import Homepage from './vue/homepage.js';
import editUser from './vue/edit.js';


class App extends React.Component {


  render() {
    return (
      <Fragment >


      <BrowserRouter>

        <NavigationBar /> 
      <Switch>
     
          
          <Route path="/" exact component={Homepage}/>
          <Route path = "/admin" component= {Formu} />
          <Route path="/liste" component={Liste} />
          <Route path="/edit/:id" component={editUser}/>

          <br />

      
      </Switch>
      
      </BrowserRouter>
      
      


      
      </Fragment>
    );
  }

}


export default App;
