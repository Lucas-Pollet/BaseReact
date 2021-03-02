// react tutorial tic-tac-toe game / Jeu du Morpion
import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import './materialize.css';
import './icons.css';

let root = document.createElement('div');
root.setAttribute('id', "root");
document.body.appendChild(root);

// ----------------------------------
// APP

let list_task = [];
list_task.push({index: 1, task: 'Faire le projet', done: false});
list_task.push({index: 2, task: 'Manger des burgers', done: true});
list_task.push({index: 3, task: 'Préparer le repas', done: false});

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.textInput = null;

    this.setTextInputRef = element => {
      this.textInput = element;
    };

  }
  
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    let newItem = this.textInput.value;
    if(newItem){
      this.props.addItem(newItem);
      this.setState({value: ''});
    }
  }

  render(){
      return(
        <form id="formInput" onSubmit={this.handleSubmit}>
            <i className="material-icons prefix">assignment</i>
            <label>Tâche
              <input ref={this.setTextInputRef} placeholder="Ajouter votre tache ici" type="text" className="validate" value={this.state.value} onChange={this.handleChange} />
            </label>
          <input type="submit" className="waves-light btn" value="Ajouter" />
        </form>
      );  
  }
}

class TodoItem extends React.Component {
  constructor(props) {
    super(props);

    this.removeElement = this.removeElement.bind(this);
    this.onClickDone = this.onClickDone.bind(this);
  }
  
  removeElement(){
    let index = parseInt(this.props.id);
    this.props.removeItem(index); 
  }

  onClickDone(){
    let index = parseInt(this.props.id);
    this.props.markDone(index);
  }

  render(){
      let done = this.props.done ? 'checked' : '';
      return(
        <li className="collection-item" key={this.props.id}>
          <label> 
            <input type="checkbox" onChange={this.onClickDone} checked={done} />
            <span>{this.props.task}</span>
          </label>
          <a href="#" className="secondary-content" onClick={this.removeElement}><i className="material-icons">delete_forever</i></a>
        </li>
      );
    }
}


class TodoItemList extends React.Component {
  constructor(props){
    super(props);

    this.removeItem = this.removeItem.bind(this);
    this.markDone = this.markDone.bind(this);

    this.state = {list_task: list_task};
  }
    
  removeItem(id){
    list_task.splice(id, 1);
    this.setState({list_task: list_task});
  } 

  markDone(id){
    list_task[id].done = !list_task[id].done;
    this.setState({list_task: list_task});
  }

  render(){  
    this.items = list_task.map((item, index) => {
      return(<TodoItem key={index} task={item.task} id={index} done={item.done} markDone={this.markDone} removeItem={this.removeItem} />)});

    return(<ul className="collection">{this.items}</ul>);
  }
}

class App extends React.Component {
  constructor(props){
    super(props);

    this.addItem = this.addItem.bind(this);

    this.state = {list_task: list_task};
  }
  
  addItem(value){
    list_task.push({index: list_task.length+1, task: value, done: false});
    this.setState({list_task: list_task});
  }

  render() {
    return (
      <div className="container">
        <h2>Création d'une TodoListe avec ReactJS</h2>
        <Input addItem={this.addItem} />
        <TodoItemList/>
        <footer>© Lucas POLLET</footer>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

