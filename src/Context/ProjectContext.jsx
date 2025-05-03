import React, { createContext, useContext, useState } from 'react';

// Sample initial data
const initialProjects = [
  {
    id: 1,
    name: "E-commerce Website Redesign",
    description: "Modernize the company's e-commerce platform with a focus on mobile responsiveness and user experience.",
    priority: "High"
  },
  {
    id: 2,
    name: "CRM Integration",
    description: "Integrate the existing CRM system with new sales platforms and automate customer communication workflows.",
    priority: "Medium"
  },
  {
    id: 3,
    name: "Mobile App Development",
    description: "Create a native mobile application for both iOS and Android platforms with full feature parity to the web application.",
    priority: "High"
  },
  {
    id: 4,
    name: "Business Intelligence Dashboard",
    description: "Develop a comprehensive BI dashboard for executive reporting with real-time data visualization.",
    priority: "Medium"
  },
  {
    id: 5,
    name: "Cloud Migration Strategy",
    description: "Plan and execute the migration of legacy systems to a cloud-based infrastructure.",
    priority: "High"
  },
  {
    id: 6,
    name: "Security Audit",
    description: "Perform a complete security assessment of all digital assets and implement recommended improvements.",
    priority: "Medium"
  },
  {
    id: 7,
    name: "Documentation Overhaul",
    description: "Update all technical documentation to reflect current systems and create a maintenance strategy.",
    priority: "Low"
  },
  {
    id: 8,
    name: "Content Management System",
    description: "Build a custom CMS tailored to the marketing team's specific needs for content creation and deployment.",
    priority: "Low"
  },
  {
    id: 9,
    name: "API Development",
    description: "Create RESTful APIs for third-party integrations with the company's core products.",
    priority: "Medium"
  },
  {
    id: 10,
    name: "Digital Marketing Automation",
    description: "Set up automated marketing campaigns across multiple digital channels with analytics tracking.",
    priority: "Low"
  }
];

const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState([]);

  const addProject = (newProject) => {
    setProjects(prev => {
      console.log('Adding project:', newProject);
      return [...prev, newProject];
    });
  };

  const updateProject = (updatedProject) => {
    setProjects(prev => prev.map(project => 
      project.id === updatedProject.id 
        ? { ...project, ...updatedProject } 
        : project
    ));
  };

  const deleteProject = (id) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  return (
    <ProjectContext.Provider value={{ 
      projects,
      addProject,
      updateProject,
      deleteProject
    }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}