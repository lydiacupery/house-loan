import { storiesOf } from '@storybook/react';

import { Switch } from 'react-router';
import { Route, Link } from 'react-router-dom';
import * as React from 'react';
import { mockProvider } from 'client/test-helpers/mock-apollo';

const Provider = mockProvider({});

const MyContext = React.createContext({
  url: '/qwerty',
  changeUrl: (url: string) => {}
});

interface CompAProps {
  updateContextFn: (s: string) => string;
}
function CompA() {
  const context = React.useContext(MyContext);
  console.log('componentA context:', context);

  React.useEffect(() => {
    console.log('useEffect start?');
    context.changeUrl('/newUrl');

    return () => console.log('useEffect end?');
  });
  return (
    <p>
      component A, context=
      {context.url}
    </p>
  );
}

function CompB() {
  const context = React.useContext(MyContext);
  console.log('componentB context:', context);

  React.useEffect(() => {
    console.log('useEffect start?');
    context.changeUrl('/newUrl2');

    return () => console.log('useEffect end?');
  });
  return (
    <p>
      component B, context=
      {context.url}
    </p>
  );
}

function Example() {
  const [url, setUrl] = React.useState('qwerty');
  return (
    <Provider>
      <MyContext.Provider
        value={{
          url: url,
          changeUrl: setUrl as (url: string) => {} //todo, figure out types
        }}
      >
        <div>testing 1,2,3..</div>
        <hr />

        <MyContext.Consumer>
          {value => {
            return (
              <p>
                consumer here! valueURL= {value.url}
                <hr />
                <Link to="/foo">foo</Link>
                &nbsp;
                <Link to="/bar">bar</Link>
              </p>
            );
          }}
        </MyContext.Consumer>
        <hr />
        <Switch>
          <Route exact path="/foo" component={() => <div>hi</div> as any} />
          <Route exact path="/bar" component={() => <div>bye</div> as any} />
        </Switch>
        <hr />
      </MyContext.Provider>
    </Provider>
  );
}

storiesOf('Components/Tab Nav', module).add('does some stuff', () => (
  <Example />
));
