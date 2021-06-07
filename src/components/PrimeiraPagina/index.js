import React from 'react'
import Cabecalho from './Cabecalho'
import Cores from '../../data/cores'
import Logo from './Logo'
import './PrimeiraPagina.css'

export default props =>
    <div className='geral1'> 
        <Cabecalho
        titulo="Sharp Learning"
        back={Cores.magenta}
        fore={Cores.rosa}/>
        <Logo/>
    </div>