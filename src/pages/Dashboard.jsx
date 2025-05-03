import React from "react";
import { useCompany } from "../Context/CompanyContext";
import { useProject } from "../Context/ProjectContext";
import { useNotification } from "../Context/NotificationContext";
import PageHeader from "../components/PageHeader";
import ProjectDistributionChart from "../components/charts/ProjectDistributionChart";
import ProjectPriorityChart from "../components/charts/ProjectPriorityChart";
import { Building2, Briefcase, GitCompare, AlertCircle } from "lucide-react";
import Navbar from "../components/Navbar";

function Dashboard() {
  const { companies } = useCompany();
  const { projects } = useProject();
  const { notifications } = useNotification();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  // Calculate metrics
  const totalCompanies = companies.length;
  const availableCompanies = companies.filter((c) => c.available).length;
  const totalProjects = projects.length;
  const assignedProjects = companies.reduce(
    (total, company) => total + (company.assignedProjects?.length || 0),
    0
  );

  // Get top 3 ranked companies
  const topCompanies = [...companies]
    .sort((a, b) => a.rank - b.rank)
    .slice(0, 3);

  // Get high priority projects
  const highPriorityProjects = projects.filter(
    (p) => p.priority === "High"
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />
      
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'}`}>
        <main className="py-6 px-4 sm:px-6 lg:px-8">
          <PageHeader
            title="Dashboard"
            description="Overview of project distribution and company statuses"
          />
         
          {/* Summary Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
            <div className="bg-white p-5 rounded-lg shadow">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Companies</h3>
                  <div className="mt-1 flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">
                      {totalCompanies}
                    </p>
                    <p className="ml-2 text-sm text-gray-600">
                      ({availableCompanies} available)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-lg shadow">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full">
                  <Briefcase className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Projects</h3>
                  <div className="mt-1 flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">
                      {totalProjects}
                    </p>
                    <p className="ml-2 text-sm text-gray-600">
                      ({highPriorityProjects} high priority)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-lg shadow">
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-full">
                  <GitCompare className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Assigned</h3>
                  <div className="mt-1 flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">
                      {assignedProjects}
                    </p>
                    <p className="ml-2 text-sm text-gray-600">
                      of {totalProjects} projects
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-lg shadow">
              <div className="flex items-center">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <AlertCircle className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Alerts</h3>
                  <div className="mt-1">
                    <p className="text-2xl font-semibold text-gray-900">
                      {notifications.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-5 rounded-lg shadow">
              <ProjectDistributionChart companies={companies} />
            </div>
            <div className="bg-white p-5 rounded-lg shadow">
              <ProjectPriorityChart projects={projects} />
            </div>
          </div>

          {/* Top Companies and Notifications */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Top Ranked Companies
              </h3>
              <div className="space-y-4">
                {topCompanies.map((company) => (
                  <div
                    key={company.id}
                    className="flex items-center p-3 border border-gray-200 rounded-lg"
                  >
                    <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-blue-100 text-blue-600">
                      #{company.rank}
                    </div>
                    <div className="ml-4">
                      <h4 className="text-md font-medium text-gray-900">
                        {company.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {company.projectsThisYear} projects this year
                      </p>
                    </div>
                    <div className="ml-auto">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          company.available 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {company.available ? "Available" : "Unavailable"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-5 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Recent Notifications
              </h3>
              {notifications.length > 0 ? (
                <div className="space-y-3">
                  {notifications.slice(0, 5).map((notification) => (
                    <div
                      key={notification.id}
                      className="flex p-3 border-l-4 border-yellow-400 bg-yellow-50 rounded-r-md"
                    >
                      <div className="flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-yellow-400" />
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-yellow-800">
                          {notification.title}
                        </h4>
                        <p className="text-sm text-yellow-700 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-yellow-500 mt-1">
                          {new Date(notification.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No notifications at this time.</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;