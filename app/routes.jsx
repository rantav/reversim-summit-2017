import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { fetchHomeData } from './fetch-data';
import { App, Home, Dashboard, About, LoginOrRegister } from './pages';

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  const isClientSide = typeof window !== 'undefined' && window.document && window.document.createElement;

  const requireAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (!authenticated) {
      if (isClientSide) {
        window.location.href = `/auth/google?returnTo=/${nextState.location.pathname}`;
      } else {
        replace({
          pathname: '/auth/google?returnTo=' + nextState.location.pathname,
          state: {nextPathname: nextState.location.pathname}
        });
      }
    }
    callback();
  };

  const redirectAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (authenticated) {
      replace({
        pathname: '/'
      });
    }
    callback();
  };
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} fetchData={fetchHomeData} />
      <Route path="login" component={LoginOrRegister} onEnter={redirectAuth} />
      <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
      <Route path="about" component={About} />
    </Route>
  );
};
