import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HistoryList() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await axios.get('http://localhost:5000/api/history');
      setHistory(res.data.history);
    };
    fetchHistory();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Detection History</h2>
      <ul>
        {history.map((item, idx) => (
          <li key={idx} className="border-b py-2">
            <strong>{item.filename}</strong>: {item.result} ({item.confidence})<br/>
            <small>{new Date(item.detectedAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HistoryList;
