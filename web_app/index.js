import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';

render(<App />, document.querySelector('main'));

if (module.hot) {
  module.hot.accept();
}
