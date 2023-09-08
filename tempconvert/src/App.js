import React, { useState } from "react";
import"./App.css";

const App = () => {
  const [tempratureScale, setTempratureScale] = useState("Celsius");
  const [temprature, setTemprature] = useState("");
  const [error, setError] = useState(false);
  const [result, setResult] = useState("");
  const covertTemp = (e) => {
    e.preventDefault();
    if (isNaN(temprature)) {
      setResult("");
      setError(true);
    } else {
      if (tempratureScale === "Celsius") {
        const answer = ((temprature * 9) / 5 + 32).toFixed(2);
        setResult(`${temprature}C is equal to ${answer}F`);
      } else {
        const answer = (((temprature - 32) * 5) / 9).toFixed(2);
        setResult(`${temprature}F is equal to ${answer}C`);
      }
      setError(false);
    }
  };
  return (
    <>
      <div className="converter-main">
        <div>
          <h2>Convert</h2>
          <form onSubmit={covertTemp}>
            <input
              type="text"
              placeholder="Enter Temprature here.."
              value={temprature}
              onChange={(e) => setTemprature(e.target.value)}
            />
            <select
            value={tempratureScale}
              onChange={(e) => {
                setResult("");
                setTempratureScale(e.target.value);
              }}
            >
              <option value="Celsius">Celsius</option>
              <option value="Fahrenheit">Fahrenheit</option>
            </select>
            <button>{`Convert to ${
              tempratureScale === "Celsius" ? "Fahrenheit" : "Celsius"
            }`}</button>
            {error && (
              <p style={{ color: "red", fontSize: "18px" }}>
                Enter a Valid Number
              </p>
            )}
            {result && (
              <p style={{ color: "green", fontSize: "18px" }}>{result}</p>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default App;
