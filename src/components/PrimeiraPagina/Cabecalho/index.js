import React from 'react'
import If from '../../If.js'
import './Cabecalho.css'

export default props =>
    <div className="fundo">
        <h1 style={{
            backgroundColor: props.back,
            color: props.fore,
        }}>{props.titulo}</h1>
        <If teste={props.subtitulo === ''}>
            <h2 style={{
            backgroundColor: props.back,
            color: props.fore,
            }}>{props.subtitulo}</h2>
        </If>
        {props.children}
        <style>
            
        </style>
    </div>