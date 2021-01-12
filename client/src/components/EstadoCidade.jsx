import React, { Component } from 'react'
import api from '../api'


class EstadoCidade extends Component {

    constructor(props){
        super(props)
        this.state = {
            estados:[],
            cidades:[],
            selectedCidade:"",
            isLoading: false
        }
        this.handleEstadoChange = this.handleEstadoChange.bind(this);
        this.handleCidadeChange = this.handleCidadeChange.bind(this);
    }
    handleEstadoChange= async (e) => {
      
        await api.getEstadosbyId(e.target.value).then(estado => {
            this.setState({
                cidades: estado.data.data.cidade,
            
            })
           
        })
    }
    handleCidadeChange(e){
        this.setState({selectedCidade:e.target.value});
    }
    componentDidMount = async () => {
        this.setState({ isLoading: true });

        await api.getEstados().then(estados => {
            this.setState({
                estados: estados.data.data,
                isLoading: false,
            })
        })
    }
    renderEstadosList(estadosList){
        return (
            <select  name="ddrestado" class="form-control"  onChange={this.handleEstadoChange}>
                <option value="" disabled selected hidden>UF</option>
                {estadosList.map(estado => <option value={estado._id} key={estado._id}>{estado.nome}</option>)}
            </select>
        )

    }
  
    render() {
        let contents = this.state.isLoading ? <p><em>Loading...</em></p>
            : this.renderEstadosList(this.state.estados);
        return (
          
                <div class="d-flex justify-content-left">
                    <div class="">
                        {contents}
                    </div>
                    <div class="">
                        <select name="ddrcidade" class="form-control" onChange={this.handleCidadeChange} >
                            <option value="" disabled selected hidden>Cidade</option>
                            {this.state.cidades.map(cidade => <option value={cidade} >{cidade}</option>)}
                        </select>
                    </div>
                </div>
         
        )

    }
}
export default EstadoCidade