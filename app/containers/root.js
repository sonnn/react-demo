import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'

import Home from '../components/homepage';
import Profile from '../components/profilepage';

const Root = ({ store }) => {
  return  (
    <Router>
      <div style={{ height: '100%' }}>
        <Route exact path="/" component={Home}/>
        <Route exact path="/profile/:user" component={Profile}/>
      </div>
    </Router>
  );
}

export default Root;
