import React, { useState } from 'react';
import axios from 'axios';

function UploadForm() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    const res = await axios.post('http://localhost:5000/api/detect', formData);
    setResult(res.data.result);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} accept="image/*" required />
        <button type="submit" className="ml-2 px-4 py-2 bg-blue-600 text-white rounded">Upload</button>
      </form>
      {preview && (
        <div className="mt-4">
          <p className="font-semibold">Preview:</p>
          <img src={preview} alt="Preview" className="max-w-sm rounded border mt-2" />
        </div>
      )}
      {result && (
        <div className="mt-4">
          <p><strong>Result:</strong> {result.result}</p>
          <p><strong>Confidence:</strong> {result.confidence}</p>
        </div>
      )}
    </div>
  );
}

export default UploadForm;
