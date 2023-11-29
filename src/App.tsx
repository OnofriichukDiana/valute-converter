import React from "react";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import "./App.css";
import Converter from "./pages/Converter";

function App() {
  return (
    <div className="Wrapper">
      <header className="App-header">
        <MdOutlineCurrencyExchange style={{ width: "4rem", height: "4rem" }} />
      </header>
      <Converter />
      <footer className="App-footer">
        <MdOutlineCurrencyExchange
          style={{ width: "2rem", height: "2rem", marginRight: 10 }}
        />
        <p>2022 all right reserved</p>
      </footer>
    </div>
  );
}

export default App;
