import React, { Component } from 'react';
import SearchBox from '../searchbox';

export default class Home extends Component { 
  render() {
    return (
      <div className="home-page" style={{ height: '100%' }}>
        <SearchBox {...this.props} />
      </div>
    );
  }
}
