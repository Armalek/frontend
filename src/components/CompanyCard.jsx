import React from 'react';
import { Building2, Star, Briefcase, AlertCircle } from 'lucide-react';
import AvailabilityBadge from './AvailabilityBadge';

function CompanyCard({ company, onSelect }) {
  const { id, name, classement, available, projectsThisYear, assignedProjects } = company;
  
  const isOverloaded = assignedProjects?.length > 3 || projectsThisYear > 10;
  
  return (
    <div 
      className={`card p-5 border ${isOverloaded ? 'border-orange-300' : 'border-transparent'} cursor-pointer hover:border-blue-300`}
      onClick={() => onSelect(company)}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <div className="bg-blue-100 p-2 rounded-lg mr-3">
          <Building2 className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="font-medium text-lg text-gray-900">{name}</h3>
        </div>
        <AvailabilityBadge available={available} />
      </div>
      
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="flex items-center">
          <Star className="h-4 w-4 text-yellow-500 mr-2" />
          <span className="text-sm">Rank: <span className="font-medium text-gray-900">#{classement}</span></span>
        </div>
        <div className="flex items-center">
          <Briefcase className="h-4 w-4 text-green-500 mr-2" />
          <span className="text-sm">Projects this year: <span className="font-medium text-gray-900">{projectsThisYear}</span></span>
        </div>
      </div>
      
      {isOverloaded && (
        <div className="mt-3 flex items-center text-orange-600 text-sm">
          <AlertCircle className="h-4 w-4 mr-1" />
          <span>This company may be overloaded</span>
        </div>
      )}
      
      {assignedProjects && assignedProjects.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-sm font-medium text-gray-500 mb-2">Assigned Projects:</p>
          <div className="flex flex-wrap gap-2">
            {assignedProjects.slice(0, 2).map(project => (
              <span key={project.id} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                {project.name}
              </span>
            ))}
            {assignedProjects.length > 2 && (
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                +{assignedProjects.length - 2} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CompanyCard;