import React, { Component } from 'react';
import ReactTable from 'react-table-6'
import api from '../api'
import 'react-table-6/react-table.css'

class datalist extends Component{
  
    constructor(props) {
        super(props)
    
        this.state = {pessoas:[],isLoading:false  }
        this.handleClick = this.handleClick.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
       this.getRowsLength = this.getRowsLength.bind(this);
       
      }
      handleGetPessoas= async () => {
        this.setState({ isLoading: true });

        await api.getAllPessoas().then(pessoa => {
            this.setState({
                pessoas: pessoa.data.data,
                isLoading: false,
            })
        })
     
    }
    componentDidMount(){
        this.handleGetPessoas()
    }
    handleDelete= async(id)=>{
        await api.deletePessoaById(id).then( res=> {
            alert('pessoa excluida')
            this.handleGetPessoas();
            
         }).catch(err=>{
             console.log('erro');
             
         })
    }
    handleEdit(e) {
        e.preventDefault()
        window.location.href = `/pessoaPage/${e.target.value}`
       
    }
    handleClick(e) {
        e.preventDefault()

        if (window.confirm(`Esta ação irá excluir o registro, confirma?`)){
               
            this.handleDelete(e.target.value);
            
        }else{
          
            window.location.reload()
        }
    }
  getRowsLength(rows){
    console.log('esta escrendo aqui:'+rows.length)
    if(!rows){
      return(<p>sem registros</p>)
    }
    const columns= [
      {
        Header: 'Tipo',
        accessor: 'tipo',
     
      },
      {
        Header: 'Nome/Razão Social',
        accessor: 'nomerazaosocial',
       
      },
      {
        Header: 'CPF/CNPJ',
        accessor: 'cpfcnpj',
       
      },
      {
        Header: 'Telefone',
        accessor: 'telefone',
    
      },
      {
        Header: 'Cidade',
        accessor: 'cidade',
      
      },
      {
        Header: 'Ações',
        accessor: '_id',
            Cell:({value})=>(<div><button className="btn" size="sm" value={value} onClick={this.handleEdit}>Editar</button><button className="btn" size="sm" value={value} onClick={this.handleClick}>Deletar</button></div>)
      }
    ];
    return( 
      <ReactTable
      data={rows}
      columns={columns}
      defaultPageSize={10}
      showPageSizeOptions={true}
      minRows={0}
  />
        )

  }
render(){
   
      
          const rows= this.state.pessoas
         
          console.log('estas linhas'+rows);
        
          let { data = [] } = rows;
          //console.log(data)
          const tableresponse = rows.length == 11?this.getRowsLength(data):this.getRowsLength(rows);            
        return(
         <div>
         {tableresponse}
         </div>
      );
}
}
export default datalist;