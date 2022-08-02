import React from "react";
import About from "./components/About";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
// import logo from "./logo.svg";
import "./App.css";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        {/* <header className="App-header">
          <h1>Hello from client</h1>
        </header> */}
        <Navigation></Navigation>

        <main>
          <About></About>
        </main>

        <footer>
          <Footer></Footer>
        </footer>
      </div>
    </ApolloProvider>
  );
}

export default App;
