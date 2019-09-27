'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.less'
import logo from '../assets/img/logo.png'

class Search extends React.Component {
    constructor() {
        super(...arguments)
        this.state = {
            Text: null
        }
    }
    render() {
        const {
            Text
        } = this.state
        return <div onClick={this.handleUpdate.bind(this)} className="search-text" > Search Text 22 7777 {
            Text ? <Text /> : null} <img alt="logo" src={logo} /></div>;
    }
    handleUpdate() {
        debugger
        import('./func.js').then((Text) => {
            debugger
            this.setState({
                Text: Text.default
            })
        })
    }
}

ReactDOM.render(<Search />,
    document.getElementById('root')
)