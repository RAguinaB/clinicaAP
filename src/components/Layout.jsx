import Nav from './Nav'
import { useLocation } from 'react-router-dom'
import RoutesComponent  from '../pages/Routes'


const Layout = () => {
    const location = useLocation()
    return (
        <div className='md:flex md:min-h-screen'>
            <aside className='md:w-1/4 bg-blue-900 px-5 py-10'>
                <h2 className='text-4xl font-black text-center text-white'>Listado</h2>
                <Nav/>
            </aside>

            <main className='md:w-3/4 p-10 md:h-screen overflow-scroll'>
                <RoutesComponent />
            </main>
        </div>
    )
}

export default Layout