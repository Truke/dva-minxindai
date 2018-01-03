import React from 'react';
import { Router, Switch, Route } from 'dva/router';
import dynamic from 'dva/dynamic';
import InvestDetail from './routes/InvestDetail'

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

  // const InvestDetail = dynamic({
  //   app,
  //   models: () => [
  //     import('./models/investdetail'),
  //   ],
  //   component: () => import('./routes/InvestDetail'),
  // });

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route exact path="/invests" component={Invests} />
        <Route exact path="/invests/:id" component={InvestDetail} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
