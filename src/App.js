import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import { useParams, BrowserRouter, Route, Routes } from "react-router-dom";

const funnyHeadings = [
  "URLs so short, they’ll fit in your pocket!",
  "Shortening links, one giggle at a time!",
  "Transforming URLs into tiny treasures!",
  "Because long links are so last season!",
  "Short URLs: the diet your links need!",
  "Turning long URLs into bite-sized treats—because life’s too short for lengthy links!",
  "Where your links go on a diet—no more heavy lifting!",
  "Making your links shorter, so you can save space for more cat videos!",
  "Tiny links: because size doesn’t matter!",
  "Get ready for some link-shrinking magic!",
  "Say goodbye to long URLs—hello, brevity!",
  "Making links shorter, so your browser doesn’t get tired!",
  "Because long URLs are just a click away from being a headache!",
  "Cutting the fluff from your links—no scissors required!",
  "Long URLs are so yesterday—let’s keep it snappy!",
  
];

const UrlInputComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [randomFunnyHeading, setRandomFunnyHeading] = useState("");

  useEffect(() => {
    // Select a random funny heading on component mount
    const randomHeading = funnyHeadings[Math.floor(Math.random() * funnyHeadings.length)];
    setRandomFunnyHeading(randomHeading);
  }, []);

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

        <h1>Welcome to shrinklinks</h1>
        <p>{randomFunnyHeading}</p>
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
