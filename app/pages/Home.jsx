import React from 'react';
import Page from './Page';
import HomeContainer from '../containers/Home';

export default (props) => {
  return (
    <Page title="Home page" meta={[{ name: "description", content: "Reversim Summit 2017" }]} link={[]}>
      <HomeContainer {...props} />
    </Page>
  );
};
