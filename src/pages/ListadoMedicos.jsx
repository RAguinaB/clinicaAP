import React, { useEffect, useState } from 'react';
import { eliminarMedico } from '../../../clinicaBack/data/medicos';
import EditarMedicoModal from './EditarMedicoModal';
import axios from 'axios';

axios.defaults.withCredentials = true;

function ListadoMedicos() {
  const [medicos, setMedicos] = useState([]);
  const [medicoAEditar, setMedicoAEditar] = useState(null);
  const [busqueda,setBusqueda] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  //Buscar (Sacrificando rendimiento, ganando dinamismo y elegancia)
  const handleSearch = (e) => {
    setBusqueda(e.target.value);
  };

  let medicosAMostrar = medicos;

  if (busqueda) {
    medicosAMostrar = medicos.filter((medico) => {
      const nombreCompleto = `${medico.nombre} ${medico.apellido}`.toLowerCase();
      return nombreCompleto.includes(busqueda.toLowerCase());
    });
  }
  
  //Traer
  const fetchMedicos = () => {
    axios.get('http://localhost:3000/medicos')
      .then(response => {
        setMedicos(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    fetchMedicos();
  }, []);

  //handleSubmit
  const handleSubmit = async (idMedico) => {
    if(window.confirm('¿Deseas eliminar este registro?')) {
        try {
            await eliminarMedico(idMedico);
            console.log('Medico eliminado exitosamente');
            fetchMedicos();
        } catch (error) {
            console.error('Error al eliminar el medico:', error);
        }
    }
  };
  

  return (
    <div>
      <label htmlFor="btnBuscar">
        Buscar Medico
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
          <th className="px-4 py-2">Especialidad</th>
          <th className="px-4 py-2">Notas</th>
          <th className="px-4 py-2">Fecha Nac</th>
          <th className="px-4 py-2">Fecha Alta</th>
          <th className="px-4 py-2">Obra Social</th>
        </tr>
      </thead>
      <tbody>
        {medicosAMostrar.sort((a,b)=> a.id - b.id).map((medico) => (
          <tr className='odd:bg-gray-300' key={medico.id}>
            <td className="border px-4 py-2">{medico.id}</td>
            <td className="border px-4 py-2">{medico.nombre}</td>
            <td className="border px-4 py-2">{medico.apellido}</td>
            <td className="border px-4 py-2">{medico.especialidad}</td>
            <td className="border px-4 py-2">{medico.notas}</td>
            <td className="border px-4 py-2">{new Date(medico.fechanacimiento).toLocaleDateString()}</td>
            <td className="border px-4 py-2">{new Date(medico.fechaalta).toLocaleDateString()}</td>
            <td className="border px-4 py-2">{medico.obrasocial}</td>
            <td className="border px-4 py-2">
              <div className='flex gap-4'>

                <button
                  type="button"
                  className="text-white bg-blue-900 p-3 mb-2 hover:text-yellow-400 uppercase font-bold text-xs rounded-xl"
                  onClick={() => {
                    setIsModalOpen(false);
                    setMedicoAEditar(medico)  
                    setIsModalOpen(true)
                    }       
                  }                     
                  >
                  Editar
                </button>

                <form onSubmit={(event) => {
                  event.preventDefault();
                  handleSubmit(medico.id);
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
  {medicoAEditar && (
    <EditarMedicoModal
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      medico={medicoAEditar}
      onClose={() => {
        setMedicoAEditar(null)
        setIsModalOpen(false);
      }}
      fetchMedicos={fetchMedicos}
    />
  )}
  </div>
  );
}

export default ListadoMedicos;
