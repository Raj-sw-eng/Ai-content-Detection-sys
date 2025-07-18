import React from 'react';
import UploadForm from './components/UploadForm';
import HistoryList from './components/HistoryList';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-4">AI Image Detector</h1>
      <UploadForm />
      <HistoryList />
    </div>
  );
}

export default App;
