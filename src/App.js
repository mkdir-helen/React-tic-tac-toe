import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router, // Watches for changes to URL
  Route,  //Renders components based on the specific URL
  Link  //Changes the URL so the Router sees it
} from 'react-router-dom';
import EasyAI from './components/EasyAI';
import HardAI from './components/HardAI';
import Home from './components/Home';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
  }
  render() {
    
    return (
      <Router>  
      <div className="App">
      <Route path="/" exact component={Home} />  
      <Route path="/goofus"  component={EasyAI} />  
      <Route path="/nerdy"  component={HardAI} />  
      </div>
      </Router>
    );
  }
}

export default App;
