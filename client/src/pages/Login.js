import axios from 'axios'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    document.title = 'PesanCok | Login'

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const navigate = useNavigate()

    const handleChangeUsername = (e) => {
        setUsername(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        await axios({
            url: `http://localhost:7777/api/v1/login`,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
                username,
                password
            },
            validateStatus: () => true
        }).then((response) => {
            // if error
            if (response.data.status === 'error')
                return console.log(response.data.message)

            // if it's okay :D
            // console.log(response.data)

            // set token to localstorage
            localStorage.setItem('token', response.data.token)
            navigate('/home')
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
                        <Form.Control type="text" placeholder="username..." onChange={handleChangeUsername} />
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