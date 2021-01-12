import React, { Component } from 'react'
import { DatatablePage } from '../components'
import { Link } from 'react-router-dom'


class pessoaslist extends Component {

    constructor(props) {
        super(props)
    
        this.state = { pessoa:{} }
        
      }
render(){
    return(
    <div className=" d-flex justify-content-center">
        <div className="card">
        <div className="row d-flex justify-content-center">
            <div >
        <p className="col-md-12   h1">Gerenciando Pessoas Físicas e Jurídicas</p>
        </div>
        <div className="col-md-6 d-flex flex-row-reverse">
        <p>lista de Pessoas</p>
        </div>
        <div className="col-md-6 d-flex flex-row-reverse">
        <Link to="/pessoaPage" >
                    Criar Nova Pessoa
                </Link>
        </div>
        <div className="col-md-12">
        <DatatablePage/>
     
        </div>
        <div className="col-md-12 d-flex justify-content-center">
        <Link to="/" >
                    Voltar à tela de pesquisa de Telefone
                </Link>
        </div>
        </div>
        </div>
    </div>
    )
}
}
export default pessoaslist
