import axios from 'axios'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    document.title = 'PesanCok | Register'

    const [name, setName] = useState()
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const navigate = useNavigate()

    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    const handleChangeUsername = (e) => {
        setUsername(e.target.value)
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        await axios({
            url: `http://localhost:7777/api/v1/register`,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
                nama: name,
                username,
                email,
                password
            },
            validateStatus: () => true
        }).then((response) => {
            // if error
            if (response.data.status === 'error')
                return console.log(response.data.message)

            // if it's okay :D
            console.log(response.data)
            navigate('/')
        }).catch((error) => {
            console.log(`error : ${error}`)
        })
    }

    return (
        <>
            <div className="container d-flex flex-column vh-100 justify-content-center">
                <h1>PesanCok</h1>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="name..." onChange={handleChangeName} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="username..." onChange={handleChangeUsername} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="email" placeholder="email..." onChange={handleChangeEmail} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="password" placeholder="password..." onChange={handleChangePassword} />
                    </Form.Group>
                    <Button variant="primary" onClick={handleRegister}>Register</Button>
                </Form>
            </div>
        </>
    )
}

export default Register