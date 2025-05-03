import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCompany } from "../Context/CompanyContext";
import Navbar from "../components/Navbar";
import PageHeader from "../components/PageHeader";
import Modal from "../components/Modal";
import CompanyForm from "../components/CompanyForm";
import { Trash2, Edit, Eye, Mail, Phone, Star, Award, Check, X, Plus } from "lucide-react";

function CompanyType() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const { type } = useParams();
  const navigate = useNavigate();
  const { companies, addCompany, updateCompany, deleteCompany } = useCompany();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const filteredCompanies = companies.filter(
    (company) => company.type === type
  );

  const handleAddCompany = () => {
    setEditingCompany(null);
    setIsModalOpen(true);
  };

  const handleEditCompany = (company) => {
    setEditingCompany(company);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (company) => {
    setSelectedCompany(company);
    setIsDeleteModalOpen(true);
  };

  const handleViewDetails = (company) => {
    setSelectedCompany(company);
    setIsDetailsModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedCompany) {
      deleteCompany(selectedCompany.id);
      setIsDeleteModalOpen(false);
      setSelectedCompany(null);
    }
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedCompany(null);
  };

  const handleSubmit = (formData) => {
    if (editingCompany) {
      updateCompany({ ...formData, id: editingCompany.id, type });
    } else {
      addCompany({ ...formData, type });
    }
    setIsModalOpen(false);
    setEditingCompany(null);
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
            title={`${type} Entreprises`}
            description="Manage companies of this type."
            actions={
              <button
                onClick={handleAddCompany}
                 className="inline-flex items-center px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                 <Plus className="h-4 w-4 mr-2" />
                Ajouter Entreprise
              </button>
            }
          />
             <button
            onClick={() => navigate('/companies')}
            className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-4"
          >
            Retourner à la page d'accueil
          </button>
          {filteredCompanies.length > 0 ? (
            <div className="mt-6 border rounded-md overflow-hidden">
              <div className="grid grid-cols-6 gap-4 p-4 font-medium bg-gray-300">
                <span>Nom d'Entreprise</span>
                <span>Note</span>
                <span>Classement</span>
                <span>Disponible</span>
                <span>Actions</span>
                
              </div>
              {filteredCompanies.map((company) => (
                <div
                  key={company.id}
                  className="grid grid-cols-6 gap-4 p-4 border-b hover:bg-gray-100 items-center"
                >
                  <span className="font-medium">{company.name}</span>
                  <span>{company.Note}</span>
                  <span>#{company.classement}</span>
                  <span>
                    {company.available ? (
                      <span className="text-green-600">Oui</span>
                    ) : (
                      <span className="text-red-600">Non</span>
                    )}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditCompany(company);
                      }}
                      className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4"/>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(company);
                      }}
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetails(company);
                      }}
                      className="p-2 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No companies found for this type.</p>
            </div>
          )}

          {/* Add/Edit Company Modal */}
          <Modal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setEditingCompany(null);
            }}
            title={editingCompany ? "Modifier Entreprise" : "Ajouter Entreprise"}
          >
            <CompanyForm
              company={editingCompany}
              onSubmit={handleSubmit}
              onCancel={() => {
                setIsModalOpen(false);
                setEditingCompany(null);
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
                Êtes-vous sûr de vouloir supprimer la société <span className="font-semibold">{selectedCompany?.name}</span>? 
              </p>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500"
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

          {/* Company Details Modal */}
          <Modal
            isOpen={isDetailsModalOpen}
            onClose={closeDetailsModal}
            title={`Détails de ${selectedCompany?.name}`}
          >
            {selectedCompany && (
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-1/3 space-y-4">
                    <div className="flex items-center">
                      <Award className="h-5 w-5 text-gray-500 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Classement</p>
                        <p className="font-medium">#{selectedCompany.classement}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-gray-500 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Note</p>
                        <p className="font-medium">{selectedCompany.Note}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      {selectedCompany.available ? (
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mr-2" />
                      )}
                      <div>
                        <p className="text-sm text-gray-500">Disponible</p>
                        <p className="font-medium">
                          {selectedCompany.available ? "Oui" : "Non"}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-2/3 space-y-4">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-gray-500 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{selectedCompany.Email || "Non spécifié"}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-gray-500 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Téléphone</p>
                        <p className="font-medium">{selectedCompany.NumeroTelephone || "Non spécifié"}</p>
                      </div>
                    </div>
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

export default CompanyType;