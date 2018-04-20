import React from 'react';
import { AppRegistry } from 'react-vr';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import MainScene from './MainScene5';

// swapi port here
const PORT = '55885';

const GRAPHQL_API_URL = `http://localhost:${PORT}/`;

const client = new ApolloClient({
  link: new HttpLink({
    uri: GRAPHQL_API_URL
  }),
  cache: new InMemoryCache()
});

export default class ApolloWrapper extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <MainScene />
      </ApolloProvider>
    );
  }
}

AppRegistry.registerComponent(
  'WelcomeToVR',
  () => ApolloWrapper
);
