import React, { useState } from 'react';
import { useCompany } from '../Context/CompanyContext';
import { useProject } from '../Context/ProjectContext';
import { useNotification } from '../Context/NotificationContext';
import PageHeader from '../components/PageHeader';
import Modal from '../components/Modal';
import CompanyForm from '../components/CompanyForm';
import ProjectForm from '../components/ProjectForm';
import PriorityBadge from '../components/PriorityBadge';
import AvailabilityBadge from '../components/AvailabilityBadge';
import { Plus, Edit, Trash, Building2, Briefcase, Bell, X } from 'lucide-react';

function AdminPanel() {
  const { companies, addCompany, updateCompany, deleteCompany } = useCompany();
  const { projects, addProject, updateProject, deleteProject } = useProject();
  const { notifications, removeNotification, clearNotifications } = useNotification();
  
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalMode, setModalMode] = useState('add'); // 'add', 'edit', 'delete'
  
  // Company handlers
  const openCompanyModal = (mode, company = null) => {
    setSelectedCompany(company);
    setModalMode(mode);
    setIsCompanyModalOpen(true);
  };
  
  const handleCompanySubmit = (formData) => {
    if (modalMode === 'add') {
      addCompany(formData);
    } else if (modalMode === 'edit') {
      updateCompany({ ...selectedCompany, ...formData });
    }
    setIsCompanyModalOpen(false);
  };
  
  const handleCompanyDelete = () => {
    if (selectedCompany) {
      deleteCompany(selectedCompany.id);
      setIsCompanyModalOpen(false);
    }
  };
  
  // Project handlers
  const openProjectModal = (mode, project = null) => {
    setSelectedProject(project);
    setModalMode(mode);
    setIsProjectModalOpen(true);
  };
  
  const handleProjectSubmit = (formData) => {
    if (modalMode === 'add') {
      addProject(formData);
    } else if (modalMode === 'edit') {
      updateProject({ ...selectedProject, ...formData });
    }
    setIsProjectModalOpen(false);
  };
  
  const handleProjectDelete = () => {
    if (selectedProject) {
      deleteProject(selectedProject.id);
      setIsProjectModalOpen(false);
    }
  };
  
  return (
    <div>
      <PageHeader 
        title="Admin Panel" 
        description="Manage companies, projects, and system notifications"
      />
      
      {/* Companies Section */}
      <div className="card p-5 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Companies</h2>
          <button
            className="btn btn-primary flex items-center text-sm"
            onClick={() => openCompanyModal('add')}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Company
          </button>
        </div>
        
        <div className="table-container">
          <table className="table-default">
            <thead className="table-head">
              <tr>
                <th className="table-head-cell">Rank</th>
                <th className="table-head-cell">Name</th>
                <th className="table-head-cell">Projects This Year</th>
                <th className="table-head-cell">Status</th>
                <th className="table-head-cell text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {companies.length > 0 ? (
                companies
                .sort((a, b) => a.rank - b.rank)
                .map(company => (
                  <tr key={company.id}>
                    <td className="table-body-cell">#{company.rank}</td>
                    <td className="table-body-cell font-medium">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-1 rounded mr-2">
                          <Building2 className="h-4 w-4 text-blue-600" />
                        </div>
                        {company.name}
                      </div>
                    </td>
                    <td className="table-body-cell">{company.projectsThisYear}</td>
                    <td className="table-body-cell">
                      <AvailabilityBadge available={company.available} />
                    </td>
                    <td className="table-body-cell">
                      <div className="flex justify-end space-x-2">
                        <button
                          className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded"
                          onClick={() => openCompanyModal('edit', company)}
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded"
                          onClick={() => openCompanyModal('delete', company)}
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="table-body-cell text-center py-8 text-gray-500">
                    No companies found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Projects Section */}
      <div className="card p-5 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Projects</h2>
          <button
            className="btn btn-primary flex items-center text-sm"
            onClick={() => openProjectModal('add')}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Project
          </button>
        </div>
        
        <div className="table-container">
          <table className="table-default">
            <thead className="table-head">
              <tr>
                <th className="table-head-cell">Name</th>
                <th className="table-head-cell">Description</th>
                <th className="table-head-cell">Priority</th>
                <th className="table-head-cell text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {projects.length > 0 ? (
                projects.map(project => (
                  <tr key={project.id}>
                    <td className="table-body-cell font-medium">
                      <div className="flex items-center">
                        <div className="bg-green-100 p-1 rounded mr-2">
                          <Briefcase className="h-4 w-4 text-green-600" />
                        </div>
                        {project.name}
                      </div>
                    </td>
                    <td className="table-body-cell">
                      <p className="truncate max-w-xs">{project.description}</p>
                    </td>
                    <td className="table-body-cell">
                      <PriorityBadge priority={project.priority} />
                    </td>
                    <td className="table-body-cell">
                      <div className="flex justify-end space-x-2">
                        <button
                          className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded"
                          onClick={() => openProjectModal('edit', project)}
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded"
                          onClick={() => openProjectModal('delete', project)}
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="table-body-cell text-center py-8 text-gray-500">
                    No projects found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Notifications Section */}
      <div className="card p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
          {notifications.length > 0 && (
            <button
              className="btn btn-ghost flex items-center text-sm"
              onClick={clearNotifications}
            >
              Clear All
            </button>
          )}
        </div>
        
        {notifications.length > 0 ? (
          <div className="space-y-3">
            {notifications.map(notification => (
              <div key={notification.id} className="flex justify-between p-3 border-l-4 border-yellow-400 bg-yellow-50 rounded-r-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Bell className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-yellow-800">{notification.title}</h4>
                    <p className="text-sm text-yellow-700 mt-1">{notification.message}</p>
                    <p className="text-xs text-yellow-500 mt-1">
                      {new Date(notification.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
                <button
                  className="flex-shrink-0 ml-2"
                  onClick={() => removeNotification(notification.id)}
                >
                  <X className="h-4 w-4 text-yellow-400 hover:text-yellow-600" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No notifications at this time.</p>
        )}
      </div>
      
      {/* Company Modal */}
      <Modal
        isOpen={isCompanyModalOpen}
        onClose={() => setIsCompanyModalOpen(false)}
        title={
          modalMode === 'add' ? 'Add Company' :
          modalMode === 'edit' ? 'Edit Company' : 
          'Delete Company'
        }
      >
        {modalMode === 'delete' ? (
          <div>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete <strong>{selectedCompany?.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                className="btn btn-ghost"
                onClick={() => setIsCompanyModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={handleCompanyDelete}
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <CompanyForm
            company={modalMode === 'edit' ? selectedCompany : null}
            onSubmit={handleCompanySubmit}
            onCancel={() => setIsCompanyModalOpen(false)}
          />
        )}
      </Modal>
      
      {/* Project Modal */}
      <Modal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        title={
          modalMode === 'add' ? 'Add Project' :
          modalMode === 'edit' ? 'Edit Project' : 
          'Delete Project'
        }
      >
        {modalMode === 'delete' ? (
          <div>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete <strong>{selectedProject?.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                className="btn btn-ghost"
                onClick={() => setIsProjectModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={handleProjectDelete}
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <ProjectForm
            project={modalMode === 'edit' ? selectedProject : null}
            onSubmit={handleProjectSubmit}
            onCancel={() => setIsProjectModalOpen(false)}
          />
        )}
      </Modal>
    </div>
  );
}

export default AdminPanel;