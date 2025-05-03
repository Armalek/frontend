import React, { useState, useEffect, useMemo } from 'react';
import { useCompany } from '../Context/CompanyContext';
import { useProject } from '../Context/ProjectContext';
import { useNotification } from '../Context/NotificationContext';
import PageHeader from '../components/PageHeader';
import PriorityBadge from '../components/PriorityBadge';
import AvailabilityBadge from '../components/AvailabilityBadge';
import distributeProjects from '../utils/DistributionAlgorithm';
import { RefreshCw, AlertTriangle } from 'lucide-react';
import Navbar from '../components/Navbar';

function ProjectDistribution() {
  const { companies, updateAssignments, clearAssignments } = useCompany();
  const { projects } = useProject();
  const { addNotification } = useNotification();
  
  const [distributionResult, setDistributionResult] = useState(null);
  const [showUnassigned, setShowUnassigned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  
   
   const [sidebarOpen, setSidebarOpen] = React.useState(false);
     const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
   
  
  // Memoize sorted companies to avoid unnecessary re-renders
  const sortedCompanies = useMemo(() => 
    [...companies].sort((a, b) => a.rank - b.rank), 
    [companies]
  );

  // Calculate assigned projects count
  const allAssignedProjects = useMemo(() => 
    companies.reduce((acc, company) => acc + (company.assignedProjects?.length || 0), 0),
    [companies]
  );

  // Run distribution algorithm on mount
  useEffect(() => {
    if (companies.length && projects.length) {
      runDistribution();
    }
  }, []); // Empty dependency array to run only once on mount

  const runDistribution = async () => {
    setIsLoading(true);
    try {
      // Clear existing assignments
      await clearAssignments();
      
      // Run distribution algorithm
      const result = distributeProjects(companies, projects);
      setDistributionResult(result);
      
      // Update company assignments
      await updateAssignments(result.companies);
      
      // Handle unassigned projects
      if (result.unassignedProjects.length > 0) {
        addNotification({
          title: 'Unassigned Projects',
          message: `${result.unassignedProjects.length} projects could not be assigned.`,
          severity: 'warning'
        });
        setShowUnassigned(true);
      } else {
        setShowUnassigned(false);
      }
    } catch (error) {
      addNotification({
        title: 'Distribution Error',
        message: 'Failed to distribute projects. Please try again.',
        severity: 'error'
      });
      console.error('Distribution error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        sidebarOpen={sidebarOpen}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarOpen={setSidebarOpen}
        setSidebarCollapsed={setSidebarCollapsed}
      />
      
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:pl-24' : 'lg:pl-64'}`}>
        <main className="py-6 px-4 sm:px-6 lg:px-8">
          <PageHeader 
            title="Project Distribution" 
            description="View and manage project assignments to companies"
            actions={
              <button
                className={`inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isLoading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
                onClick={runDistribution}
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                {isLoading ? 'Distributing...' : 'Run Distribution'}
              </button>
            }
          />
          
          {/* Distribution Summary */}
          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-3">Distribution Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 px-4 py-3 rounded-md">
                <p className="text-sm text-gray-500">Total Projects</p>
                <p className="text-2xl font-semibold text-gray-900">{projects.length}</p>
              </div>
              <div className="bg-green-50 px-4 py-3 rounded-md">
                <p className="text-sm text-gray-500">Assigned Projects</p>
                <p className="text-2xl font-semibold text-gray-900">{allAssignedProjects}</p>
              </div>
              <div className="bg-yellow-50 px-4 py-3 rounded-md">
                <p className="text-sm text-gray-500">Unassigned Projects</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {distributionResult?.unassignedProjects?.length || 0}
                </p>
              </div>
            </div>
          </div>
          
          {/* Company Assignments Table */}
          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-3">Company Assignments</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Projects This Year
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Assigned Projects
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {isLoading ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                        Loading assignments...
                      </td>
                    </tr>
                  ) : sortedCompanies.length > 0 ? (
                    sortedCompanies.map(company => (
                      <tr key={company.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          #{company.rank}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {company.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {company.projectsThisYear}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <AvailabilityBadge available={company.available} />
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {company.assignedProjects?.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {company.assignedProjects.map(project => (
                                <span 
                                  key={project.id}
                                  className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800"
                                  title={project.description}
                                >
                                  {project.name}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-400">No projects assigned</span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                        No companies found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Unassigned Projects */}
          {showUnassigned && distributionResult?.unassignedProjects?.length > 0 && (
            <div className="bg-white p-5 rounded-lg shadow">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-medium text-gray-900">Unassigned Projects</h2>
                <div className="flex items-center text-yellow-600 text-sm">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  <span>These projects could not be assigned</span>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Project
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Priority
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {distributionResult.unassignedProjects.map(project => (
                      <tr key={project.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {project.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          <p className="line-clamp-2">{project.description}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <PriorityBadge priority={project.priority} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default ProjectDistribution;