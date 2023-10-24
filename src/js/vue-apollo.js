import Vue from 'vue';
import VueApollo from 'vue-apollo';
import { ApolloClient } from "apollo-client";  
import { createHttpLink } from "apollo-link-http";  
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

Vue.use(VueApollo);

// HTTP connection to the API
const httpLink = createHttpLink({  
  // You should use an absolute URL here
  uri: process.env.VUE_APP_GRAPHQL_URL || "http://localhost:1337/graphql"
});

// Cache implementation
const cache = new InMemoryCache();

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
        console.log(`[GraphQL error]: ${message}, Location: ${locations}, Path: ${path}`);
      },
    );
  }
});

const link = ApolloLink.from([errorLink, httpLink]);

// Create the apollo client
const apolloClient = new ApolloClient({  
  link: link,
  cache
});

export default new VueApollo({
  defaultClient: apolloClient,
});
