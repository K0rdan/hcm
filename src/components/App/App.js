import React from 'react';
import { compose } from 'react-apollo';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { Home, Login } from 'pages/index';
import { Loader, Page } from 'components/index';
import { queries as globalQueries } from 'gql/Global';

import 'components/App/App.css';

const renderWithPage = Component => props => (
  <Page header drawer>
    <Component {...props} />
  </Page>
);

export const App = ({ globalData }) => {
  const { global } = globalData;
  return (
    <div className="App">
      {global.loading ? <Loader>{global.loadingText}</Loader> : null}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" render={renderWithPage(Login)} />
      </Switch>
    </div>
  );
};

App.propTypes = {
  globalData: PropTypes.object,
};

export default compose(globalQueries.withGlobalQuery)(App);
