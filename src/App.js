import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import { useParams, BrowserRouter, Route, Routes } from "react-router-dom";

const UrlInputComponent = () => {
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

    const payload = { url: inputValue };

    try {
      let response = await fetch("/api/urls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(response);
      }

      response = await response.json();
      setResponseMessage(`Short Url: ${response.data.short_url}`);
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
            placeholder="Enter your URL"
          />
          <button onClick={handleButtonClick} disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </button>
          {responseMessage && <p>{responseMessage}</p>}
        </div>
      </header>
    </div>
  );
};

const RedirectPage = () => {
  const { param } = useParams();
  useEffect(() => {
    window.location.href = `/api/${param}`;
  }, [param]);

  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UrlInputComponent />} />
        <Route path="/:param" element={<RedirectPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
