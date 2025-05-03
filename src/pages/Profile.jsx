import { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { Mail, MapPin, Twitter, Github, Calendar, Phone, Edit2, Check, X } from 'lucide-react';
import Navbar from '../components/Navbar';

function Profile() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    address: 'Blida, Algeria',
    email: 'Cahdizineb@email.com',
    phone: '054346512'
  });
  const [tempInfo, setTempInfo] = useState(contactInfo);

  const handleSave = () => {
    setContactInfo(tempInfo);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempInfo(contactInfo);
    setIsEditing(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />
      
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'}`}>
        <main className="py-6 px-4 sm:px-6 lg:px-8">
          {/* Header/Cover Image */}
          <div className="max-w-6xl mx-auto">
            <div 
              className="h-48 w-full bg-cover bg-center rounded-t-lg"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?auto=format&fit=crop&q=80&w=2000&h=400')`
              }}
            />
            
            <div className="bg-white rounded-b-lg shadow-sm border border-t-0">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-end sm:space-x-5 relative">
                  <div className="relative -mt-16">
                    <img
                      className="h-32 w-32 rounded-full ring-4 ring-white bg-white"
                      src="./image/icon.jpg"
                      alt="Profile"
                    />
                  </div>
                  <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                    <div className="sm:hidden md:block mt-6 min-w-0 flex-1">
                      <h1 className="text-2xl font-bold text-gray-900 truncate">Chadi Zineb</h1>
                      <p className="text-gray-500">Administrator</p>
                    </div>
                    <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                      {!isEditing ? (
                        <button
                          onClick={() => setIsEditing(true)}
                          className="inline-flex justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          <Edit2 className="h-5 w-5 mr-2" />
                          Modifier
                        </button>
                      ) : (
                        <div className="flex space-x-2">
                          <button
                            onClick={handleSave}
                            className="inline-flex justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            <Check className="h-5 w-5 mr-2" />
                            Sauvegarder
                          </button>
                          <button
                            onClick={handleCancel}
                            className="inline-flex justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            <X className="h-5 w-5 mr-2" />
                            Annuler
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="hidden sm:block md:hidden mt-6 min-w-0 flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 truncate">Chadi Zineb</h1>
                </div>

                <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Main Content */}
                  <div className="lg:col-span-2">
                    <div className="bg-white shadow rounded-lg p-6 mb-4">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">À propos</h2>
                      <p className="text-gray-600">
                       Administrateur chez Algérie Télécom.
                      </p>
                     
                      <div className="space-y-4">
                        <div className="flex items-start">
                         
                        
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6 mb-10">
                    <div className="bg-white shadow rounded-lg p-6">
                      <div className="space-y-4 ">
                        <div className="flex items-center space-x-3  ">
                          <MapPin className="h-5 w-5 text-blue-600" />
                          {isEditing ? (
                            <input
                              type="text"
                              value={tempInfo.address}
                              onChange={(e) => setTempInfo({...tempInfo, address: e.target.value})}
                              className="flex-1 border rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          ) : (
                            <span className="text-gray-600">{contactInfo.address}</span>
                          )}
                        </div>
                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-blue-600" />
                          {isEditing ? (
                            <input
                              type="email"
                              value={tempInfo.email}
                              onChange={(e) => setTempInfo({...tempInfo, email: e.target.value})}
                              className="flex-1 border rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          ) : (
                            <span className="text-gray-600">{contactInfo.email}</span>
                          )}
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="h-5 w-5 text-blue-600" />
                          {isEditing ? (
                            <input
                              type="tel"
                              value={tempInfo.phone}
                              onChange={(e) => setTempInfo({...tempInfo, phone: e.target.value})}
                              className="flex-1 border rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          ) : (
                            <span className="text-gray-600">{contactInfo.phone}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Profile;