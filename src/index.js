import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  Observable,
} from 'apollo-boost';

import { defaults, resolvers } from 'gql/index';
import { App } from 'components/index';
import { getEnv } from 'utils/Env';

const { GRAPHQL_HOST, GRAPHQL_PORT } = getEnv();
const cache = new InMemoryCache();
const links = [];

links.push(
  new ApolloLink((operation, forward) => {
    return new Observable(observer => {
      let sub;

      try {
        sub = forward(operation).subscribe({
          next: ({ data, errors }) => {
            if (errors) {
              data = {
                ...data,
                errors,
              };
            }
            observer.next({ data });
          },
        });
      } catch (e) {
        observer.error(e);
      }

      return () => {
        if (sub) sub.unsubscribe();
      };
    });
  }),
);

if (GRAPHQL_HOST && GRAPHQL_PORT) {
  links.push(
    new HttpLink({
      uri: `http://${GRAPHQL_HOST}:${GRAPHQL_PORT}`,
      includeExtensions: true,
      credentials: 'same-origin',
    }),
  );
} else {
  console.warn(
    `[ENV] GRAPHQL_HOST (${GRAPHQL_HOST}) or GRAPHQL_PORT (${GRAPHQL_PORT}) aren't set. The GraphQL server can't be reached`,
  );
}

const link = ApolloLink.from(links);
const client = new ApolloClient({
  link,
  cache,
  resolvers,
});

cache.writeData({
  data: defaults,
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
