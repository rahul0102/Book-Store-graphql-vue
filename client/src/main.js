import Vue from 'vue'
import App from './App.vue'

import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'

// Create a new HttpLink to connect to your GraphQL API.
// According to the Apollo docs, this should be an absolute URI.
const httpLink = new HttpLink({
    uri:"http://localhost:5000/graphql-api"
});

// Create the apollo client
const apolloClient = new ApolloClient({
    // Tells Apollo to use the link chain with the http link we set up.
    link: httpLink,
    // Handles caching of results and mutations.
    cache: new InMemoryCache(),
    connectToDevTools: true,
});

// Register the VueApollo plugin with Vue.
Vue.use(VueApollo);

// create apolloProvider
const apolloProvider = new VueApollo({
    defaultClient: apolloClient
});

// bus for managing event between components
export const bus = new Vue();

new Vue({
  el: '#app',
  provide: apolloProvider.provide(),
  render: h => h(App)
})
