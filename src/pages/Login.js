import axios from 'axios'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const Login = () => {

    document.title = 'PesanCok | Login'

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        let data = await axios.post(`http://localhost:7777/api/v1/user`, {
            email,
            password
        })
        console.log(data)
    }

    return (
        <>
            <div className="container d-flex flex-column vh-100 justify-content-center">
                <h1>PesanCok</h1>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control type="email" placeholder="email..." onChange={handleChangeEmail} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="password" placeholder="password..." onChange={handleChangePassword} />
                    </Form.Group>
                    <Button variant="primary" onClick={handleLogin}>Login</Button>
                </Form>
            </div>
        </>
    )
}

export default Login