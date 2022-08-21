import React from "react";
import { createRoot } from 'react-dom/client';

function Popup() {
    return (
        <div>
            <h1>Hello</h1>
            <p>Smapel </p>
        </div>
    );
}
createRoot(document.getElementById('react-target')).render(<Popup/>);