// import 'client/bootstrap-mui'; // this must be the first import
import * as React from 'react';
import * as ReactDom from 'react-dom';

import { App } from '../modules/client';

declare function blah(): Promise<'spaghetti'>;

async function foo() {
  await blah();
}

// require('../modules/client/styles/main.scss');

import createHistory from 'history/createBrowserHistory';

import { graphqlClient } from 'client/graphql-client';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';

const rootEl = (
  <ApolloProvider client={graphqlClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);
ReactDom.render(
  (rootEl as any) as any, //React.ReactElement<any> ,
  document.getElementById('msl-app')
);
