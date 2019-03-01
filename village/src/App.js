import React, { Component } from 'react';
import axios from 'axios';
import { Route, NavLink } from 'react-router-dom';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: []
    };
  }

  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  componentDidMount() {
    axios
      .get('http://localhost:3333/smurfs')
      .then(({ data }) => this.setState({ smurfs: data }))
      .catch(console.log);
  }

  addSmurf = smurf => {
    axios
      .post('http://localhost:3333/smurfs', smurf)
      .then(({ data }) => this.setState({ smurfs: data }))
      .catch(console.log);
  };

  deleteSmurf = id => {
    axios
      .delete(`http://localhost:3333/smurfs/${id}`)
      .then(({ data }) => this.setState({ smurfs: data }))
      .catch(console.log);
  };

  render() {
    return (
      <div className="App">
        <nav className="nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/smurf-form">Add Smurf</NavLink>
        </nav>
        <Route
          path="/smurf-form"
          render={() => <SmurfForm onSubmit={this.addSmurf} />}
        />
        <Route
          path="/"
          exact
          render={() => (
            <Smurfs smurfs={this.state.smurfs} deleteSmurf={this.deleteSmurf} />
          )}
        />
      </div>
    );
  }
}

export default App;
