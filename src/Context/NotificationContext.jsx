import React, { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    const id = Date.now();
    setNotifications(prev => [
      { id, timestamp: new Date(), ...notification },
      ...prev
    ]);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(note => note.id !== id));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  // Check for overloaded companies every time company data changes
  const checkCompanies = (companies) => {
    if (!companies || !Array.isArray(companies)) return;
    
    companies.forEach(company => {
      const assignedCount = company.assignedProjects?.length || 0;
      
      // Alert if a company has more than 3 assigned projects or more than 10 projects this year
      if (assignedCount > 3) {
        const existingNotification = notifications.find(
          n => n.type === 'overload' && n.companyId === company.id && n.reason === 'assigned'
        );
        
        if (!existingNotification) {
          addNotification({
            type: 'overload',
            companyId: company.id,
            reason: 'assigned',
            title: 'Company Overloaded',
            message: `${company.name} has ${assignedCount} assigned projects, which may be too many.`,
            severity: 'warning'
          });
        }
      }
      
      if (company.projectsThisYear > 10) {
        const existingNotification = notifications.find(
          n => n.type === 'overload' && n.companyId === company.id && n.reason === 'yearly'
        );
        
        if (!existingNotification) {
          addNotification({
            type: 'overload',
            companyId: company.id,
            reason: 'yearly',
            title: 'High Yearly Workload',
            message: `${company.name} already has ${company.projectsThisYear} projects this year.`,
            severity: 'info'
          });
        }
      }
      
      // Alert if a company is unavailable
      if (!company.available) {
        const existingNotification = notifications.find(
          n => n.type === 'unavailable' && n.companyId === company.id
        );
        
        if (!existingNotification) {
          addNotification({
            type: 'unavailable',
            companyId: company.id,
            title: 'Company Unavailable',
            message: `${company.name} is currently marked as unavailable.`,
            severity: 'warning'
          });
        }
      }
    });
  };

  return (
    <NotificationContext.Provider value={{ 
      notifications,
      addNotification,
      removeNotification,
      clearNotifications,
      checkCompanies
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}