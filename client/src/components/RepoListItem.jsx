import React from 'react';

const RepoListItem = (props) => (
  <div className='list-items'>
    <div className='avatar'><a href={props.repo.html_url} target='_blank'><img src={props.repo.avatar}/></a></div>
    <div className='repo-info'>
      <div className='username'>{props.repo.user}</div>
      <div className='repo-name'>{props.repo.name}</div>
      <div className='description'>{props.repo.description}</div>
    </div>
  </div>
)

export default RepoListItem;
