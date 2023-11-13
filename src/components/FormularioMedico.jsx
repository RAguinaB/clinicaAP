import React, { useState } from 'react';
import { agregarMedico } from '../../../clinicaBack/data/medicos';
import ErrorPage from './ErrorPage';


const FormularioMedicos = () => {
    const [mensajeError, setMensajeError] = useState(null);
    const [medico, setMedico] = useState({
        nombre: '',
        apellido: '',
        especialidad: '',
        telefono: '',
        notas: '',
        obrasocial: '',
        fechanacimiento: '',
        email: '',
    });

    const handleChange = (e) => {
        setMedico({
            ...medico,
            [e.target.name]: e.target.value
        });
    };

    const resetForm = () => {
        setMedico({
            nombre: '',
            apellido: '',
            especialidad: '',
            telefono: '',
            notas: '',
            obrasocial: '',
            fechanacimiento: '',
            email: '',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await agregarMedico(medico);
            setMensajeError({ texto: 'Medico agregado exitosamente', tipo: 'exito' });
            
            // Reinicia el estado del formulario
            resetForm()
        } catch (error) {
            console.error('Error al agregar el medico:', error);
            if (error.message === 'La fecha de nacimiento no es válida') {
              setMensajeError({ texto: 'Por favor, ingresa una fecha de nacimiento válida.', tipo: 'error' });
            } else {
              setMensajeError({ texto: 'Error al agregar el medico', tipo: 'error' });
            }
          }
      };

    return (    
        <div className="flex">
            <form className="flex flex-col space-y-4 w-1/2" onSubmit={handleSubmit}>
                <label className="font-bold" htmlFor="nombreMedico">Nombre del Medico:</label>
                <input 
                    className="border p-2 mb-2"
                    id="nombreMedico"
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={medico.nombre}
                    onChange={handleChange} 
                    autoComplete='given-name'
                />
                <label className="font-bold" htmlFor='apellidoMedico'>Apellido del Medico:</label>
                <input 
                    className="border p-2 mb-2" 
                    id="apellidoMedico" 
                    type="text" 
                    name="apellido" 
                    placeholder="Apellido" 
                    value={medico.apellido}
                    onChange={handleChange} 
                    autoComplete='family-name'
                />
                <label className="font-bold" htmlFor='especialidadMedico'>Especialidad</label>
                <input 
                    className="border p-2 mb-2" 
                    id="especialidadMedico" 
                    type="text" 
                    name="especialidad" 
                    placeholder="Especialidad"
                    value={medico.especialidad} 
                    onChange={handleChange} 
                    autoComplete='on'
                />
                <label className="font-bold" htmlFor='telefonoMedico'>Telefono</label>
                <input 
                    className="border p-2 mb-2" 
                    id="telefonoMedico" 
                    type="text" 
                    name="telefono" 
                    placeholder="Teléfono" 
                    value={medico.telefono}
                    onChange={handleChange} 
                    autoComplete='tel'
                />
                <label className="font-bold" htmlFor='notasMedico'>Notas del Medico</label>
                <textarea 
                    className="border p-2 mb-2" 
                    id="notasMedico" 
                    name="notas" 
                    placeholder="Ingrese Notas"
                    value={medico.notas}
                    onChange={handleChange}>
                </textarea>
                <label className="font-bold" htmlFor='obraSocialMedico'>Obra Social Medico</label>
                <input 
                    className="border p-2 mb-2" 
                    id="obraSocialMedico" 
                    type="text" 
                    name="obrasocial" 
                    placeholder="Obra Social"
                    value={medico.obrasocial} 
                    onChange={handleChange} 
                    autoComplete='on'
                />
                <label className="font-bold" htmlFor='fechaNacimientoMedico'>Fecha de Nacimiento</label>
                <input 
                    className="border p-2 mb-2" 
                    id="fechaNacimientoMedico" 
                    type="date" 
                    name="fechanacimiento" 
                    value={medico.fechanacimiento}
                    onChange={handleChange} 
                    autoComplete="bday"
                />
                <label className="font-bold" htmlFor='emailMedico'>Email</label>
                <input 
                    className="border p-2 mb-2" 
                    id="emailMedico" 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    value={medico.email}
                    onChange={handleChange} 
                    autoComplete="email"
                />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">Agregar Medico</button>
            </form>

            <div className="h-auto ml-20 mt-10">
                {mensajeError && <ErrorPage mensaje={mensajeError.texto} tipo={mensajeError.tipo} />}
            </div>
        </div>
    );
};

export default FormularioMedicos;
