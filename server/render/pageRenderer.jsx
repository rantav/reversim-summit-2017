import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { RouterContext } from 'react-router';
import Helmet from 'react-helmet';
import staticAssets from './static-assets';

const createApp = (store, props) => renderToString(
  <Provider store={store}>
    <RouterContext {...props} />
  </Provider>
);

const buildPage = ({ componentHTML, initialState, headAssets, featureOverrides }) => {
  return `
<!doctype html>
<html>
  <head>
    ${headAssets.title.toString()}
    ${headAssets.meta.toString()}
    ${headAssets.link.toString()}
    ${staticAssets.createStylesheets()}
    ${staticAssets.createTrackingScript()}
  </head>
  <body>
    <div id="app">${componentHTML}</div>
    <script>
    window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
    window.__FT_OVERRIDES__ = ${JSON.stringify(featureOverrides)};
    </script>
    ${staticAssets.createGoogleMap()}
    ${staticAssets.createAppScript()}
  </body>
</html>`;
};

function escapeTags(state) {
  return JSON.parse(JSON.stringify(state).replace(/<\//g, ''));
}

export default (store, props, featureOverrides) => {
  const initialState = escapeTags(store.getState());
  const componentHTML = createApp(store, props);
  const headAssets = Helmet.renderStatic();
  return buildPage({ componentHTML, initialState, headAssets, featureOverrides });
};

