import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

const link = new HttpLink({
  uri: "https://noted-skunk-35.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret":
      "X0dDCbysLn7VUueoPmz0UuDOD8qe6V4SITzVekdW0ALQ50u2iSO0hAlYChTXwX9w",
  },
});

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
