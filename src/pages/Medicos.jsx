import { useNavigate, redirect, Outlet } from 'react-router-dom';

const Medicos = () => {
    const navigate = useNavigate();

    return (
        <>
        <div className='mb-10'>
            <button 
                className='bg-blue-900 ml-10 mr-10 p-2 text-white hover:font-bold hover:text-black' 
                onClick={() => 
                navigate('/Medicos/NuevoMedico')}
                >Nuevo Medico
            </button>
            <button
                className='bg-blue-900 mr-10 p-2 text-white hover:font-bold hover:text-black'
                onClick={() => navigate('/Medicos/ListadoMedicos')}
                >Listar Medico
            </button>
        </div>
        <Outlet/>
        </>         
    );
}

export default Medicos;
