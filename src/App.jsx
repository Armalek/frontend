import { useState } from 'react';
import { Routes, Route, Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import CompanyList from './pages/CompanyList';
import ProjectList from './pages/ProjectList';
import ProjectDistribution from './pages/ProjectDistribution';
import Users from './pages/Users';
import Profile from './pages/Profile';
;
import { CompanyProvider } from './Context/CompanyContext';
import { ProjectProvider } from './Context/ProjectContext';
import { NotificationProvider } from './Context/NotificationContext';
import { AuthProvider } from './Context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import CompanyType from './pages/CompanyType';
import ProjectTypes from './pages/ProjectTypes';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <CompanyProvider>
      <ProjectProvider>
        <NotificationProvider>
          
           
           

              <AuthProvider>
              
                <Routes>
                <Route path="/" element={<Login />  } />
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                    } />
                  <Route path="/companies" element={
                     <ProtectedRoute>
                     <CompanyList />
                   </ProtectedRoute>
                   } />
                    <Route path="/companies/:type" element={
                        <ProtectedRoute>
                      <CompanyType />
                      </ProtectedRoute>
                    } />
                   
                  <Route path="/projects" element={
                    <ProtectedRoute>
                    <ProjectTypes />
                  </ProtectedRoute>
                    } />
                    <Route path="/projects/:projectType" element={
                      <ProtectedRoute>
                      <ProjectList />
                      </ProtectedRoute>
                    } />
                     
                  <Route path="/distribution" element={
                     <ProtectedRoute>
                     <ProjectDistribution />
                   </ProtectedRoute>
                    } />
                  <Route path="/users" element={
                     <ProtectedRoute>
                     <Users />
                   </ProtectedRoute>
                    } />
                  <Route path="/profile" element={
                     <ProtectedRoute>
                     <Profile />
                   </ProtectedRoute>
                   } />
                  
                    
                </Routes>
                
                </AuthProvider>
                
              
          
        </NotificationProvider>
      </ProjectProvider>
    </CompanyProvider>
  );
}

export default App;