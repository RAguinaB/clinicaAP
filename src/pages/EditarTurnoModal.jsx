import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { actualizarTurno } from '../../../clinicaBack/data/turnos';

 /* Función para formatear la fecha
function formatearFecha(fecha) {
  const fechaObj = new Date(fecha);
  const dia = String(fechaObj.getDate()).padStart(2, '0');
  const mes = String(fechaObj.getMonth() + 1).padStart(2, '0');
  const ano = fechaObj.getFullYear();
  return `${ano}-${mes}-${dia}`;
}
*/

function EditarTurnoModal({ isOpen, setIsOpen, turno, onClose, fetchTurnos }) {
  const [formData, setFormData] = useState(turno);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await actualizarTurno(turno.id, formData);
      console.log('Turno actualizado exitosamente:', response.data);
      onClose();
      fetchTurnos();
    } catch (error) {
      console.error('Error al actualizar el turno:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
      <form onSubmit={handleSubmit} className="bg-blue-900 p-6 space-y-4">

      <div className="grid grid-cols-4 gap-4 mb-4">
        <label htmlFor="fecha_turno" className="col-span-1 text-right font-bold pr-4 p-2">
          Fecha del Turno
        </label>
        <input
          id="fecha_turno"
          name="fecha_turno"
          value={formData.fecha_turno}
          onChange={handleChange}
          className="col-span-3 w-1/3 p-2"
        />
      </div>
        <div className="grid grid-cols-4 gap-4 mb-4">
          <label htmlFor="hora_turno" className="col-span-1 text-right font-bold pr-4 p-2">
            Hora del Turno
          </label>
          <input id="hora_turno" name="hora_turno" value={formData.hora_turno} onChange={handleChange} className="col-span-3 w-1/3 p-2" />
        </div>
        <div className="grid grid-cols-4 gap-4 mb-4">
          <label htmlFor="id_paciente" className="col-span-1 text-right font-bold pr-4 p-2">
            ID del Paciente
          </label>
          <input id="id_paciente" name="id_paciente" value={formData.id_paciente} onChange={handleChange} className="col-span-3 w-1/3 p-2" />
        </div>
        <div className="grid grid-cols-4 gap-4 mb-4">
          <label htmlFor="id_medico" className="col-span-1 text-right font-bold pr-4 p-2">
            ID del Médico
          </label>
          <input id="id_medico" name="id_medico" value={formData.id_medico} onChange={handleChange} className="col-span-3 w-1/3 p-2" />
        </div>
        <div className="grid grid-cols-4 gap-4 mb-4">
          <label htmlFor="estado" className="col-span-1 text-right font-bold pr-4 p-2">
            Estado
          </label>
          <select className="border p-2 mb-2" id="estado" name="estado" value={formData.estado} onChange={handleChange}>
            <option value="" disabled>Selecciona un estado</option>
            <option value="programado">Programado</option>
            <option value="completado">Completado</option>
            <option value="cancelado">Cancelado</option>
          </select>   
        </div>
        <div className="grid grid-cols-4 gap-4 mb-4">
          <label htmlFor="notas" className="col-span-1 text-right font-bold pr-4 p-2">
            Notas
          </label>
          <textarea id="notas" name="notas" value={formData.notas} onChange={handleChange} className="col-span-3 w-1/3 p-2 h-20" />
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

export default EditarTurnoModal;
