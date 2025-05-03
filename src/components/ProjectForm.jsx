import React, { useState, useEffect } from 'react';

function ProjectForm({ project = null, onSubmit, onCancel, companies = [] }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duree: '',
    estimation: '',
    consistance: '',
   
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || '',
        description: project.description || '',
        duree: project.duree?.toString() || '',
        estimation: project.estimation?.toString() || '',
        consistance: project.consistance?.toString() || '',
        
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['name', 'description', 'duree', 'estimation', 'consistance'];
    
    requiredFields.forEach(field => {
      if (!formData[field]?.toString().trim()) {
        newErrors[field] = 'Ce champ est obligatoire';
      }
    });

    // Validation numérique
    const numericFields = ['duree', 'estimation', 'consistance'];
    numericFields.forEach(field => {
      const value = formData[field];
      if (value && (isNaN(value) || Number(value) <= 0)) {
        newErrors[field] = 'Doit être un nombre positif';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    onSubmit({
      ...formData,
      duree: formData.duree,
      estimation: formData.estimation,
      consistance: formData.consistance
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nom du projet *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description *
        </label>
        <textarea
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Durée (jours) *
          </label>
          <input
            type="number"
            name="duree"
            min="1"
            value={formData.duree}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.duree ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.duree && <p className="mt-1 text-sm text-red-600">{errors.duree}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estimation (€) *
          </label>
          <input
            type="number"
            name="estimation"
            min="0"
            step="0.01"
            value={formData.estimation}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.estimation ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.estimation && <p className="mt-1 text-sm text-red-600">{errors.estimation}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Consistance *
          </label>
          <input
            type="number"
            name="consistance"
            min="0"
            value={formData.consistance}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.consistance ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.consistance && <p className="mt-1 text-sm text-red-600">{errors.consistance}</p>}
        </div>
      </div>

      

      

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {project ? 'Enregistrer' : 'Ajouter'}
        </button>
      </div>
    </form>
  );
}

export default ProjectForm;