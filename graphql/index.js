import Vue from 'vue';
import VueApollo from 'vue-apollo';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from 'apollo-link-http';

Vue.use(VueApollo);

const cache = new InMemoryCache();
// All the graphql requests will be made at yourdomaine.com/graphql
const link = new HttpLink({
    uri: process.env.VUE_APP_GRAPHQL_URL || 'http://localhost:1337/graphql',
});

const apolloClient = new ApolloClient({
    cache,
    link
});

// And we reference this client needed by vue-apollo
export default new VueApollo({
    defaultClient: apolloClient,
});
