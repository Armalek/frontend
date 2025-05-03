import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCompany } from "../../Context/CompanyContext";
import Navbar from "../../components/Navbar";
import PageHeader from "../../components/PageHeader";
import CompanyCard from "../../components/CompanyCard";
import Modal from "../../components/Modal";
import CompanyForm from "../../components/CompanyForm";

function InstallationCompany() {

    const [sidebarOpen, setSidebarOpen] = React.useState(false);
      const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  const { type } = useParams(); // Get the company type from the URL
  const navigate = useNavigate();
  const { companies, addCompany } = useCompany();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredCompanies = companies.filter(
    (company) => company.type === Installation
  );

  const handleAddCompany = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = (formData) => {
    addCompany({ ...formData, type });
    setIsModalOpen(false);
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
          title={`${type.charAt(0).toUpperCase() + type.slice(1)} Companies`}
          description="Manage companies of this type."
          actions={
            <button
              onClick={handleAddCompany}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Company
            </button>
          }
        />

        {filteredCompanies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filteredCompanies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No companies found for this type.</p>
          </div>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add Company"
        >
          <CompanyForm
            onSubmit={handleSubmit}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
        </main>
      </div>
     
    </div>
  );
}

export default InstallationCompany;
