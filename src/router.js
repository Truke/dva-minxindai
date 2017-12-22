import React from 'react';
import { Router, Switch, Route } from 'dva/router';
import dynamic from 'dva/dynamic';

function RouterConfig({ history, app }) {
  const IndexPage = dynamic({
    app,
    models: () => [
      import('./models/home'),
    ],
    component: () => import('./routes/IndexPage'),
  });

  const Invests = dynamic({
    app,
    models: () => [
      import('./models/invests'),
    ],
    component: () => import('./routes/Invests'),
  });

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route exact path="/invests" component={Invests} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
