import React, { useEffect, useState } from 'react';
import { eliminarPaciente } from '../../../clinicaBack/data/pacientes';
import EditarPacienteModal from './EditarPacienteModal'
import axios from 'axios';


function ListadoPacientes() { 
  const [pacientes, setPacientes] = useState([]);
  const [pacienteAEditar, setPacienteAEditar] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  //Buscar (Sacrificando rendimiento, ganando dinamismo y elegancia)
  const handleSearch = (e) => {
    setBusqueda(e.target.value);
  };

  let pacientesAMostrar = pacientes;

  if (busqueda) {
    pacientesAMostrar = pacientes.filter((paciente) => {
      const nombreCompleto = `${paciente.nombre} ${paciente.apellido}`.toLowerCase();
      return nombreCompleto.includes(busqueda.toLowerCase());
    });
  }

  //Traer
  const fetchPacientes = () => {
    axios.get('http://localhost:3000/pacientes')
      .then(response => {
        setPacientes(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  const handleSubmit = async (idPaciente) => {
    if(window.confirm('¿Deseas eliminar este registro?')) {
        try {
            await eliminarPaciente(idPaciente);
            console.log('Paciente eliminado exitosamente');
            fetchPacientes();
        } catch (error) {
            console.error('Error al eliminar el paciente:', error);
        }
    }
  };
  

  return (
    <div>
      <label htmlFor="btnBuscar">
        Buscar Paciente
        <input id='btnBuscar' 
        className='mb-5 p-2 border border-black' 
        type="text" 
        placeholder="Nombre y/o Apellido" 
        onChange={handleSearch}/>
      </label>
    <table className="table-auto border-collapse border-2 border-gray-500 w-full">
      <thead>
        <tr className="text-2xl">
          <th className="px-4 py-2">ID</th>
          <th className="px-4 py-2">Nombre</th>
          <th className="px-4 py-2">Apellido</th>
          <th className="px-4 py-2">Empresa</th>
          <th className="px-4 py-2">Notas</th>
        </tr>
      </thead>
      <tbody>
        {pacientesAMostrar.sort((a, b) => a.id - b.id).map((paciente) => (
          <tr className='odd:bg-gray-200' key={paciente.id}>
            <td className="border px-4 py-2">{paciente.id}</td>
            <td className="border px-4 py-2">{paciente.nombre}</td>
            <td className="border px-4 py-2">{paciente.apellido}</td>
            <td className="border px-4 py-2">{paciente.empresa}</td>
            <td className="border px-4 py-2">{paciente.notas}</td>
            <td className="border px-4 py-2">
              <div className='flex gap-4'>

              <button
                type="button"
                className="text-white bg-blue-900 p-3 mb-2 hover:text-yellow-400 uppercase font-bold text-xs rounded-xl"
                onClick={() => {
                  setIsModalOpen(false);
                  setPacienteAEditar(paciente);
                  setIsModalOpen(true)//(prevIsOpen => !prevIsOpen); //Funcion de devolucin de llamada, interesante herramienta
                }}>
                Editar
              </button>

                <form onSubmit={(event) => {
                  event.preventDefault();
                  handleSubmit(paciente.id);
                }}>
                  <button
                    type="submit"
                    className="text-red-700 bg-blue-900 p-3 mb-2 hover:text-red-900 uppercase font-bold text-xs rounded-xl"
                  >
                    Eliminar
                  </button>
                </form>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
  </table>

  {/* Aca viene una hermosa y complicada funcion*/}
  {pacienteAEditar && (
  <EditarPacienteModal
    isOpen={isModalOpen}
    setIsOpen={setIsModalOpen}
    paciente={pacienteAEditar} 
    onClose={() => {
      setPacienteAEditar(null);
      setIsModalOpen(false);
    }}
    fetchPacientes={fetchPacientes}
  />)}
  </div>
  );
}

export default ListadoPacientes;
