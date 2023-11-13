import React, { useEffect, useState } from 'react';
import { agregarTurno } from '../../../clinicaBack/data/turnos';
import { obtenerMedicos } from '../../../clinicaBack/data/medicos';
import ErrorPage from './ErrorPage';

const FormularioTurnos = () => {
    const [mensajeError, setMensajeError] = useState(null);
    const [medicos, setMedicos] = useState([]);
    const [turno, setTurno] = useState({
        fecha_turno: '',
        hora_turno: '',
        id_paciente: '',
        id_medico: '',
        estado: '',
        notas: ''
    });

    //Traer medicos para el select
    useEffect(() => {
        obtenerMedicos()
        .then(data => {
        setMedicos(data);
        })
        .catch(error => {
        console.error('Error:', error);
        });
    }, []);
    
    //Manejador
    const handleChange = (e) => {
        setTurno({
            ...turno,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await agregarTurno(turno);
            setMensajeError({ texto: 'Turno agregado exitosamente', tipo: 'exito' });
            // Reinicia el estado del formulario
            setTurno({
                fecha_turno: '',
                hora_turno: '',
                id_paciente: '',
                id_medico: '',
                estado: '',
                notas: ''
            });
        } catch (error) {
            console.error('Error al agregar el turno:', error);
            setMensajeError({ texto: 'Error al agregar el turno', tipo: 'error' });
        }
    };

    return (
        <div className="flex">
            <form className="flex flex-col space-y-4 w-1/2" onSubmit={handleSubmit}>
                <label className="font-bold" htmlFor="fechaTurno">Fecha del Turno:</label>
                <input
                    className="border p-2 mb-2"
                    id="fechaTurno"
                    type="date"
                    name="fecha_turno"
                    value={turno.fecha_turno}
                    onChange={handleChange}
                />
                <label className="font-bold" htmlFor='horaTurno'>Hora del Turno:</label>
                <input 
                    className="border p-2 mb-2" 
                    id="horaTurno" 
                    type="time" 
                    name="hora_turno" 
                    value={turno.hora_turno}
                    onChange={handleChange}
                />
                <label className="font-bold" htmlFor='idPaciente'>ID del Paciente:</label>
                <input 
                    className="border p-2 mb-2" 
                    id="idPaciente" 
                    type="number" 
                    name="id_paciente" 
                    value={turno.id_paciente}
                    onChange={handleChange}
                />
                <label className="font-bold" htmlFor='id_medico'>ID del Médico:</label>
                <select id="id_medico" name="id_medico" defaultValue="" onChange={handleChange}>
                <option value="" disabled>Selecciona un médico</option>    
                {medicos.map((medico) => (
                    <option key={medico.id} value={medico.id}>
                    {medico.nombre} {medico.apellido}
                    </option>
                    ))} 
                </select>

                <label className="font-bold" htmlFor='estado'>Estado:</label>
                <select className="border p-2 mb-2" id="estado" name="estado" value={turno.estado} onChange={handleChange}>
                    <option value="" disabled>Selecciona un estado de turno</option>
                    <option value="programado">Programado</option>
                    <option value="completado">Completado</option>
                    <option value="cancelado">Cancelado</option>
                </select>
                <label className="font-bold" htmlFor='notas'>Notas:</label>
                <textarea 
                    className="border p-2 mb-2" 
                    id="notas" 
                    name="notas" 
                    placeholder="Ingrese Notas" 
                    value={turno.notas}
                    onChange={handleChange}></textarea>
                <button className="p-2 bg-blue-500 text-white mt-4" type="submit">Agregar Turno</button>
            </form>
            <div className="h-auto ml-20 mt-10">
                {mensajeError && <ErrorPage mensaje={mensajeError.texto} tipo={mensajeError.tipo} />}
            </div>
        </div>
    );
}

export default FormularioTurnos