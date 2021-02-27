import React from 'react';
import ReactDOM from 'react-dom';

let root = document.createElement('div');
root.setAttribute('id', "root");
document.body.appendChild(root);

class MyComponent extends React.Component {
  render() {
    return <h1>Hello World</h1>;
  }
}
 
ReactDOM.render(<MyComponent />, document.getElementById('root')); 