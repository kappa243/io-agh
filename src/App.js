import React from "react";
import "./App.css";

const app_name = "Title";

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>{app_name}</h1>
      </header>
      <main className="main">
        <p> lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit
          esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum.
        </p>
      </main>
    </div>
  );
}

export default App;
