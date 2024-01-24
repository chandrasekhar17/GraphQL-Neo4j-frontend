import React from "react";
import "./App.css";
import DropdownComponent from "./DropDown";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

function App() {
  const client = new ApolloClient({
    uri: "http://127.0.0.1:3009/graphql",
    cache: new InMemoryCache(),
  });
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <DropdownComponent />
      </ApolloProvider>
    </div>
  );
}

export default App;
