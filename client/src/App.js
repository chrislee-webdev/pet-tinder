import React from "react";
import About from "./components/About";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import API from "./components/API";
// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
      <Router>
        <div className="App">
          {/* <header className="App-header">
          <h1>Hello from client</h1>
        </header> */}
          <Navigation></Navigation>

          <main>
            <Routes>
              <Route path="/" element={<About></About>} />
              <Route path="/apiTest" element={<API />} />
              <Route path="*" element={<h1>404 Page Not Found</h1>} />
            </Routes>
          </main>

          <footer>
            <Footer></Footer>
          </footer>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
