import React, { useState } from 'react';
import axios from 'axios';
import './index.css'; // Import CSS if needed

function TrainInfo() {
  const [trainNumber, setTrainNumber] = useState('');
  const [trainDetails, setTrainDetails] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setTrainNumber(e.target.value);
  };

  const fetchTrainDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/train/${trainNumber}`);
      setTrainDetails(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch train details. Please check the train number and try again.');
      setTrainDetails(null);
    }
  };

  return (
    <div className="container">
      <h2>Train Information</h2>
      <input
        type="text"
        placeholder="Enter Train Number"
        value={trainNumber}
        onChange={handleInputChange}
      />
      <button onClick={fetchTrainDetails}>
        Get Train Info
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {trainDetails && (
        <div className="result">
          <h3>Train Details:</h3>
          <p><strong>Train Name:</strong> {trainDetails.TrainName}</p>
          <p><strong>Train Number:</strong> {trainDetails.TrainNo}</p>
          <p><strong>Source:</strong> {trainDetails.Source.Code} - Arrival: {trainDetails.Source.Arrival}</p>
          <p><strong>Destination:</strong> {trainDetails.Destination.Code} - Arrival: {trainDetails.Destination.Arrival}</p>
        </div>
      )}
    </div>
  );
}

export default TrainInfo;
