import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
  }

  onChange (e) {
    if (e.keyCode === 13) {
      this.search.call(this);
    }
    this.setState({
      term: e.target.value
    });
  }

  search() {
    this.props.onSearch(this.state.term);
    this.setState({term: ''});
  }

  handleKeyUp(e) {
    if (e.key === 'Enter') {
      this.search();
    }
  }

  render() {
    return (<div>
      <h4>Add more repos!</h4>
      Enter a github username:
      <input value={this.state.term}
        onChange={this.onChange.bind(this)}
        onKeyUp={this.handleKeyUp.bind(this)}/>
      <button onClick={this.search.bind(this)}> Add Repos </button>
    </div>)
  }
}

export default Search;
