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
        this.fetchRepos();
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
        // this.setState({repos: curRepos.concat(repoArr)});
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
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
