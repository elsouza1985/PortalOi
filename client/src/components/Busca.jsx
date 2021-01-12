import React, { Component, useState } from 'react'
import { cpfMask,cnpjMask } from '../helpers/mask'
import EstadoCidade from './EstadoCidade'
import api from '../api'
import { cnpj, cpf } from 'cpf-cnpj-validator';

class Busca extends Component {

    constructor(props) {
        super(props)
    
        this.state = { cpfcnpj: "", tipoPessoa:"CPF", cidade:"",pessoa:{},invalido:false, maxLength:14, desabilitabusca:true }
        this.handlechange = this.handlechange.bind(this);
        this.handlePessoa = this.handlePessoa.bind(this);
        this.handleBusca = this.handleBusca.bind(this);
        this.EstadoCidades = React.createRef();
       
      }
      
    handlechange(e) {
        if (this.state.tipoPessoa == "CPF") {
            this.setState({ cpfcnpj: cpfMask(e.target.value) })
            if (e.target.value.length == 14) {
                if (cpf.isValid(e.target.value)) {
                    console.log('cpf valido')
                    this.setState({ invalido: false, desabilitabusca:false })
                } else {
                    console.log('cpf invalido')
                    this.setState({ invalido: true, desabilitabusca:true })
                }
            }
        } else {
            this.setState({ cpfcnpj: cnpjMask(e.target.value)})
            if (e.target.value.length == 18) {
                if (cnpj.isValid(e.target.value)) {
                    console.log('cnpj valido')
                    this.setState({ invalido: false, desabilitabusca:false })
                } else {
                    console.log('cpf invalido')
                    this.setState({ invalido: true, desabilitabusca:true })
                }
            }
        }
        
    }
        handlePessoa(e){
      
            this.setState({tipoPessoa: e.target.value,cpfcnpj:"",maxLength:14,maxLength:18})
          
        }

    handleBusca= async (e) => {
        e.preventDefault();
        const currentEstadoCidades = this.EstadoCidades.current;
        const cidade = currentEstadoCidades.state.selectedCidade;
       
        var data = JSON.stringify({"tipo":this.state.tipoPessoa=="CPF"?"PF":"PJ","cidade":cidade,"cpfcnpj":this.state.cpfcnpj});
        
        await api.getPessoa(data).then( pessoa=> {
           // this.setState({pessoa:pessoa.data})
            this.props.onSelectPessoa(pessoa.data); 
           
        }).catch(err=>{
            console.log('erro');
            this.props.onSelectPessoa(""); 
        })
    }  
    render() {
        return (
            <div className="container">

                <form className="form-horizontal card ">
                    <fieldset>
                        <div className="form-group ">
                        <div className="row"  onChange={event => this.handlePessoa(event)}>
                            <div className="col-md-4 "  >
                                <label className="radio-inline" >
                                    <input type="radio" name="pf" id="radios-0" value="CPF" defaultChecked />
                                     Pessoa Fisica
                                </label>
                            </div>
                            <div className="col-md-4 "  >
                                <label className="radio-inline" >
                                    <input type="radio" name="pf" id="radios-1" value="CNPJ" />
                                     Pessoa Juridica
                                </label>
                            </div>
                        </div>
                        </div>

                       
                        <div className="form-group row">
                        <div className="col-md-12">
                            <b><label className={ this.state.invalido?" col-form-label text-danger":" col-form-label"} for="textinput">Informe o {this.state.tipoPessoa}:</label></b>
                            </div>
                            <div className="col-md-6">
                                <input id="txtcpfcnpj" 
                                maxLength={this.state.maxLength} 
                                name='txtcpfcnpj' value={this.state.cpfcnpj} 
                                onChange={this.handlechange} 
                                type="text" 
                                placeholder={"Informe o " + this.state.tipoPessoa} 
                                className={ this.state.invalido?"form-control is-invalid":"form-control input-md" }/>

                            </div>
                            <div className="col-sm-6">
                                <small id="cpfcnpjhelper" className={ this.state.invalido?"text-danger":"d-lg-none "}>
                                    {this.state.tipoPessoa} invalido, verifique.
                                </small>
                            </div>
                        </div>

                       
                        <div className="form-group">
                        <EstadoCidade ref={this.EstadoCidades}/>

                        </div>

                        <div className="form-group">

                            <div className="col-md-12">
                                <button id="btnbuscar" name="btnbucar" className="btn btn-primary col-md-6" onClick={this.handleBusca}  disabled={this.state.desabilitabusca}>Buscar</button>
                            </div>
                        </div>

                    </fieldset>
                </form>


            </div>
        )
    }
}

export default Busca