import React, { useState } from 'react';
import { agregarPaciente } from '../../../clinicaBack/data/pacientes';
import ErrorPage from './ErrorPage';

const FormularioPacientes = () => {
    const [mensajeError, setMensajeError] = useState(null);
    const [paciente, setPaciente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        telefono: '',
        notas: '',
        obrasocial: '',
        fechanacimiento: '',
        fechaalta: '',
        email: ''
    });

    const handleChange = (e) => {
        setPaciente({
            ...paciente,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await agregarPaciente(paciente);
            setMensajeError({ texto: 'Paciente agregado exitosamente', tipo: 'exito' });
            // Reinicia el estado del formulario
            setPaciente({
                nombre: '',
                apellido: '',
                empresa: '',
                telefono: '',
                notas: '',
                obrasocial: '',
                fechanacimiento: '',
                fechaalta: '',
                email: ''
                
            });
        } catch (error) {
            console.error('Error al agregar el paciente:', error);
            if (error.message === 'La fecha de nacimiento no es válida') {
              setMensajeError({ texto: 'Por favor, ingresa una fecha de nacimiento válida.', tipo: 'error' });
            } else {
              setMensajeError({ texto: 'Error al agregar el paciente', tipo: 'error' });
            }
          }
      };

    return (    
        <div className="flex">
            <form className="flex flex-col space-y-4 w-1/2" onSubmit={handleSubmit}>
                <label className="font-bold" htmlFor="nombrePaciente">Nombre del Paciente:</label>
                <input 
                    className="border p-2 mb-2" 
                    id="nombrePaciente" 
                    type="text" 
                    name="nombre" 
                    placeholder="Nombre" 
                    value={paciente.nombre}
                    onChange={handleChange}
                    autoComplete='given-name'
                />
                <label className="font-bold" htmlFor='apellidoPaciente'>Apellido del Paciente:</label>
                <input 
                    className="border p-2 mb-2" 
                    id="apellidoPaciente" 
                    type="text" 
                    name="apellido" 
                    placeholder="Apellido" 
                    value={paciente.apellido}
                    onChange={handleChange} 
                    autoComplete='family-name'
                />
                <label className="font-bold" htmlFor='empresaPaciente'>Empresa(Opcional)</label>
                <input 
                    className="border p-2 mb-2" 
                    id="empresaPaciente" 
                    type="text" 
                    name="empresa" 
                    placeholder="Empresa"
                    value={paciente.empresa}
                    onChange={handleChange} 
                    autoComplete='organization'/>
                <label className="font-bold" htmlFor='telefonoPaciente'>Telefono</label>
                <input 
                    className="border p-2 mb-2" 
                    id="telefonoPaciente" 
                    type="text" 
                    name="telefono" 
                    placeholder="Teléfono"
                    value={paciente.telefono}
                    onChange={handleChange} 
                    autoComplete='tel'
                />
                <label className="font-bold" htmlFor='notasPaciente'>Notas del Paciente</label>
                <textarea 
                    className="border p-2 mb-2" 
                    id="notasPaciente" 
                    name="notas" 
                    placeholder="Ingrese Notas"
                    value={paciente.notas} 
                    onChange={handleChange}>
                </textarea>
                <label className="font-bold" htmlFor='obraSocialPaciente'>Obra Social Paciente</label>
                <input 
                    className="border p-2 mb-2" 
                    id="obraSocialPaciente" 
                    type="text" 
                    name="obrasocial" 
                    placeholder="Obra Social" 
                    value={paciente.obrasocial}
                    onChange={handleChange}
                    autoComplete='on'
                />
                <label className="font-bold" htmlFor='fechaNacimientoPaciente'>Fecha de Nacimiento</label>
                <input 
                    className="border p-2 mb-2" 
                    id="fechaNacimientoPaciente" 
                    type="date" 
                    name="fechanacimiento"
                    value={paciente.fechanacimiento}
                    onChange={handleChange} 
                    autoComplete="bday"
                />
                <label className="font-bold" htmlFor='emailPaciente'>Email</label>
                <input 
                    className="border p-2 mb-2" 
                    id="emailPaciente" 
                    type="email" 
                    name="email" 
                    placeholder="Email"
                    value={paciente.email}
                    onChange={handleChange} 
                    autoComplete="email"
                />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">Agregar Paciente</button>
            </form>

            <div className="h-auto ml-20 mt-10">
                {mensajeError && <ErrorPage mensaje={mensajeError.texto} tipo={mensajeError.tipo} />}
            </div>
        </div>
    );
};

export default FormularioPacientes;
