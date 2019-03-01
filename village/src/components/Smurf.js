import React from 'react';

const Smurf = props => {
  return (
    <div className="Smurf">
      <h3>{props.name}</h3>
      <strong>{props.height} tall</strong>
      <p>{props.age} smurf years old</p>
      <button onClick={() => props.onEditClick({
        name: props.name,
        id: props.id,
        age: props.age,
        height: props.height
      })}>edit</button>
      <button onClick={() => props.deleteSmurf(props.id)}>x</button>
    </div>
  );
};

Smurf.defaultProps = {
  name: '',
  height: '',
  age: ''
};

export default Smurf;
