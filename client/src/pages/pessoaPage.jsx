import React, { Component } from 'react'
import  pessoaForm  from '../components'
import { Link } from 'react-router-dom'


class pessoaPage extends Component {

    constructor(props) {
        super(props)
    
        this.state = { pessoa:{}, data: 'Data from parent' }
        
      }
render(){
    return(
    <div className=" d-flex justify-content-center">
        <div className="card">
        <div className="row text-justify">
            <div >
        <p className="col-md-12   h1">Gerenciando Pessoas Físicas e Jurídicas</p>
        </div>
        <div className="col-md-6 d-flex flex-row-reverse">
        <p>lista de Pessoas</p>
        </div>
      
        <div className="col-md-12">
        <pessoaForm />
     
        </div>
        <div className="col-md-12 d-flex flex-row">
        <Link to="/" className="p">
                    Voltar à tela de pesquisa de Telefone
                </Link>
        </div>
        </div>
        </div>
    </div>
    )
}
}
export default pessoaPage
