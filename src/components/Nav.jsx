import { useState } from 'react';
import { Link } from 'react-router-dom'

const Nav = () => {
	const [showPacientesSubMenu, setShowPacientesSubMenu] = useState(false);
	const [showMedicosSubMenu, setShowMedicosSubMenu] = useState(false);
	const [showTurnosSubMenu, setShowTurnosSubMenu] = useState(false)

	return (
		
	<nav className="flex flex-col justify-start mt-10">
		<Link
			className={`${location.pathname === '/' ? 'text-blue-300' : 'text-white'} text-3xl block mt-2 hover:text-blue-300 `} 
            to="/">Inicio
		</Link>
		<Link
			className={`${location.pathname === '/AboutUs' ? 'text-blue-300' : 'text-white'} text-3xl block mt-2 hover:text-blue-300 `} 
            to="/AboutUs">About us
		</Link>
		<div onClick={() => setShowPacientesSubMenu(!showPacientesSubMenu)}>
			<Link 
			className={`${location.pathname === '/pacientes' ? 'text-blue-300' : 'text-white'} text-3xl block mt-2 hover:text-blue-300 `} 
			to="/pacientes">Pacientes
			</Link>
				{showPacientesSubMenu && (
					<div className='flex flex-col font-bold p-3 gap-3'>
						<Link to="pacientes/NuevoPaciente">Nuevo Paciente</Link>
						<Link to="pacientes/ListadoPacientes">Listado Paciente</Link>
					</div>
				)}
		</div>
		<div onClick={() => setShowTurnosSubMenu(!showTurnosSubMenu)}>
		<Link 
			className={`${location.pathname === '/Turnos' ? 'text-blue-300' : 'text-white'} text-3xl block mt-2 hover:text-blue-300 `} 
            to="/Turnos">Turnos
		</Link>
			{showTurnosSubMenu && (
				<div className='flex flex-col font-bold p-3 gap-3'>
					<Link to="turnos/NuevoTurno">Nuevo Turno</Link>
					<Link to="turnos/ListadoTurnos">Listado Turnos</Link>
				</div>
			)}
		</div>
		<div onClick={() => setShowMedicosSubMenu(!showMedicosSubMenu)}>
			<Link 
			className={`${location.pathname === '/medicos' ? 'text-blue-300' : 'text-white'} text-3xl block mt-2 hover:text-blue-300 `} 
			to="/medicos">Medicos
			</Link>
				{showMedicosSubMenu && (
					<div className='flex flex-col font-bold p-3 gap-3'>
						<Link to="medicos/NuevoMedico">Nuevo Medico</Link>
						<Link to="medicos/ListadoMedicos">Listado Medico</Link>
					</div>
				)}
		</div>
		<Link
			className={`${location.pathname === '/Contact' ? 'text-blue-300' : 'text-white'} text-3xl block mt-2 hover:text-blue-300 `} 
			to="/Contact">Contacto
		</Link>	
	</nav>
	)

}
export default Nav;