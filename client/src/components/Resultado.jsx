import React, { Component } from 'react'


class Resultado extends Component {

    constructor(props){
        super(props)

    }
    loadingResult(pessoa){
        if(pessoa!=undefined){
            return(
                <div className="card">
            <p>Nome: <label>{this.props.pessoa.nomerazaosocial}</label> </p>
            <p>CPF:<label>{this.props.pessoa.cpfcnpj}</label></p>
            <p>Cidade:<label>{this.props.pessoa.cidade}</label></p>
            <p>Telefone:<label>{this.props.pessoa.telefone}</label></p>
            </div>
            )
        }else{
            return(
                <div>
                    <h1>Registro não encontrado</h1>
                </div>
            )
        }
    }
    render() {
        
        return (
            
                <div className="card">
                   {this.loadingResult(this.props.pessoa)}
                </div>
            
        )
    }
}

export default Resultado