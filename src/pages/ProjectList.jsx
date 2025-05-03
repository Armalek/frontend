import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProject } from "../Context/ProjectContext";
import Navbar from "../components/Navbar";
import PageHeader from "../components/PageHeader";
import Modal from "../components/Modal";
import ProjectForm from "../components/ProjectForm";
import { Trash2, Edit, Eye, ChevronRight, Plus, ArrowLeft } from "lucide-react";
import SearchBar from "../components/SearchBar";

function ProjectList() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const { projectType } = useParams();
  const navigate = useNavigate();
  const { projects, addProject, updateProject, deleteProject } = useProject();

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Filtrer les projets par type et recherche
  const filteredProjects = projects
    .filter((project) => project.type === projectType)
    .filter((project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleAddProject = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (project) => {
    setSelectedProject(project);
    setIsDeleteModalOpen(true);
  };

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setIsDetailsModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedProject) {
      deleteProject(selectedProject.id);
      setIsDeleteModalOpen(false);
      setSelectedProject(null);
    }
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedProject(null);
  };

  const handleSubmit = (formData) => {
    const projectData = { 
      ...formData, 
      type: projectType,
      duree: Number(formData.duree),
      estimation: Number(formData.estimation),
      consistance: Number(formData.consistance)
    };

    if (editingProject) {
      updateProject({ ...projectData, id: editingProject.id });
    } else {
      addProject(projectData);
    }
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const getTypeTitle = () => {
    switch(projectType) {
      case 'odn': return 'Projets ODN';
      case 'cana': return 'Projets CANA'; 
      case 'installation': return 'Projets Installation';
      default: return 'Projets';
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

      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'}`}>
        <main className="py-6 px-4 sm:px-6 lg:px-8">
          <PageHeader
            title={getTypeTitle()}
            description={`Gérez vos projets ${getTypeTitle()}`}
            actions={
              <div className="flex space-x-4">
                <button
                  onClick={() => navigate('/projects')}
                  className="inline-flex items-center px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour
                </button>
                <button
                  onClick={handleAddProject}
                  className="inline-flex items-center px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter Projet
                </button>
              </div>
            }
          />

          <div className="mb-6">
            <SearchBar 
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={`Rechercher des projets...`}
            />
          </div>

          {filteredProjects.length > 0 ? (
            <div className="mt-6 border rounded-md overflow-hidden">
              <div className="grid grid-cols-6 gap-4 p-4 font-medium bg-gray-300">
                <span>Nom du Projet</span>
                <span>Description</span>
                <span>Durée (jours)</span>
                <span>Statut</span>
                <span>Actions</span>
              </div>
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="grid grid-cols-6 gap-4 p-4 border-b hover:bg-gray-100 items-center"
                >
                  <span className="font-medium">{project.name}</span>
                  <span className="truncate">{project.description}</span>
                  <span>{project.duree}</span>
                  <span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      project.status === 'completed' ? 'bg-green-100 text-green-800' :
                      project.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status === 'completed' ? 'Terminé' :
                       project.status === 'in_progress' ? 'En cours' : 'En attente'}
                    </span>
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditProject(project);
                      }}
                      className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                      title="Modifier"
                    >
                      <Edit className="w-4 h-4"/>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(project);
                      }}
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetails(project);
                      }}
                      className="p-2 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded"
                      title="Détails"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {searchQuery 
                  ? "Aucun projet ne correspond à votre recherche." 
                  : `Aucun projet ${getTypeTitle()} trouvé.`}
              </p>
            </div>
          )}

          {/* Add/Edit Project Modal */}
          <Modal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setEditingProject(null);
            }}
            title={editingProject ? "Modifier Projet" : "Ajouter Projet"}
          >
            <ProjectForm
              project={editingProject}
              onSubmit={handleSubmit}
              onCancel={() => {
                setIsModalOpen(false);
                setEditingProject(null);
              }}
            />
          </Modal>

          {/* Delete Confirmation Modal */}
          <Modal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            title="Confirmer la suppression"
          >
            <div className="space-y-4">
              <p className="text-gray-700">
                Êtes-vous sûr de vouloir supprimer le projet <span className="font-semibold">{selectedProject?.name}</span> ?
              </p>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  onClick={confirmDelete}
                >
                  Supprimer
                </button>
              </div>
            </div>
          </Modal>

          {/* Project Details Modal */}
          <Modal
            isOpen={isDetailsModalOpen}
            onClose={closeDetailsModal}
            title={`Détails du projet ${selectedProject?.name}`}
          >
            {selectedProject && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Description</p>
                    <p className="font-medium">{selectedProject.description}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Durée</p>
                    <p className="font-medium">{selectedProject.duree} jours</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Estimation</p>
                    <p className="font-medium">{selectedProject.estimation} €</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Consistance</p>
                    <p className="font-medium">{selectedProject.consistance}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Statut</p>
                    <p className="font-medium capitalize">{selectedProject.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Priorité</p>
                    <p className="font-medium capitalize">{selectedProject.priority}</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={closeDetailsModal}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            )}
          </Modal>
        </main>
      </div>
    </div>
  );
}

export default ProjectList;