import React from "react";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import "./App.css";
import Converter from "./pages/Converter";

function App() {
  return (
    <div>
      <header className="App-header">
        <MdOutlineCurrencyExchange />
      </header>
      <Converter />
    </div>
  );
}

export default App;
