import React from 'react';

function PriorityBadge({ priority }) {
  let badgeClass = '';
  
  switch (priority) {
    case 'High':
      badgeClass = 'badge-danger';
      break;
    case 'Medium':
      badgeClass = 'badge-warning';
      break;
    case 'Low':
      badgeClass = 'badge-info';
      break;
    default:
      badgeClass = 'badge-neutral';
  }
  
  return (
    <span className={`badge ${badgeClass}`}>
      {priority}
    </span>
  );
}

export default PriorityBadge;