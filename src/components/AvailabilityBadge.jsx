import React from 'react';

function AvailabilityBadge({ available }) {
  return (
    <span 
      className={`badge ${available ? 'badge-success' : 'badge-danger'}`}
    >
      {available ? 'Available' : 'Not Available'}
    </span>
  );
}

export default AvailabilityBadge;