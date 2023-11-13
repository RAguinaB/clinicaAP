import { Route, Routes, Navigate } from 'react-router-dom'
import News from './News';
import AboutUs from './AboutUs';
import Pacientes from './Pacientes';
import Contacto from './Contact';
import Medicos from './Medicos'
import Turnos from './Turnos'
import ListadoPacientes from './ListadoPacientes';
import ListadoMedicos from './ListadoMedicos'
import ListadoTurnos from './ListadoTurnos'
import NuevoPaciente from './NuevoPaciente';
import NuevoMedico from './NuevoMedico'
import NuevoTurno from './NuevoTurno';


//          <Route path="Editar" element={<EditarPacienteModal />} />       
//          <Route path="Eliminar" element={<EliminarPaciente />} />

const RoutesComponent = () => (
	<Routes>
        <Route path="/news" element={<News />} />
        <Route path="*" element={<Navigate to="/news" />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/pacientes" element={<Pacientes />}>
            <Route path="NuevoPaciente" element={<NuevoPaciente />} />
            <Route path="ListadoPacientes" element={<ListadoPacientes />} />
        </Route>
        <Route path="/medicos" element={<Medicos />}>
            <Route path="NuevoMedico" element={<NuevoMedico />} />
            <Route path="ListadoMedicos" element={<ListadoMedicos />} />
        </Route>
        <Route path="/turnos" element={<Turnos />}>
            <Route path="NuevoTurno" element={<NuevoTurno />} />
            <Route path="ListadoTurnos" element={<ListadoTurnos />} />            
        </Route> 
        <Route path="/contact" element={<Contacto />} />
    </Routes>

)

export default RoutesComponent;