import './app.css';

import React, { FunctionComponent, ReactElement } from 'react';

import logo from './assets/logo.svg';
import Item from './components/item';

const App: FunctionComponent = (): ReactElement => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Item id="something" title="title" />
      </header>
    </div>
  );
};

export default App;
