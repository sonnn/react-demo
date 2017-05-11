import React, { Component, PropTypes } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { autobind } from 'core-decorators';
import { GET } from '../../http';
import './style.less';

const GitUser = ({ user, onClick, isSelected }) => {
  return (
    <li className={`git-user ${isSelected ? 'selected' : ''}`} onClick={onClick}>
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
    this.onKeydown = null;
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

  componentDidMount() {
    this.onKeydown = document.addEventListener('keydown', (event) => {
      const { list, selected } = this.state;
      
      if (event.keyCode === 38) {
        // up
        let select = null;

        if (list && list.length > 0) {
          if (!selected) select = list[list.length - 1];
          else {
            let index = list.findIndex(f => f && f.login === selected.login);
            if (index === 0) select = list[list.length - 1];
            else select = list[--index];
          }
        }
        this.setState({ selected: select });
      } else if (event.keyCode === 40) {
        // down
        let select = null;
        
        if (list && list.length > 0) {
          if (!selected) select = list[0];
          else {
            let index = list.findIndex(f => f && f.login === selected.login);
            if (index === list.length) select = list[0];
            else select = list[++index];
          }
        }
        this.setState({ selected: select });
      } else if (event.keyCode === 13) {
        // enter
        this.props.history.push(`/profile/${selected.login}`);
      }
    });
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeydown);
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
            onFocus={() => {
              if (this.state.list.length > 0 && !this.state.isOpen) this.setState({ isOpen: true });
            }}
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
                      isSelected={selected && gitUser.login === selected.login}
                    />
                  ))
                ) : null}
              </ul>
            </div>
          ) : null}
        </div>
        {!isOpen ? null : <div className="mask" onClick={() => this.setState({ isOpen: !this.state.isOpen })}></div>}
      </div>
    );
  }
}
