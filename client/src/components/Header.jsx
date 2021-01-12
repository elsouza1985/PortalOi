import React, { Component } from 'react'
import styled from 'styled-components'


const Container = styled.div.attrs({
    className: 'container',
})``

const Nav = styled.nav.attrs({
    className: 'navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-center',
})`
    margin-bottom: 20 px;
`

class NavBar extends Component {
    render() {
        return (
            <Container>
                <Nav>
                    <h1>Lista pública de telefone</h1>
                </Nav>
            </Container>
        )
    }
}

export default NavBar