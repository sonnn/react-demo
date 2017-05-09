import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { GET } from '../../http';
import './style.less';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      repos: null,
    }
    this.profileURL = 'https://api.github.com/users/';
  }

  componentWillMount() {
    const { match: { params: { user } } } = this.props;
    if (user) {
      this.fetchGitUser(user);
      this.fetchRepos(user);
    }
  } 

  fetchGitUser(user) {
    GET(`${this.profileURL}${user}`).then((response) => {
      this.setState({ user: response });
    });
  }

  fetchRepos(user) {
    GET(`${this.profileURL}${user}/repos`).then((response) => {
      this.setState({ repos: response });
    });
  }

  render() {
    const { user, repos } = this.state;

    if (!user || !repos) return null;

    return (
      <div className="profile-wrapper" style={{ height: '100%' }}>
        <div className="profile">
          <div className="left">
            <div className="image">
              <img src={user.avatar_url} />
            </div>
            <div className="bio">
              <h3>{user.name}</h3>
              <div>{user.login}</div>
              <small>{user.bio}</small>
              <hr />
              <div>{user.company}</div>
              <div>{user.location}</div>
              <hr />
            </div>
          </div>
          <div className="right">
            <h3>Repos:</h3>
            <ul>
              {repos.map(repo => {
                return (
                  <li className="repo" key={repo.id}>
                    <a href={repo.html_url}>
                      <h4>{repo.name} | {repo.language}</h4>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="nav-back">
          <Link to="/">Back to homepage</Link>
        </div>
      </div>
    );
  }
}
