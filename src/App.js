import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov and Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  }
];
const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      list,
      searchTerm: '',
    }
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onDismiss(id){
    const upDatedList = this.state.list.filter((item) => item.objectID !== id)
    this.setState({list: upDatedList});
  }
  onSearchChange(event){
    this.setState({searchTerm: event.target.value});
  }

  render(){
    const { list, searchTerm } = this.state;
    return (
      <div className="page">
        <div className = "interactions">
          <Search
            value = {searchTerm}
            onChange = {this.onSearchChange}
          >
          Search
          </Search>
        </div>
      <Table
        list = {list}
        pattern = {searchTerm}
        onClick = {this.onDismiss}
      />
    </div>
    );
  }
}
const Search = ({ value, onChange, children }) =>
  <form>
    {children}<input
    type="text"
    value={value}
    onChange={onChange}
    />
  </form>

const Table = ({ list, pattern, onDismiss }) =>
      <div className = "table">
        {list.filter(isSearched(pattern)).map(item =>

          <div key={item.objectID} className = "table-row">
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
              <button
                onClick={() => onDismiss(item.objectID)}
                className = "button-inline"
              >
              Dismiss
              </button>
            </span>
          </div>
        )}
      </div>

const Button = ({ onClick, className = '', children }) =>

      <button
        onClick={onClick}
        className={className}
        type="button"
      >
      {children}
      </button>

export default App;
