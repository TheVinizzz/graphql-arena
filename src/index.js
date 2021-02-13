import React from 'react';
import ReactDOM from 'react-dom';
import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
    createHttpLink
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import App from './App';

const httpLink = createHttpLink({
    uri: 'https://api.producthunt.com/v2/api/graphql',
});

const authLink = setContext((_, {headers}) => {
    const token = 'jGbzx-TG53-kNlDyF4JdGFytfiHHGZ3FH0EbDPz1KDc'
    return {
        headers : {
            ...headers,
            authorization: `Bearer ${token}`
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
  document.getElementById('root')
)
