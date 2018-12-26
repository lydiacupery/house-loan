import { MuiThemeProvider } from '@material-ui/core';
import { RenderFunction } from '@storybook/react';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { SchemaLink } from 'apollo-link-schema';
import { GraphQLResolveInfo } from 'graphql';
import { SchemaMap } from 'graphql-api';
import { rawSchema } from 'graphql-api/schema-base';
import {
  addMockFunctionsToSchema,
  makeExecutableSchema,
  MockList,
  mergeSchemas
} from 'graphql-tools';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { MemoryRouter, MemoryRouterProps } from 'react-router';

export { MockList } from 'graphql-tools';

type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> };
type MockDefinitions<T> = {
  [K in keyof T]?: ((
    obj: any,
    args: any,
    context: any,
    info: GraphQLResolveInfo
  ) => DeepPartial<T[K]> | MockList | MockDefinitions<T[K]>)
};

/** Generate a mock apollo client with a defined set of mocks. If you need to mock a new composite graphql type, update the SchemaMap in the graphql module. */
export function mockClient(
  mocks: MockDefinitions<SchemaMap>
): ApolloClient<NormalizedCacheObject> {
  const serverSchema = makeExecutableSchema({ typeDefs: rawSchema });
  addMockFunctionsToSchema({
    schema: serverSchema,
    mocks: mocks as any
  });

  const clientSchema = makeExecutableSchema({
    typeDefs: require('client/graphql/schema.graphql')
  });
  addMockFunctionsToSchema({
    schema: clientSchema,
    mocks: mocks as any
  });

  const exSchema = mergeSchemas({
    schemas: [serverSchema, clientSchema]
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new SchemaLink({
      schema: exSchema
    })
  });
  return client;
}

export interface MockProviderOpts {
  /** Definition of graphql mocks for mock client */
  mocks?: MockDefinitions<SchemaMap>;
  memoryRouterProps?: MemoryRouterProps;
}

/** Create a fully initialized ApolloProvider with a mocked out graphql connection and arbitrary initial state. */
export function mockProvider(opts?: MockProviderOpts) {
  if (!opts) opts = {};

  const apollo = mockClient(opts.mocks || {});

  let maybeJest: typeof jest | undefined = undefined;
  try {
    maybeJest = jest;
  } catch {}

  const mockFn = maybeJest ? maybeJest.fn : (x: any) => x;
  return class extends React.Component<{}, {}> {
    static apolloClient = apollo;
    static displayName = 'MockProvider';

    render() {
      return (
        // <MuiThemeProvider theme={PlacementTheme}>
        //   <TranslationProvider value={ENGLISH}>
        //     <ThemeProvider theme={PlacementTheme}>
        <MemoryRouter>
          <ApolloProvider client={apollo}>{this.props.children}</ApolloProvider>
        </MemoryRouter>
        //  </ThemeProvider>
        //   </TranslationProvider>
        // </MuiThemeProvider>
      );
    }
  };
}

export function mockProviderDecorator(opts?: MockProviderOpts) {
  const Provider = mockProvider(opts);
  return (story: RenderFunction) => <Provider>{story()}</Provider>;
}
