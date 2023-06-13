import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import Loading from './components/Loading.jsx';

function getTop25Repos() {
  return $.ajax({
    method: 'GET',
    url: '/repos'
  })
}

function searchRepos(username) {
  return $.ajax({
    method: 'POST',
    url: '/repos',
    contentType: 'application/json',
    data: JSON.stringify({ username })
  });
}

const App = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  const search = (term) => {
    setLoading(true);
    searchRepos(term)
      .then((x) =>
        getTop25Repos(x)
      ).then((x) => {
        setRepos(x);
        setLoading(false);
      }).catch((err) => {
        console.error(err.responseText);
        setLoading(false);
      });
  }

  React.useEffect(() => {
    getTop25Repos()
      .then((x) => {
        setRepos(x);
        setLoading(false);
      }).catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Github Fetcher</h1>
      <Search onSearch={search} />
      {loading
        ? <Loading loading={loading} />
        : <RepoList repos={repos} />
      }
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));