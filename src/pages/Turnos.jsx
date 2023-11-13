import { useNavigate, Outlet } from 'react-router-dom';

const Turnos = () => {
    const navigate = useNavigate();

    return (
        <>
        <div className='mb-10'>
            <button 
                className='bg-blue-900 ml-10 mr-10 p-2 text-white hover:font-bold hover:text-black' 
                onClick={() => 
                navigate('/Turnos/NuevoTurno')}
                >Nuevo Turno
            </button>
            <button
                className='bg-blue-900 mr-10 p-2 text-white hover:font-bold hover:text-black'
                onClick={() => navigate('/Turnos/ListadoTurnos')}
                >Listar Turnos
            </button>
        </div>
        <Outlet/>
        </>
    );
}

export default Turnos;
