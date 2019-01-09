import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const DEFAULT_QUERY = 'redux';
const PATH_BASE =  'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;

const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

const largeColumn = {
  width: '40%' ,
};
const midColumn = {
  width: '30%' ,
};
const smallColumn = {
  width: '10%' ,
};

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
    }
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  setSearchTopStories(result){
    this.setState({result});
  }

  componentDidMount(){
    const { searchTerm } = this.state;

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
}

  onDismiss(id){
    const upDatedList = this.state.list.filter((item) => item.objectID !== id)
    this.setState({list: upDatedList});
  }
  onSearchChange(event){
    this.setState({searchTerm: event.target.value});
  }

  render(){
    const { searchTerm } = this.state;
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
            <span style = {largeColumn}>
              <a href={item.url}>{item.title}</a>
            </span>
            <span style = {midColumn}>{item.author}</span>
            <span style = {smallColumn}>{item.num_comments}</span>
            <span style = {smallColumn}>{item.points}</span>
            <span style = {smallColumn}>
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
