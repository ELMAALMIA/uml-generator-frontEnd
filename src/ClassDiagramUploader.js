import React, { useState } from 'react';

function ClassDiagramUploader() {
    const [xmlFilePath, setXmlFilePath] = useState('');
    const [classDiagramVisible, setClassDiagramVisible] = useState(false);

    const uploadFile = async (event) => {
        const file = event.target.files[0];
        if (!file) {
            alert("Please select a Java file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://localhost:8080/api/files/upload", {
                method: "POST",
                body: formData
            });
            const text = await response.text();
            if (text) {
                setXmlFilePath(text);
                setClassDiagramVisible(true);
            } else {
                alert("Error: Failed to retrieve the XML file path.");
            }
        } catch (error) {
            alert("File upload failed: " + error);
        }
    };

    const showClassDiagram = () => {
        // Logic to display the class diagram (for now, we are just alerting the user)
        alert("Class diagram visualization is not implemented yet.");
    };

    const downloadXml = () => {
        if (xmlFilePath) {
            window.location.href = `http://localhost:8080/${xmlFilePath}`;
        } else {
            alert("XML file path is not available.");
        }
    };

    return (
        <div>
            <h1>Upload Java File and Get Class Diagram Information</h1>
            
            <h3>Upload a Java File</h3>
            <input type="file" onChange={uploadFile} />

            {classDiagramVisible && (
                <div>
                    <h3>Actions</h3>
                    <button onClick={showClassDiagram}>Show Class Diagram</button>
                    <button onClick={downloadXml}>Download XML File</button>
                </div>
            )}
        </div>
    );
}

export default ClassDiagramUploader;
