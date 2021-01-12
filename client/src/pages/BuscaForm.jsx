import React, { Component } from 'react'
import { Header, Busca, Resultado,Links,formPessoa } from '../components'



class BuscaForm extends Component {

    constructor(props) {
        super(props)
    
        this.state = { pessoa:{} }
     
       
        
      }
    
      handlePessoa = (pessoadata) => {
        this.setState({pessoa: pessoadata.data});
        console.log(pessoadata);
    }
    render() {
        return (
            <div className="container">
                <div className="row" >
                    <Header />
                    <div className="col-md-6"  >
                        <Busca onSelectPessoa={this.handlePessoa}/>
                       
                    </div>
                    <div className="col-md-6">
                        <Resultado pessoa={this.state.pessoa}/>
                    </div>
                </div>
            <div className="row d-flex justify-content-center">
            <Links/>
            </div>
            </div>
        )
    }
}

export default BuscaForm