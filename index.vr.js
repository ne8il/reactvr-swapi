import React from "react";
import MainScene from "./MainScene2";
import { AppRegistry } from "react-vr";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
const GRAPHQL_API_URL = "http://localhost:56600/";

const client = new ApolloClient({
  // By default, this client will send queries to the
  //  `/graphql` endpoint on the same host
  // Pass the configuration option { uri: YOUR_GRAPHQL_API_URL } to the `HttpLink` to connect
  // to a different host
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

AppRegistry.registerComponent("WelcomeToVR", () => ApolloWrapper);
