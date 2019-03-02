import React, { Component } from 'react';
import axios from 'axios';
import { Route, NavLink, withRouter } from 'react-router-dom';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      smurfs: [],
      editingSmurf: null
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.location !== prevProps.location &&
      this.props.location.pathname === '/smurf-form'
    ) {
      this.setState({ isEditing: false, editingSmurf: null });
    }
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
    const { isEditing, editingSmurf } = this.state;
    if (isEditing) {
      axios
        .put(`http://localhost:3333/smurfs/${editingSmurf.id}`, smurf)
        .then(({ data }) => {
          this.props.history.push('/');
          this.setState({ smurfs: data });
        })
        .catch(console.log);
      this.setState({ isEditing: false, editingSmurf: null });
    } else {
      axios
        .post('http://localhost:3333/smurfs', smurf)
        .then(({ data }) => {
          this.props.history.push('/');
          this.setState({ smurfs: data });
        })
        .catch(console.log);
    }
  };

  deleteSmurf = id => {
    axios
      .delete(`http://localhost:3333/smurfs/${id}`)
      .then(({ data }) => this.setState({ smurfs: data }))
      .catch(console.log);
  };

  onEditClick = smurf => {
    this.setState({
      isEditing: true,
      editingSmurf: smurf
    });

    this.props.history.push('/edit-smurf-form');
  };

  render() {
    return (
      <div className="App">
        <nav className="nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/smurf-form">Add Smurf</NavLink>
        </nav>
        <Route
          path="/edit-smurf-form"
          render={(props) => (
            <SmurfForm
              {...props}
              isEditing={this.state.isEditing}
              editingSmurf={this.state.editingSmurf}
              onSubmit={this.addSmurf}
            />
          )}
        />
        <Route
          path="/smurf-form"
          render={(props) => (
            <SmurfForm
              {...props}
              isEditing={this.state.isEditing}
              editingSmurf={this.state.editingSmurf}
              onSubmit={this.addSmurf}
            />
          )}
        />
        <Route
          path="/"
          exact
          render={() => (
            <Smurfs
              smurfs={this.state.smurfs}
              deleteSmurf={this.deleteSmurf}
              onEditClick={this.onEditClick}
            />
          )}
        />
      </div>
    );
  }
}

export default withRouter(App);
