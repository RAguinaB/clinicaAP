import React from 'react';
import Layout from '../components/Layout';
import { BrowserRouter as Router } from 'react-router-dom';
import logoImage from '../assets/Logo.svg'
import '../Index.css'

const Index = () => {
	return (
        <>
		<Router>
			<div className="flex flex-col text-center bg-blue-900 p-10">
				<img src={logoImage} className='w-32 mx-auto border-4 border-black'></img>
				<h1 className='text-5xl mt-5 font-bold'>Clinica Argentina Programa</h1>
				<span className='text-2xl mt-5 underline'>Especialidad en trastornos mentales</span>
			</div>
			<Layout/>
		</Router>
		</>
	)
}
export default Index