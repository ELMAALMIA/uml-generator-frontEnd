// src/App.js
import React, { useState } from 'react';
import ClassDiagram from './components/ClassDiagram';
import FileUpload from './components/FileUpload';
import { uploadJavaFile } from './utils/api';

function App() {
    const [classes, setClasses] = useState([]); // State to store class data
    const [xmlFilePath, setXmlFilePath] = useState(''); // State to store the XML file path
    const [showDiagram, setShowDiagram] = useState(false); // State to toggle the diagram view

    // Function to handle the file upload and set the class information
    const handleFileUpload = async (file) => {
        try {
            const data = await uploadJavaFile(file);
            if (data.status === "success") {
                setClasses(data.classes || []); // Ensure classes is set as an array
                setXmlFilePath(data.xmlFilePath);
                setShowDiagram(false); // Reset the diagram visibility
            } else {
                alert("Error: " + data.message);
            }
        } catch (error) {
            alert("File upload failed: " + error.message);
        }
    };

    // Function to handle downloading the XML file
    const downloadXml = () => {
        if (xmlFilePath) {
            window.location.href = `http://localhost:8080/${xmlFilePath}`;
        } else {
            alert("XML file path is not available.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="container mx-auto p-4 bg-white shadow rounded-lg">
                <h1 className="text-2xl font-bold mb-4">Upload Java File and Get Class Diagram</h1>
                {/* FileUpload component to handle file selection and upload */}
                <FileUpload onUpload={handleFileUpload} />

                {/* Buttons for downloading XML and showing the class diagram */}
                {xmlFilePath && (
                    <div className="mt-4 flex space-x-4">
                        <button
                            onClick={downloadXml}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Download XML File
                        </button>
                        <button
                            onClick={() => setShowDiagram(true)}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            Show Class Diagram
                        </button>
                    </div>
                )}

                {/* Render the ClassDiagram component if showDiagram is true */}
                {showDiagram && classes.length > 0 && (
                    <div className="mt-6">
                        <ClassDiagram classes={classes} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
