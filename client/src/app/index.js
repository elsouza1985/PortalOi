import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {BuscaForm, pessoaslist,pessoaPage} from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'
import { Busca, formpessoa } from '../components'


function App() {
    return (
        <Router>
            <Switch>
        
            <Route path="/" exact component={BuscaForm} />
            <Route path="/pessoas" exact component={pessoaslist} />
            <Route path="/pessoaPage" exact component={ pessoaPage}/>
            <Route path="/pessoaPage/:id"  component={pessoaPage} />

          
          </Switch>
        </Router>
    )
}

export default App
