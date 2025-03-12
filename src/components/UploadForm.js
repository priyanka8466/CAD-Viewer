import React, { useState } from "react";
import axios from "axios";
import "./UploadForm.css";

const UploadForm = ({ setModelUrl }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && (selectedFile.name.endsWith(".obj") || selectedFile.name.endsWith(".stl"))) {
            setFile(selectedFile);
            console.log("File selected:", selectedFile.name);
        } else {
            alert("Please upload a valid .obj or .stl file.");
        }
    };

    const handleUpload = async () => {
        if (!file) return alert("Please select a file");

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://127.0.0.1:5000/upload", formData);
            setModelUrl(`http://127.0.0.1:5000/files/${response.data.filename}`);
        } catch (error) {
            console.error("Error uploading file", error);
            alert("Failed to upload file. Please try again.");
        }
    };

    return (
        <div className="upload-container">
            <div className="upload-box">
                <input
                    type="file"
                    id="file-upload"
                    className="file-input"
                    onChange={handleFileChange}
                />
                <label htmlFor="file-upload" className="file-label">
                    Choose a File
                </label>
                {file && <p className="file-name">{file.name}</p>}
                <button className="upload-button" onClick={handleUpload}>
                    Upload
                </button>
            </div>
        </div>
    );
};

export default UploadForm;