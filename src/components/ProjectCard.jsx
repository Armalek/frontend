import React from 'react';
import { Briefcase } from 'lucide-react';
import PriorityBadge from './PriorityBadge';

function ProjectCard({ project, onClick, assignedTo = null }) {
  const { id, name, description, priority } = project;
  
  return (
    <div 
      className="card p-5 cursor-pointer hover:border-blue-300 border border-transparent transition-all"
      onClick={() => onClick(project)}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <div className="bg-blue-100 p-2 rounded-lg mr-3">
            <Briefcase className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="font-medium text-lg text-gray-900">{name}</h3>
        </div>
        <PriorityBadge priority={priority} />
      </div>
      
      <p className="text-gray-600 text-sm mt-2 line-clamp-2">{description}</p>
      
      {assignedTo && (
        <div className="mt-4 pt-3 border-t border-gray-100">
          <p className="text-sm text-gray-500 flex items-center">
            Assigned to: 
            <span className="ml-1 font-medium text-gray-800">{assignedTo}</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default ProjectCard;