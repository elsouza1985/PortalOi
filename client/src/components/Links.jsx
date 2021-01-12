import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class Links extends Component {
    render() {
        return (
            <React.Fragment>
                <Link to="/pessoas" className="d-flex justify-content-center">
                    Gerenciar Pessoas
                </Link>
               
            </React.Fragment>
        )
    }
}

export default Links