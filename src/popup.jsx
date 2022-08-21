import React from "react";
import { createRoot } from 'react-dom/client';
import * as emmmos from './calculations';
import { useState, useEffect } from 'react';

function Popup() {
    const [isLoading, setLoading] = useState(true);
    const [carbonEmission, setCarbonEmission] = useState("j");
    useEffect(() => {
        console.log("token");

    async function getToken() {
        const token = await emmmos.getString();
        setCarbonEmission(token);
        console.log("token");
        setLoading(false);

    }
    getToken();
    }, [])

    console.log(carbonEmission);
    if (isLoading) {
        return <div>Loading...</div>;
      }
    return (
        <div>
            <h1>Hello</h1>
            <p>Smapel ok </p>
            <p>{carbonEmission}</p>
        </div>
    );
}
createRoot(document.getElementById('react-target')).render(<Popup/>);