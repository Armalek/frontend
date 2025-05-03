import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function ProjectPriorityChart({ projects, title = 'Project Priorities' }) {
  const priorityCounts = {
    High: projects.filter(p => p.priority === 'High').length,
    Medium: projects.filter(p => p.priority === 'Medium').length,
    Low: projects.filter(p => p.priority === 'Low').length,
  };

  const data = {
    labels: Object.keys(priorityCounts),
    datasets: [
      {
        data: Object.values(priorityCounts),
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(37, 99, 235, 0.8)',
        ],
        borderColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(37, 99, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
        }
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
      duration: 1500,
    },
  };

  return (
    <div className="h-80">
      <Pie data={data} options={options} />
    </div>
  );
}

export default ProjectPriorityChart;