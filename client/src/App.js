import React from "react";
import About from "./components/About";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
// import logo from "./logo.svg";
import "./App.css";
import AddPet from "./components/AddPet";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <h1>Hello from client</h1>
      </header> */}
      <Navigation></Navigation>

      <main>
        <AddPet></AddPet>
        <About></About>
      </main>

      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
}

export default App;
