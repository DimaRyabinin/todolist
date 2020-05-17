import React from 'react';
import Todo from './components/Todo';
import './App.css';
import Button from './components/Button';
import Search from './components/Search';



let countId = 0;
let countAll = 0;
let countActive = 0;
let countDone = 0;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoItems: [],
      length: 0,
      type: 'All',
      value: ''
    }
    this.addItem = this.addItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.doneTask = this.doneTask.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.showAll = this.showAll.bind(this);
    this.showActive = this.showActive.bind(this);
    this.showDone = this.showDone.bind(this);
    this.searchItems = this.searchItems.bind(this);
  }

  addItem = event => {
    event.preventDefault();
    let item = {};
    item.id = countId;
    item.status = '';
    item.view = '';

    countId ++;
      
    if (this.state.value.trim() === '') {
      return;
    }

    countAll ++;

    item.content = this.state.value;
    const items = [...this.state.todoItems, item]
    this.setState({
      todoItems: items,
      length: countAll,
      value: ''
    })
    this.showAll();
  }

  handleChange = value => {
    this.setState({
      value: value
    })
  }

  doneTask = id => {
    countActive --;
    countDone --;

    const newItems = this.state.todoItems.map(item => {
      if (item.id === id) {
        item.status !== 'done' ? item.status = 'done': item.status = 'undone'
      }
      if (item.status === 'done' && this.state.type === 'Active') {
        item.view = 'off';
        this.setState({
          length: countActive
        })
      }

      if (item.status !== 'done' && this.state.type === 'Done') {
        item.view = 'off';
        this.setState({
          length: countDone
        })
      }
    })
    this.setState({
      newItems
    })
  }

  deleteItem = id => {
    countAll --;
    const items = this.state.todoItems.filter(item => {
      return item.id !== id;
    })
    this.setState({
      todoItems: items,
      length: this.state.length - 1
    })
  }

  showAll = () => {
    const items = this.state.todoItems.map(item => {
        item.view = ''
    })
    this.setState({
      items,
      length: countAll,
      type: 'All'
    })
  }

  showActive = () => {
    countActive = 0
    const items = this.state.todoItems.map(item => {
      if (item.status === 'done') {
        item.view = 'off';
      }
      if (item.status !== 'done') {
        item.view = ''
        countActive ++;
      }
    })
    this.setState({
      items,
      length: countActive,
      type: 'Active'
    })
  }

  showDone = () => {
    countDone = 0;
    const items = this.state.todoItems.map(item => {
      if (item.status === 'done') {
        item.view = '';
        countDone ++;
      }
      if (item.status !== 'done') {
        item.view = 'off'
      }
    })
    this.setState({
      items,
      length: countDone,
      type: 'Done'
    })
  }

  searchItems = (event) => {
    const items = this.state.todoItems.map(item => {
      item.view = 'off'
      if (item.content.includes(event.target.value.toLowerCase())) {
        item.view = ''
      }
    })
    this.setState({
      items
    })
  }


  render() {
    return (
      <div className='todo-app container'>
        <h1 className='center title'>To-do list</h1>
        <form onSubmit={(event) => this.addItem(event)}>
          <input id='input' type='text' placeholder='write a task' value={this.state.value} onChange={(event) => this.handleChange(event.target.value)}></input>
        </form>
        <Todo todoItems={this.state.todoItems} doneTask={this.doneTask} addHover={this.addHover} addUnhover={this.addUnhover} deleteItem={this.deleteItem}/>
        <div id='buttons' className='wrapper'>
          <Button
            content = 'All'
            className = 'button button-all'
            onFunction = {this.showAll}
            todoItems = {this.state.todoItems}
          />
          <Button
            content = 'Active'
            className = 'button button-active'
            onFunction = {this.showActive}
            todoItems = {this.state.todoItems}
          />
          <Button
            content = 'Done'
            className = 'button button-done'
            onFunction = {this.showDone}
            todoItems = {this.state.todoItems}
          />
        </div>
        <Search
          type = {this.state.type}
          length = {this.state.length}
          searchItems = {this.searchItems}
          todoItems = {this.state.todoItems}
        />
      </div>
    )
  }
}

export default App;