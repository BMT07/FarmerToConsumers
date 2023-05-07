import React from 'react';

import './index.css';

// import the crop data for Tunisia (this can be from a local file or an API)
import cropData from './cropData.json';

function CropRec() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // add 1 because getMonth() returns zero-indexed month
  const cropsForMonth = {
    1: ['wheat', 'barley', 'potatoes'],
    2: ['wheat', 'barley', 'potatoes'],
    3: ['wheat', 'barley', 'potatoes'],
    4: ['wheat', 'barley', 'potatoes'],
    5: ['wheat', 'barley', 'tomatoes'],
    6: ['wheat', 'barley', 'tomatoes'],
    7: ['olives', 'citrus'],
    8: ['olives', 'citrus'],
    9: ['olives', 'citrus'],
    10: ['olives', 'dates'],
    11: ['olives', 'dates'],
    12: ['olives', 'dates'],
  };

  const suggestedCrops = cropsForMonth[currentMonth];

  return (
    <div className="crop-suggestion-container">
      <div className="crop-suggestion-header">
        <h2 className="crop-suggestion-title">
          Recommended Crops for{' '}
          {currentDate.toLocaleString('default', { month: 'long' })}
        </h2>
      </div>
      <ul className="crop-suggestion-list">
        {suggestedCrops.map((crop) => (
          <li key={crop} className="crop-suggestion-item">
            {crop}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CropRec;
