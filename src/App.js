import React, { useState, useEffect } from "react";
import "./App.css";
import Clock from "./components/Clock";
import Loading from "./assets/loading-yellow.gif"

const api = {
  key: "C1C960D2-209E-4575-8519-4FC757614416",
  base: "http://rest.coinapi.io/v1/exchangerate",
};

function App() {
  const [query, setQuery] = useState("");
  const [currency, setCurrency] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    search();
  };


  useEffect(() => {
    console.log(currency);
  }, [currency]);

 

  const search = () => {
    fetch(
      `${api.base}/${query.toUpperCase()}/USD?apikey=${
        api.key
      }&invert=true&output_format=JSON`
    )
      .then((response) => response.json())
      .then((result) => {
        setCurrency(result);
        setQuery("")
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching currency data:", error);
      });
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    setCurrency(null);
    setIsLoading(true);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Crypto Rates App</h1>
        <Clock />
        <form onSubmit={handleSubmit}>
          <div id="header">
            <input
              type="text"
              placeholder="Type shortcuts (btc, xrp etc.)"
              value={query}
              onChange={handleInputChange}
            />
            <button type="submit">Search</button>
          </div>
        </form>
        {currency && typeof currency !== "undefined" ? (
          <div id="showRates">
            <h2>
              <b>
                {currency.asset_id_base} / {currency.asset_id_quote}
              </b>
            </h2>
            <h1>
              {currency.rate} {currency.asset_id_quote}
            </h1>
          </div>
        ) : (
          <p>Search for a crypto currency (btc, doge, xrp etc.)</p>
        )}
       
        {query !== "" && isLoading && <><img src={Loading} style={{width: "75px"}} ></img><p>L o a d i n g . . .</p></> }
      </div>
    </div>
  );
}

export default App;
