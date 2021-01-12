import React, { Component } from 'react'

import { cpfMask, cnpjMask, telefoneMask } from '../helpers/mask'
import { cnpj, cpf } from 'cpf-cnpj-validator';
import api from '../api'
import { Link } from 'react-router-dom'
class pessoaForm extends Component {
 
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            telefone: "",
            datanasc: "",
            nomerazaosocial: "",
            cidade: "",
            tipo: "CPF",
            cpfcnpj: "",
            estados: [],
            cidades: [],
            selectedCidade: "",
            selectedEstado:"",
            invalido:false, 
            desabilitabusca:true
          
        }
console.log(this.props.dataParentToChild)
        this.handlechange = this.handlechange.bind(this);
        this.handleSalvar = this.handleSalvar.bind(this);
        this.handleCidadeChange = this.handleCidadeChange.bind(this);
        this.handleEstadoChange = this.handleEstadoChange.bind(this);

    }
    componentDidMount = async () => {

        this.setState({ isLoading: true, id: this.props.match.params.id });
        await api.getEstados().then(estados => {
            this.setState({
                estados: estados.data.data,
               
            })
        })
        await api.getPessoaById(this.state.id).then(pessoa => {
            this.setState({
                pessoa: pessoa.data.data,
                telefone: pessoa.data.data.telefone, 
                datanasc: pessoa.data.data.datanasc, 
                nomerazaosocial: pessoa.data.data.nomerazaosocial,
                selectedCidade: pessoa.data.data.cidade, 
                tipo: pessoa.data.data.tipo, 
                cpfcnpj: pessoa.data.data.cpfcnpj,
                selectedEstado: pessoa.data.data.estado,
                isLoading: false,
            })
        })
        await api.getEstadosbyId(this.state.selectedEstado).then(estado => {
            this.setState({
                cidades: estado.data.data.cidade,
                
            })

        })
      
        
       
    
}
    handleSalvar = async (e) => {

        e.preventDefault();
        const idpessoa = this.state.id;
        var data = JSON.stringify({
            "tipo": this.state.tipo == "CPF" ? "PF" : "PJ",
            "cidade": this.state.selectedCidade,
            "cpfcnpj": this.state.cpfcnpj,
            "nomerazaosocial": this.state.nomerazaosocial,
            "telefone": this.state.telefone,
            "datanasc": this.state.datanasc,
            "estado":this.state.selectedEstado
        });
        if (idpessoa) {
            await api.updatePessoaById(idpessoa, data).then(pessoa => {
                alert('pessoa atualizada com sucesso')
                
            }).catch(err => {
                console.log('erro');
                alert('Erro ao atualizar pessoa')
            })
        } else {
            await api.insertPessoa(data).then(pessoa => {

                alert('pessoa criada com sucesso')
                this.setState({
                    telefone: "",
            datanasc: "",
            nomerazaosocial: "",
            cidade: "",
             cpfcnpj: "",
            selectedCidade: "",
            selectedEstado:"",
                })
            }).catch(err => {
                console.log('erro');
                alert('Erro ao criar pessoa')
            })
        }

    }
    handleEstadoChange = async (e) => {
console.log(e.target.value)
        await api.getEstadosbyId(e.target.value).then(estado => {
            this.setState({
                cidades: estado.data.data.cidade,
                selectedEstado:estado.data.data.nome
            })

        })
    }
    handleCidadeChange(e) {
        this.setState({ selectedCidade: e.target.value });
    }
    handleBusca= async (e) => {
        e.preventDefault();
      
       
        var data = JSON.stringify({
            "tipo":this.state.tipoPessoa=="CPF"?"PF":"PJ",
            "cidade":this.state.selectedCidade,
            "cpfcnpj":this.state.cpfcnpj
        });
        
        await api.getPessoa(data).then( pessoa=> {
           // this.setState({pessoa:pessoa.data})
            this.props.onSelectPessoa(pessoa.data); 
           
        }).catch(err=>{
            console.log('erro');
            this.props.onSelectPessoa(""); 
        })
    }  
    handlechange(e) {
        
        console.log(e.target.name)
        switch (e.target.name) {
            case "txttelefone":
                this.setState({ telefone: telefoneMask(e.target.value) })
                break;
            case "txtcpfcnpj":
                if (this.state.tipo == "CPF") {
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
            
                break;
            case "txtnomepessoa":
                this.setState({ nomerazaosocial: e.target.value })

                break;
            case "tipopessoa":
                this.setState({ tipo: e.target.value })

                break;
            default:
                this.setState({ datanasc: e.target.value })

                break;
        }

    }
    render() {
       
    
        return (
            
            <div classNameName="container ">
                <form className="form-vertical">
                    <fieldset>
        <legend>Gerenciando  Pessoas  </legend>
        <p>Criação de Pessoa Fisica/Juridica </p>
                        <div className="form-group ">
                            <div className="row" onChange={event => this.handlechange(event)}>
                                <div className="col-md-4 "  >
                                    <label className="radio-inline" >
                                        <input type="radio" name="tipopessoa" id="radios-0" value="CPF" defaultChecked />
                                     Pessoa Fisica
                                </label>
                                </div>
                                <div className="col-md-4 "  >
                                    <label className="radio-inline" >
                                        <input type="radio" name="tipopessoa" id="radios-1" value="CNPJ" />
                                     Pessoa Juridica
                                </label>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">

                            <div className="col-md-4">
                                <label className="control-label" for="txtnomepessoa">Informe o Nome:</label>
                                <input id="txtnomepessoa"
                                    name="txtnomepessoa"
                                    type="text"
                                    placeholder="Informe o Nome"
                                    className="form-control input-md"
                                    required=""
                                    value={this.state.nomerazaosocial}
                                    onChange={this.handlechange} />

                            </div>
                        </div>

                      
                        <div className="form-group">
                        <div className="col-md-4">
                            <b><label className={ this.state.invalido?" col-form-label text-danger":" col-form-label"} for="textinput">Informe o {this.state.tipo}:</label></b>
                            </div>
                            <div className="col-md-4">
                                <input id="txtcpfcnpj" 
                                maxLength="18"
                                name='txtcpfcnpj' value={this.state.cpfcnpj} 
                                onChange={this.handlechange} 
                                type="text" 
                                placeholder={"Informe o " + this.state.tipo} 
                                className={ this.state.invalido?"form-control is-invalid":"form-control input-md" }/>

                            </div>
                            <div className="col-sm-6">
                                <small id="cpfcnpjhelper" className={ this.state.invalido?"text-danger":"d-lg-none "}>
                                    {this.state.tipo} invalido, verifique.
                                </small>
                            </div>
                        </div>
                        <div className="form-group row ml-1">
                            <div className="col-md-1">
                                <label className="col-md-1 control-label" >Estado:</label>
                                <select name="ddrestado" className="form-control" onChange={this.handleEstadoChange} value={this.state.selectedEstado}>
                                    <option value="" disabled selected hidden>UF</option>
                                    {this.state.estados.map(estado => <option value={estado._id} key={estado._id}>{estado.nome}</option>)}
                                </select>
                            </div>
                            <div className="col-md-3">
                                <label className="col-md-3 control-label" >Cidade:</label>
                                <select name="ddrcidade" className="form-control" onChange={this.handleCidadeChange} value={this.state.selectedCidade}>
                                    <option value="" disabled selected hidden>Cidade</option>
                                    {this.state.cidades.map(cidade => <option value={cidade} >{cidade}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className={this.state.id?"d-lg-none":"form-group"}>
                            <label className="col-md-4 control-label" for="txtcpfcnpj">Data de Nascimento:</label>
                            <div className="col-md-4">
                                <input id="txtdtnasc"
                                    name="txtdtnasc"
                                    type="date"
                                    value={this.state.datanasc}
                                    placeholder=""
                                    className="form-control input-md"
                                    onChange={this.handlechange} />

                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-md-4 control-label" for="txttelefone">Informe o Telefone:</label>
                            <div className="col-md-4">
                                <input id="txttelefone"
                                    maxLength="15"
                                    name="txttelefone"
                                    type="text"
                                    value={this.state.telefone}
                                    placeholder="Informe o Telefone"
                                    className="form-control input-md"
                                    dt-prop="telefone"
                                    onChange={this.handlechange} />

                            </div>
                        </div>
                        <div className="form-group">

                            <div className="col-md-12">
                                <button id="btnsalvar" name="btnsalvar" className="btn btn-primary col-md-6" onClick={this.handleSalvar} disabled={this.state.desabilitaSalvar}>Salvar</button>
                            </div>
                            <div className={this.state.id!=""?"d-lg-none":"col-md-12"}>
                                <button id="btnbuscar" name="btnbucar" className="btn btn-primary col-md-6" onClick={this.handleBusca}  disabled={this.state.desabilitabusca}>Buscar</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
                <div className="col-md-12 d-flex flex-row">
                    <div className="row">
                    <Link to="/pessoas" className="p">
                    Lista de Pessoas
                   </Link>
                    </div>
                </div>
            </div>
        )
    }

}

export default pessoaForm;