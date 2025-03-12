import React, { useState } from "react";
import UploadForm from "./components/UploadForm";
import ModelViewer from "./components/ModelViewer";
import "./App.css";

const App = () => {
    const [modelUrl, setModelUrl] = useState(null);

    return (
        <div className="app">
            {!modelUrl ? (
                <UploadForm setModelUrl={setModelUrl} />
            ) : (
                <ModelViewer modelUrl={modelUrl} />
            )}
        </div>
    );
};

export default App;