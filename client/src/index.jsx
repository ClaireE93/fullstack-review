import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

    this.fetchRepos();

  }

  search (term) {
    console.log(`${term} was searched`);
    const username = term;
    $.ajax({
      url: 'http://localhost:1128/repos',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ username }),
      success: (data) => {
        const parsed = JSON.parse(data);
        console.log('data is', parsed);
        const newArr = parsed.values;
        const tot = parsed.repoCount;
        const dif = 25 - tot;
        const newStateArr = dif >= 0 ? newArr.concat(this.state.repos.slice(0, dif)) : newArr.slice(0, dif);
        this.setState({repos: newStateArr});
      },
      error: (err) => {
        console.error('Post FAILED', err);
      }
    });
  }

  fetchRepos() {
    $.ajax({
      url: 'http://localhost:1128/repos',
      type: 'GET',
      contentType: 'application/json',
      success: (data) => {
        const repoArr = JSON.parse(data);
        const curRepos = this.state.repos;
        console.log('repo arr is', repoArr);
        this.setState({repos: repoArr});
      },
      error: (err) => {
        console.error('Post FAILED', err);
      }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
