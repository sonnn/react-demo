import React, { Component, PropTypes } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { autobind } from 'core-decorators';
import { GET } from '../../http';
import './style.less';

const GitUser = ({ user, onClick }) => {
  return (
    <li className="git-user" onClick={onClick}>
      <span className="image"><img src={user.avatar_url} /></span>
      <span className="name">{user.login}</span>
    </li>
  );
}

export default class SearchBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      selected: null,
      isOpen: false,
      loading: false,
    }
    
    this.timeout = null;
    this.searchURL = 'https://api.github.com/search/users?q=';
  }

  fetchGitHubUsers(searchTerm) {
    GET(`${this.searchURL}${searchTerm}`).then((response) => {
      this.setState({ list: response.items, isOpen: true });
    });
  }

  @autobind
  changeHandler(event) {
    const { target: { value } } = event;

    if (this.timeout !== null) clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      if (value) this.fetchGitHubUsers(value);
      else this.setState({ list: [] });
    }, 300);
  }

  viewProfile(user) {
    this.props.history.push(`/profile/${user.login}`);
  }

  render() {
    const { list, selected, isOpen } = this.state;

    return (
      <div className="search-box-wrapper">
        <div className="search-box">
          <input
            type="text"
            placeholder="Who are you looking for?"
            onChange={this.changeHandler}
            onFocus={
              this.state.list.length > 0 && !this.state.isOpen ? this.setState({ isOpen: true }) : false
            }
          />
          {isOpen ? (
            <div className="drop-down-wrapper">
              <ul className="drop-down">
                {list && list.length > 0 ? (
                  list.map(gitUser => (
                    <GitUser
                      key={gitUser.login} 
                      user={gitUser}
                      onClick={() => this.viewProfile(gitUser)}
                    />
                  ))
                ) : null}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
