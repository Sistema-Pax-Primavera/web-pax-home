import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RoutesApp from "./routes/Routes";
import "react-slideshow-image/dist/styles.css";
function App() {
    return (
        <>
            <RoutesApp />
            <ToastContainer />
        </>
    );
}

export default App;