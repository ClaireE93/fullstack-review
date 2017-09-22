import React from 'react';
import RepoListItem from './RepoListItem.jsx';

const RepoList = (props) => (
  <div>
    <h4> Available Repos({props.repos.length}): </h4>
    <div className='list-container'>
      {props.repos.map((repo) => (
        <RepoListItem key={repo.gitId} repo={repo}/>
      ))}
    </div>
  </div>
)

export default RepoList;
