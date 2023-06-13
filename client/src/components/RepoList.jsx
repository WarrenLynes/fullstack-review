import React from 'react';

const RepoList = ({ repos }) => {

  function clk(repo) {
    window.location = repo.url;
  }

  return (
    <div>
      <h4> Repo List Component </h4>
      {repos.length ?
        repos.map((repo) => (
          <h2 key={repo.name} onClick={() => clk(repo)}>{repo.name}</h2>
        ))
        : null
      }
    </div>
  );
}

export default RepoList;