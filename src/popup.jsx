import React from "react";
import { createRoot } from 'react-dom/client';
import * as emmmos from './calculations';
import { useState, useEffect, useRef } from 'react';

function Popup() {
    const [isLoading, setLoading] = useState(true);
    const [carbonEmission, setCarbonEmission] = useState("Enter in NTF address:");
    
    // useEffect(() => {
    //     console.log("token");

    // async function getToken() {
    //     const token = await emmmos.getString();
    //     setCarbonEmission(token);
    //     console.log("token");
    //     setLoading(false);

    // }
    // // getToken();
    // }, [])

    async function getToken(address) {
          const token = await emmmos.getString(address);
          setCarbonEmission(token);
          console.log("token");
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

    console.log(carbonEmission);
    // if (isLoading) {
    //     return <div>Loading...</div>;
    //   }
    return (
        <div>
            <h1>Hello</h1>
            <p>Smapel ok </p>
            {(!isANumber(carbonEmission) && !isLoading) ? ( 
             <p style={{color: "red"}}>{carbonEmission}</p>
            ) : (
              <p>{carbonEmission}</p>
            )}
            {/* <p>{carbonEmission}</p> */}
            <div>
      <input
        ref={inputRef}
        type="text"
        id="message"
        name="message"
        autoComplete="off"
      />

      <button onClick={handleClick}>Calculate NFT</button>
    </div>
        </div>
    );
}
createRoot(document.getElementById('react-target')).render(<Popup/>);