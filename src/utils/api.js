// src/utils/api.js
export const uploadJavaFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch("http://localhost:8080/api/files/upload", {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error("File upload failed: " + error.message);
    }
};
