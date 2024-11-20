// src/components/FileUpload.js
import React from 'react';

function FileUpload({ onUpload }) {
    // Function to handle file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onUpload(file); // Call the onUpload function passed as a prop
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
        </div>
    );
}

export default FileUpload;
