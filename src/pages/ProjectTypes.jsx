import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Navbar from '../components/Navbar';

function ProjectTypes() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  
  const projectTypes = [
    {
      id: 'odn',
      title: 'Projet ODN',
      description: 'Gestion des projets ODN',
      color: 'bg-blue-100 text-blue-800',
      icon: '📊' // Ajout d'une icône pour plus de visibilité
    },
    {
      id: 'cana',
      title: 'Projet CANA',
      description: 'Gestion des projets CANA',
      color: 'bg-green-100 text-green-800',
      icon: '📶'
    },
    {
      id: 'installation',
      title: 'Projet Installation',
      description: 'Gestion des projets Installation',
      color: 'bg-purple-100 text-purple-800',
      icon: '🛠️'
    }
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
            title="Types de Projets" 
            description="Sélectionnez un type de projet à gérer"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {projectTypes.map((type) => (
              <div 
                key={type.id} 
                className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
              >
                <div className={`p-4 ${type.color} flex items-center`}>
                  <span className="text-2xl mr-3">{type.icon}</span>
                  <h3 className="text-lg font-semibold">{type.title}</h3>
                </div>
                <div className="p-4 bg-white flex-grow flex flex-col">
                  <p className="text-gray-600 mb-4 flex-grow">{type.description}</p>
                  <Link
                    to={`/projects/${type.id}`}
                    className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Voir les projets
                    <span className="ml-2">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
          
          </div>
        </main>
      </div>
    </div>
  );
}

export default ProjectTypes;