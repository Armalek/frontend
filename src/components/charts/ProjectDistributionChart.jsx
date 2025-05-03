import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ProjectDistributionChart({ companies, title = 'Projects Per Company' }) {
  // Sort companies by rank for better visualization
  const sortedCompanies = [...companies].sort((a, b) => a.rank - b.rank);

  const data = {
    labels: sortedCompanies.map(company => company.name),
    datasets: [
      {
        label: 'Assigned Projects',
        data: sortedCompanies.map(company => company.assignedProjects?.length || 0),
        backgroundColor: 'rgba(37, 99, 235, 0.8)',
        borderColor: 'rgba(37, 99, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Projects This Year',
        data: sortedCompanies.map(company => company.projectsThisYear),
        backgroundColor: 'rgba(16, 185, 129, 0.6)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
      }
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
    animation: {
      duration: 1500,
    },
  };

  return (
    <div className="h-80">
      <Bar data={data} options={options} />
    </div>
  );
}

export default ProjectDistributionChart;