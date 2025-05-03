/**
 * Algorithm to distribute projects to companies
 * Prioritizes:
 * 1. Company ranking (higher rank gets priority)
 * 2. Current workload/projects this year (avoid overloading)
 * 3. Availability (only assign to available companies)
 * 4. Project priority (high priority projects assigned first)
 */

const distributeProjects = (companies, projects) => {
  if (!companies.length || !projects.length) {
    return {
      companies: companies,
      unassignedProjects: projects
    };
  }

  // Only consider available companies
  const availableCompanies = companies
    .filter(company => company.available)
    .map(company => ({
      ...company,
      // Initialize or reset assigned projects
      assignedProjects: [],
      // Calculate a capacity score (lower is better)
      capacityScore: company.projectsThisYear * 0.5 + (company.assignedProjects?.length || 0)
    }));

  // Sort projects by priority (High > Medium > Low)
  const priorityWeight = { 'High': 0, 'Medium': 1, 'Low': 2 };
  const sortedProjects = [...projects].sort((a, b) => 
    priorityWeight[a.priority] - priorityWeight[b.priority]
  );

  const unassignedProjects = [];

  // For each project, find the best company
  sortedProjects.forEach(project => {
    if (availableCompanies.length === 0) {
      unassignedProjects.push(project);
      return;
    }

    // Sort companies by a combined score of rank and capacity
    const sortedCompanies = [...availableCompanies].sort((a, b) => {
      // Calculate combined score (lower is better)
      const scoreA = a.rank * 0.6 + a.capacityScore * 0.4;
      const scoreB = b.rank * 0.6 + b.capacityScore * 0.4;
      return scoreA - scoreB;
    });

    // Assign to the best company
    const bestCompany = sortedCompanies[0];
    
    // Update the company's assigned projects
    bestCompany.assignedProjects.push(project);
    
    // Update capacity score after assignment
    bestCompany.capacityScore += 1;
  });

  // Merge assigned companies back with unavailable ones
  const resultCompanies = companies.map(company => {
    const updatedCompany = availableCompanies.find(c => c.id === company.id);
    if (updatedCompany) {
      return updatedCompany;
    }
    return {
      ...company,
      assignedProjects: []
    };
  });

  return {
    companies: resultCompanies,
    unassignedProjects
  };
};

export default distributeProjects;