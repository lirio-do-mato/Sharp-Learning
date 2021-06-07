import React from 'react'
import PrimeiraPagina from './components/PrimeiraPagina'
import SegundaPagina from './components/SegundaPagina'
import './App.css'


export default props =>
    <div className='geral'>
        <PrimeiraPagina/>
        <SegundaPagina/>
    </div>