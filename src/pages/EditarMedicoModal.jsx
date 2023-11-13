import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

function EditarMedicoModal({ isOpen, setIsOpen, medico, onClose, fetchMedicos }) {
  const [formData, setFormData] = useState(medico);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/medicos/${medico.id}`, formData);
      console.log('Medico actualizado exitosamente:', response.data);
      onClose();
      fetchMedicos();
    } catch (error) {
      console.error('Error al actualizar el medico:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
    <form onSubmit={handleSubmit} className="bg-blue-900 p-6 space-y-4">
      <div className="grid grid-cols-4 gap-4 mb-4">
        <label htmlFor="nombre" className="col-span-1 text-right font-bold pr-4 p-2">
          Nombre
        </label>
        <input id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} className="col-span-3 w-1/3 p-2" />
      </div>
      <div className="grid grid-cols-4 gap-4 mb-4">
    <label htmlFor='apellido' className="col-span-1 text-right font-bold pr-4 p-2">
      Apellido
    </label>
    <input id="apellido" name="apellido" value={formData.apellido} onChange={handleChange} className="col-span-3 w-1/3 p-2" />
  </div>
  <div className="grid grid-cols-4 gap-4 mb-4">
    <label htmlFor="especialidad" className="col-span-1 text-right font-bold pr-4 p-2">
      Especialidad
    </label>
    <input id="especialidad" name="especialidad" value={formData.especialidad} onChange={handleChange} className="col-span-3 w-1/3 p-2" />
  </div>
  <div className="grid grid-cols-4 gap-4 mb-4">
    <label htmlFor='telefono' className="col-span-1 text-right font-bold pr-4 p-2">
      Teléfono
    </label>
    <input id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} className="col-span-3 w-1/3 p-2" />
  </div>
  <div className="grid grid-cols-4 gap-4 mb-4">
    <label htmlFor='notas' className="col-span-1 text-right font-bold pr-4 p-2">
      Notas
    </label>
    <textarea id="notas" name="notas" value={formData.notas} onChange={handleChange} className="col-span-3 w-1/3 p-2 h-20" />
  </div>
  <div className="grid grid-cols-4 gap-4 mb-4">
    <label htmlFor="obraSocial" className="col-span-1 text-right font-bold pr-4 p-2">
      Obra Social
    </label>
    <input id='obraSocial' name="obrasocial" value={formData.obrasocial} onChange={handleChange} className="col-span-3 w-1/3 p-2" />
  </div>
  <div className="grid grid-cols-4 gap-4 mb-4">
    <label htmlFor='fechaNacimiento' className="col-span-1 text-right font-bold pr-4 p-2">
      Fecha de Nacimiento
    </label>
    <input id='fechaNacimiento' name="fechanacimiento" value={formData.fechanacimiento} onChange={handleChange} className="col-span-3 w-1/3 p-2" />
  </div>
  <div className="grid grid-cols-4 gap-4 mb-4">
    <label htmlFor='email' className="col-span-1 text-right font-bold pr-4 p-2">
      Email
    </label>
    <input id='email' autoComplete="email" name="email" value={formData.email} onChange={handleChange} className="col-span-3 w-1/3 p-2" />
  </div>

    <div className="grid grid-cols-4 gap-4 mb-4">
      <div className="col-span-2 flex justify-between mt-4">
        <button type="button" onClick={onClose} className="bg-red-500 text-white p-2 w-1/3 rounded">Descartar Cambios</button>
        <button type="submit" className="bg-green-500 text-white p-2 w-1/3 rounded">Guardar Cambios</button>
      </div>
    </div>
  </form>
  </Modal>
  );
}

export default EditarMedicoModal;
