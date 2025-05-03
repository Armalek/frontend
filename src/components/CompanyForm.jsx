import React, { useState, useEffect } from 'react';
import { FaBuilding, FaStar, FaPhone, FaEnvelope, FaCheck } from 'react-icons/fa';
import { MdNumbers } from 'react-icons/md';

function CompanyForm({ company = null, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    classement: 1,
    Note: 0,
    NumeroTelephone: '',
    Email: '',
    available: true,
    somme :0
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (company) {
      setFormData({
        name: company.name || '',
        classement: company.classement || 1,
        Note: company.Note || 0,
        NumeroTelephone: company.NumeroTelephone || '',
        Email: company.Email || '',
        available: company.available !== undefined ? company.available : true,
      });
    }
  }, [company]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Le nom de l'entreprise est obligatoire.";
    if (!formData.Email) newErrors.Email = "Email est obligatoire.";
    if (!/^\d+$/.test(formData.NumeroTelephone)) newErrors.NumeroTelephone = 'Numéro de téléphone doit être numérique.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const processedData = {
      ...formData,
      classement: Number(formData.classement),
      Note: Number(formData.Note),
      NumeroTelephone: Number(formData.NumeroTelephone),
    };

    onSubmit(processedData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nom d'Entreprise
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaBuilding className="text-gray-400" />
          </div>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full pl-10 p-2 border border-gray-300 rounded-md"
            placeholder="Entrez le nom de l'entreprise"
          />
        </div>
        {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="classement" className="block text-sm font-medium text-gray-700 mb-1">
          Classement
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MdNumbers className="text-gray-400" />
          </div>
          <input
            type="number"
            id="classement"
            name="classement"
            min="1"
            value={formData.classement}
            onChange={handleChange}
            className="w-full pl-10 p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div>
        <label htmlFor="Note" className="block text-sm font-medium text-gray-700 mb-1">
          Note
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaStar className="text-gray-400" />
          </div>
          <input
            type="number"
            id="Note"
            name="Note"
            min="0"
            max="100"
            value={formData.Note}
            onChange={handleChange}
            className="w-full pl-10 p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div>
        <label htmlFor="NumeroTelephone" className="block text-sm font-medium text-gray-700 mb-1">
          Numéro de téléphone
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaPhone className="text-gray-400" />
          </div>
          <input
            type="text"
            id="NumeroTelephone"
            name="NumeroTelephone"
            value={formData.NumeroTelephone}
            onChange={handleChange}
            className="w-full pl-10 p-2 border border-gray-300 rounded-md"
            placeholder="e.g. 0612345678"
          />
        </div>
        {errors.NumeroTelephone && (
          <p className="text-sm text-red-600 mt-1">{errors.NumeroTelephone}</p>
        )}
      </div>

      <div>
        <label htmlFor="Email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaEnvelope className="text-gray-400" />
          </div>
          <input
            type="email"
            id="Email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            className="w-full pl-10 p-2 border border-gray-300 rounded-md"
            placeholder="contact@entreprise.com"
          />
        </div>
        {errors.Email && <p className="text-sm text-red-600 mt-1">{errors.Email}</p>}
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="available"
          name="available"
          checked={formData.available}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="available" className="ml-2 text-sm text-gray-700 flex items-center">
          <FaCheck className="mr-1 text-green-500" />
          Actuellement disponible
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-gray-300 transition-colors"
          onClick={onCancel}
        >
          Annuler
        </button>
        <button
          type="submit"
          className="py-2 px-4 bg-blue-900 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {company ? 'Mettre à jour' : 'Ajouter'}
        </button>
      </div>
    </form>
  );
}

export default CompanyForm;