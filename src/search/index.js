'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.less'
import logo from '../assets/img/logo.png'

class Search extends React.Component {
    render() {
        return <div className="search-text"> Search Text 22 7777<img alt="logo" src={logo}/></div>;
    }
}

ReactDOM.render(
    <Search /> ,
    document.getElementById('root')
)