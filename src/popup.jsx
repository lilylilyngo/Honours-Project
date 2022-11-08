import React from "react";
import { createRoot } from "react-dom/client";
import * as emmmos from "./calculations";
import * as est from "./carbon-estimate";
import { useState, useEffect, useRef } from "react";

var GG = require("greenhouse-gas");

function Popup() {
  const [isLoading, setLoading] = useState(true);
  const [carbonFootprint, setCarbonFootprint] = useState(
    "Enter in NFT address:"
  );
  const [gasUsed, setGasUsed] = useState("");
  const [errorState, setErrorState] = useState("");
  const [carbonEstimate, setCarbonEstimate] = useState("Loading...");
  const [equivalentCarbon, setequivalentCarbon] = useState("");

  var calculateEquivalency = "";

  useEffect(() => {
    setEst();
  });

  // Sets estimated carbon emissions
  async function setEst(address) {
    const estt = await est.carbonEstimate();
    console.log(estt);
    setCarbonEstimate(estt);
  }
  // Sets carbon emissions
  async function getToken(address) {
    const token = await emmmos.getString(address);
    setCarbonFootprint(token.kgCO2);
    setErrorState(token);
    setGasUsed(token.gasUsed);
    console.log(token);
    setLoading(false);

    if (errorState == "") {
      var kgCO2Equivalant = getEquivalent(token.kgCO2);
      setequivalentCarbon(kgCO2Equivalant);
      console.log(token.kgCO2);
    }
  }
  const inputRef = useRef(null);

  // Get the NFT address
  function handleClick() {
    getToken(inputRef.current.value);
    console.log(inputRef.current.value);
  }
  // Checks to see if it is a number
  function isANumber(str) {
    return !/\D/.test(str);
  }

  // Get the emissions equivalency
  function getEquivalent(carbonFootprints) {
    console.log(equivalentCarbon);
    calculateEquivalency = GG.calculateEquivalency(carbonFootprints, {
      keyList: ["coal", "phones", "miles"],
    });
    return calculateEquivalency;
  }

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
              <h3>{carbonFootprint} kilograms of CO₂ emissions.</h3>
              <p>This NFT address total gas consumption is </p>
              <h3 style={{ marginBlockEnd: "0em" }}>{gasUsed} gas</h3>
              <p style={{ marginBlockStart: "0em" }}>
                (how much computation is done).
              </p>
              <hr
                style={{
                  color: "#000000",
                  height: 0.3,
                }}
              />
              <p style={{ marginBlockEnd: "0em" }}>
                This NFT carbon emissions consumption is equivalent to
              </p>
              <h3 style={{ marginBlockStart: "0em", marginBlockEnd: "0em" }}>
                {Math.round(equivalentCarbon[1].value * 100) / 100}
              </h3>
              <p style={{ marginBlockStart: "0em" }}>smartphones charged,</p>
              <h3 style={{ marginBlockStart: "0em", marginBlockEnd: "0em" }}>
                {Math.round(equivalentCarbon[0].value * 100) / 100} pounds
              </h3>
              <p style={{ marginBlockStart: "0em" }}>of coal burned,</p>
              <h3 style={{ marginBlockStart: "0em", marginBlockEnd: "0em" }}>
                {Math.round(equivalentCarbon[2].value * 1.6 * 100) / 100}{" "}
                kilometers
              </h3>
              <p style={{ marginBlockStart: "0em" }}>
                driven by an average passenger vehicle.
              </p>
              <hr
                style={{
                  height: 0.3,
                  borderColor: "#000000",
                }}
              />
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
          Estimate next carbon footprint transaction is "
          {Math.round(carbonEstimate * 100) / 100}" kilograms of CO₂ emissions.
        </p>
      </div>
    </div>
  );
}
createRoot(document.getElementById("react-target")).render(<Popup />);
