import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ListsMovies from './Components/ListsMovies';



export default class App extends Component {
  
  render() {
    return(
        <Router>
          <div>
            <Route path={`/`}/>
            <Route path={`/ListsMovies`} component = {ListsMovies}/>
          </div>
        </Router>
    );
  }
}



