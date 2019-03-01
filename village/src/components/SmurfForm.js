import React, { Component } from 'react';

class SmurfForm extends Component {
  constructor(props) {
    super(props);
    this.state = props.editingSmurf || {
      name: '',
      age: '',
      height: ''
    };
  }

  addSmurf = event => {
    event.preventDefault();
    // add code to create the smurf using the api
    this.props.onSubmit(this.state);

    this.setState({
      name: '',
      age: '',
      height: ''
    });
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  renderButton() {
    if (this.props.isEditing) {
      return <button type="submit">Submit Edit</button>;
    } else {
      return <button type="submit">Add to the village</button>;
    }
  }

  render() {
    const smurf = this.state;
    return (
      <div className="SmurfForm">
        <form onSubmit={this.addSmurf}>
          <input
            onChange={this.handleInputChange}
            placeholder="name"
            value={smurf.name}
            name="name"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="age"
            value={smurf.age}
            name="age"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="height"
            value={smurf.height}
            name="height"
          />
          { this.renderButton() }
        </form>
      </div>
    );
  }
}

export default SmurfForm;
