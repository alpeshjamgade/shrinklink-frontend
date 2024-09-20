import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = async () => {
    setLoading(true);
    setResponseMessage("");
    setInputValue("");

    const payload = {
      url: inputValue,
    };

    try {
      var response = await fetch("http://localhost:9999/api/urls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(response);
      }

      response = await response.json();
      setResponseMessage(`Short Url : ${response.data.short_url}`);
    } catch (error) {
      console.error("Error posting data:", error.message);
      setResponseMessage("Invalid response from backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <h1> Welcome to my app </h1>
        <div>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter your url"
          />
          <button onClick={handleButtonClick} disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </button>

          {responseMessage && <p>{responseMessage}</p>}
        </div>
      </header>
    </div>
  );
}

export default App;
