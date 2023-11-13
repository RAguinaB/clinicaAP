import React, { useEffect, useState } from 'react';
import { eliminarTurno, obtenerTurnos } from '../../../clinicaBack/data/turnos';
import EditarTurnoModal from './EditarTurnoModal'
import axios from 'axios';

function ListadoTurnos() { 
  const [turnos, setTurnos] = useState([]);
  const [turnoAEditar, setTurnoAEditar] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [campoBusqueda, setCampoBusqueda] = useState('estado');
  const [turnosAMostrar, setTurnosAMostrar] = useState([]);


  //Buscar (Sacrificando rendimiento, ganando dinamismo y elegancia)
  const handleSearch = (e) => {
    setBusqueda(e.target.value);
  }

  // Manejador para el cambio en el select
const handleSelectChange = (e) => {
  setCampoBusqueda(e.target.value);
};

useEffect(() => {
  if (busqueda) {
    let turnosFiltrados = turnos.filter((turno) => {
      let valorCampo;
      if (campoBusqueda === 'paciente') {
        // Si el campo de búsqueda es 'paciente', busca tanto en 'nombre_paciente' como en 'apellido_paciente'
        valorCampo = turno['nombre_paciente'] + ' ' + turno['apellido_paciente'];
      } else if (campoBusqueda === 'medico') {
        // Si el campo de búsqueda es 'medico', busca tanto en 'nombre_medico' como en 'apellido_medico'
        valorCampo = turno['nombre_medico'] + ' ' + turno['apellido_medico'];
      } else {
        // Si el campo de búsqueda es 'estado', busca solo en 'estado'
        valorCampo = turno[campoBusqueda];
      }
      return valorCampo ? valorCampo.toLowerCase().includes(busqueda.toLowerCase()) : false;
    });
    setTurnosAMostrar(turnosFiltrados);
  } else {
    setTurnosAMostrar(turnos);
  }
}, [busqueda, campoBusqueda]);



  
    
  //Traer
  const fetchTurnos = async () => {
    try { 
      const turnosData = await obtenerTurnos();
      setTurnos(turnosData);
      setTurnosAMostrar(turnosData);
    } catch (error) {
      console.error('Error al obtener turnos:', error);
    }
  };

  useEffect(() => {
    fetchTurnos();
  }, []);

  //handleSubmit Eliminar
  const handleSubmit = async (idTurno) => {
    if(window.confirm('¿Deseas eliminar este turno?')) {
        try {
            await eliminarTurno(idTurno);
            console.log('Turno eliminado exitosamente');
            fetchTurnos();
        } catch (error) {
          console.error('Error al obtener turnos:', error);
        }
    }
  };
  
  return (
    <div>
      <label htmlFor="btnBuscar" className=''>
        Buscar Turno
        <select id='selectBusqueda' className='ml-5 p-2 border border-black mr-4' onChange={handleSelectChange}>
          <option value="estado">Estado</option>
          <option value="paciente">Paciente</option>
          <option value="medico">Médico</option>
        </select>
        <input id='btnBuscar'
          className='ml-5 p-2 border border-black mr-4' 
          type="text" 
          onChange={handleSearch}/>
      </label>

    <table className="mt-5 table-auto border-collapse border-2 border-gray-500 w-full">
      <thead>
        <tr className="text-2xl">
          <th className="px-4 py-2">ID</th>
          <th className="px-4 py-2">Fecha</th>
          <th className="px-4 py-2">Hora</th>
          <th className="px-4 py-2">Paciente</th>
          <th className="px-4 py-2">Médico</th>
          <th className="px-4 py-2">Estado</th>
        </tr>
      </thead>
      <tbody>
        {turnosAMostrar.sort((a, b) => a.id - b.id).map((turno) => (
          <tr className='odd:bg-gray-200' key={turno.id}>
            <td className="border px-4 py-2">{turno.id}</td>
            <td className="border px-4 py-2">{new Date(turno.fecha_turno).toLocaleDateString()}</td>
            <td className="border px-4 py-2">{turno.hora_turno}</td>
            <td className="border px-4 py-2">{turno.nombre_paciente} {turno.apellido_paciente}</td>
            <td className="border px-4 py-2">{turno.nombre_medico} {turno.apellido_medico}</td>           
            <td className="border px-4 py-2">{turno.estado}</td>
            <td className="border px-4 py-2">
              <div className='flex gap-4'>

              <button
                type="button"
                className="text-white bg-blue-900 p-3 mb-2 hover:text-yellow-400 uppercase font-bold text-xs rounded-xl"
                onClick={() => {
                  setIsModalOpen(false);
                  setTurnoAEditar(turno);
                  setIsModalOpen(true);
                }}
              >
                Editar
              </button>

                <form onSubmit={(event) => {
                  event.preventDefault();
                  handleSubmit(turno.id);
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
    {turnoAEditar && (
      <EditarTurnoModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        turno={turnoAEditar}
        onClose={() => {
          setTurnoAEditar(null);
          setIsModalOpen(false);
        }}
        fetchTurnos={fetchTurnos}
      />
    )}
    </div>
    )
}

    export default ListadoTurnos;
