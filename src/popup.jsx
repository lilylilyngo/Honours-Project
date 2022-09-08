import React from "react";
import { createRoot } from "react-dom/client";
import * as emmmos from "./calculations";
import * as est from "./carbon-estimate";
import { useState, useEffect, useRef } from "react";

function Popup() {
  const [isLoading, setLoading] = useState(true);
  const [carbonFootprint, setCarbonFootprint] = useState(
    "Enter in NTF address:"
  );
  const [gasUsed, setGasUsed] = useState("");
  const [errorState, setErrorState] = useState("");
  const [carbonEstimate, setCarbonEstimate] = useState("Loading...");

  useEffect(() => {
    setEst();
  });

  async function setEst(address) {
    const estt = await est.carbonEstimate();
    console.log(estt);
    setCarbonEstimate(estt);
  }
  async function getToken(address) {
    const token = await emmmos.getString(address);
    setCarbonFootprint(token.kgCO2);
    setErrorState(token);
    setGasUsed(token.gasUsed);
    console.log(token);
    setLoading(false);
  }
  const inputRef = useRef(null);

  function handleClick() {
    getToken(inputRef.current.value);
    console.log(inputRef.current.value);
  }
  function isANumber(str) {
    return !/\D/.test(str);
  }

  console.log(carbonFootprint);

  return (
    <div>
      <h1>NFT Carbon FootPrint Calculator</h1>
      <p> </p>
      {!isANumber(carbonFootprint) && !isLoading ? (
        <div>
          <p style={{ color: "red" }}>{errorState}</p>
          <p>Enter in NFT address:</p>
        </div>
      ) : (
        <div>
          {isANumber(carbonFootprint) ? (
            <div>
              <p>Total carbon emissions used for your NFT is</p>
              <h3>{carbonFootprint} kilograms of CO₂ emissions</h3>
              <p>This address transactions gas consumption</p>
              <h3>{gasUsed} gas</h3>
              <p>Enter in NFT address:</p>
            </div>
          ) : (
            <p>{carbonFootprint}</p>
          )}
        </div>
      )}
      <div>
        <input
          ref={inputRef}
          type="text"
          id="message"
          name="message"
          autoComplete="off"
          placeholder="0x Address"
        />

        <button onClick={handleClick}>Calculate NFT</button>
      </div>
      <div>
        <p>
          Estimate carbon footprint is "{carbonEstimate}" kilograms of CO₂
          emissions.
        </p>
      </div>
    </div>
  );
}
createRoot(document.getElementById("react-target")).render(<Popup />);
