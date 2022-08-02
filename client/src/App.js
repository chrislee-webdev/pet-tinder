import React from "react";
import Navigation from "./components/navigation";
// import logo from "./logo.svg";
import "./App.css";
import Main from "./components/main";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <h1>Hello from client</h1>
      </header> */}
      <Navigation></Navigation>

      <main>
        <Main></Main>
      </main>
    </div>
  );
}

export default App;
