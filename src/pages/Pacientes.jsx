import { useNavigate, Outlet } from 'react-router-dom';

const Paciente = () => {
    const navigate = useNavigate();

    return (
        <>
        <div className='mb-10'>
            <button 
                className='bg-blue-900 ml-10 mr-10 p-2 text-white hover:font-bold hover:text-black' 
                onClick={() => 
                navigate('/Pacientes/NuevoPaciente')}
                >Nuevo Paciente
            </button>
            <button
                className='bg-blue-900 mr-10 p-2 text-white hover:font-bold hover:text-black'
                onClick={() => navigate('/Pacientes/ListadoPacientes')}
                >Listar Paciente
            </button>
        </div>
        <Outlet/>
        </>
    );
}

export default Paciente;
