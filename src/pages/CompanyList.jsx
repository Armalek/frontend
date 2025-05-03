import React from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router
import Navbar from "../components/Navbar";
import PageHeader from "../components/PageHeader";

function CompanyList() {

  const [sidebarOpen, setSidebarOpen] = React.useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const navigate = useNavigate();

  const handleShowCompanyList = (type) => {
    navigate(`/companies/${type}`); // Navigate to a specific company type page
  };

  const companyTypes = [
    { type: "Odn", name: "ODN Entreprises", description: "Spécialistes de la fibre et des réseaux" },
    { type: "Cana", name: "CANA Entreprises", description: "Experts civils et architecturaux" },
    { type: "Installation", name: "Installation Entreprises", description: "Specialists en equipment d'installation" },
  ];

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
          title="Entreprises"
          description="Sélectionnez le type d'entreprise"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {companyTypes.map((company) => (
            <div
              key={company.type}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold">{company.name}</h3>
                <p className="text-gray-600 mt-2">{company.description}</p>
              </div>
              <button
                onClick={() => handleShowCompanyList(company.type)}
                className="mt-4 px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Voir La Liste 
              </button>
              
            </div>

          ))}
        </div>
        </main>
      </div>
    </div>
  );
}

export default CompanyList;
