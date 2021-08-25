import React from 'react'
import Cabecalho from './components/Cabecalho'
import Cores from './data/cores'
import Logo from './components/Logo'
import Blob from './components/Blob'
import './App.css'
import Corpo from './components/Corpo'


export default props =>
    <div className='geral'>
        <Cabecalho
        titulo="Sharp Learning"
        back={Cores.magenta}
        fore={Cores.rosa}/>
        <Logo/>
        <Blob/>
        <Corpo/>
        <Cabecalho
        titulo="A pesquisa"
        back={Cores.bege}
        fore={Cores.roxo}/>
    </div>