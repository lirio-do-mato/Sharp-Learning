import React from 'react'
import Cabecalho from './components/Cabecalho'
import Cores from './data/cores'
import Logo from './components/Logo'
import Blob from './components/Blob'
import './App.css'


export default props =>
    <div className='geral'>
        <Cabecalho
        titulo="Sharp Learning"
        back={Cores.magenta}
        fore={Cores.rosa}/>
        <Logo/>
        <Blob/>
    </div>