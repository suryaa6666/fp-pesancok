import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'

const Pesan = () => {

    const { username } = useParams()

    const navigate = useNavigate()

    const [message, setMessage] = useState()
    const [isSend, setIsSend] = useState(false)

    const getUser = async () => {
        await axios({
            url: `http://localhost:7777/api/v1/user/` + `${username}`,
            method: 'GET'
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
            navigate('/pagenotfound')
        })
    }

    useEffect(() => {
        getUser()
    }, [])

    const handleMessageChange = (e) => {
        setMessage(e.target.value)
    }

    const handleSubmit = async () => {
        await axios({
            url: `http://localhost:7777/api/v1/pesan/` + `${username}`,
            method: 'POST',
            data: {
                pesan: message
            }
        })
        setIsSend(true)
    }

    return (
        <>
            {isSend ? <div className='d-flex vh-100 justify-content-center align-items-center'><h1> Pesan berhasil dikirim! </h1></div> :
                <div className='container px-5'>
                    <div className='d-flex justify-content-center my-5'>
                        <h1>Kirim pesan ke  {username}</h1>
                    </div>
                    <Form.Control
                        as="textarea"
                        placeholder="isikan pesan kamu disini..."
                        style={{ height: '100px' }}
                        onChange={handleMessageChange}
                    />
                    <Button variant="primary" className="w-100 mt-3" onClick={handleSubmit}>Kirim</Button>
                </div>
            }
        </>
    )
}

export default Pesan