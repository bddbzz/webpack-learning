import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import logo from '../assets/img/logo.png';

class Search extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      Text: null,
    };
  }

  handleUpdate() {
        import('./func.js').then((Text) => {
          this.setState({
            Text: Text.default,
          });
        });
  }

  render() {
    const { Text } = this.state;
    return (
      <div onClick={this.handleUpdate.bind(this)} className="search-text" role="presentation">
        Search Text 22 7777
        {Text ? <Text /> : null}
        <img alt="logo" src={logo} />
      </div>
    );
  }
}

ReactDOM.render(<Search />,
  document.getElementById('root'));
