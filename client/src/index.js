import React from 'react';
import ReactDOM from 'react-dom';
import './sass/bootstrap.scss';
import App from './components/App';
import {AppContainer} from 'react-hot-loader';
import {unregister} from './registerServiceWorker';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(App);
  });
}
unregister();
