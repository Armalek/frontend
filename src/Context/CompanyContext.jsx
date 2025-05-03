import React, { createContext, useContext, useState } from 'react';

// Sample initial data
const initialCompanies = [
  { id: 1, name: "TechSolutions Inc.", rank: 1, projectsThisYear: 5, available: true, assignedProjects: [] },
  { id: 2, name: "WebWizards", rank: 2, projectsThisYear: 3, available: true, assignedProjects: [] },
  { id: 3, name: "Digital Dynamics", rank: 3, projectsThisYear: 7, available: true, assignedProjects: [] },
  { id: 4, name: "CodeCrafters", rank: 4, projectsThisYear: 2, available: false, assignedProjects: [] },
  { id: 5, name: "Innovation Labs", rank: 5, projectsThisYear: 9, available: true, assignedProjects: [] },
  { id: 6, name: "ByteBridge", rank: 6, projectsThisYear: 4, available: true, assignedProjects: [] },
  { id: 7, name: "Quantum Quill", rank: 7, projectsThisYear: 12, available: false, assignedProjects: [] },
  { id: 8, name: "Pixel Perfect", rank: 8, projectsThisYear: 6, available: true, assignedProjects: [] }
];

const CompanyContext = createContext();

export function CompanyProvider({ children }) {
  const [companies, setCompanies] = useState(initialCompanies);

  const addCompany = (company) => {
    const newCompany = {
      ...company,
      id: Date.now(),
      assignedProjects: []
    };
    setCompanies(prev => [...prev, newCompany]);
  };

  const updateCompany = (updatedCompany) => {
    setCompanies(prev => prev.map(company => 
      company.id === updatedCompany.id 
        ? { ...company, ...updatedCompany } 
        : company
    ));
  };

  const deleteCompany = (id) => {
    setCompanies(prev => prev.filter(company => company.id !== id));
  };

  const assignProjects = (companyId, projects) => {
    setCompanies(prev => prev.map(company => {
      if (company.id === companyId) {
        return {
          ...company,
          assignedProjects: [...(company.assignedProjects || []), ...projects]
        };
      }
      return company;
    }));
  };

  const removeAssignedProject = (companyId, projectId) => {
    setCompanies(prev => prev.map(company => {
      if (company.id === companyId) {
        return {
          ...company,
          assignedProjects: (company.assignedProjects || []).filter(p => p.id !== projectId)
        };
      }
      return company;
    }));
  };

  const clearAssignments = () => {
    setCompanies(prev => prev.map(company => ({
      ...company,
      assignedProjects: []
    })));
  };

  const updateAssignments = (updatedCompanies) => {
    setCompanies(updatedCompanies);
  };

  return (
    <CompanyContext.Provider value={{ 
      companies,
      addCompany,
      updateCompany,
      deleteCompany,
      assignProjects,
      removeAssignedProject,
      clearAssignments,
      updateAssignments
    }}>
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
}