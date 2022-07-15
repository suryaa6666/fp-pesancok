import { useEffect, useState } from 'react'
import axios from 'axios'
import { decodeToken } from 'react-jwt'
import { Card } from 'react-bootstrap'
import Avatar from "boring-avatars"

const Home = () => {

    const [dataUser, setDataUser] = useState()

    const convertDate = (date) => {
        let yyyy = new Date(date).getFullYear();
        let mm = new Date(date).getMonth() + 1;
        mm = mm < 10 ? "0" + mm : mm;
        let dd = new Date(date).getDate();

        return `${dd}-${mm}-${yyyy}`;
    }

    const getUserData = async () => {
        const token = localStorage.getItem('token')
        const tokenData = decodeToken(token)
        console.log(tokenData)
        const data = await axios({
            url: `http://localhost:7777/api/v1/user/` + `${tokenData.username}`,
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + `${token}`
            }
        })
        console.log(data.data.data)
        setDataUser(data.data.data)
    }

    useEffect(() => {
        getUserData()
    }, [])

    return (
        <div className='d-flex justify-content-center flex-column'>
            <Card style={{ width: '18rem' }} className='mx-auto d-flex justify-content-center align-items-center my-3 p-3'>
                <Avatar
                    size={100}
                    name={`${dataUser?.username}`}
                    variant="marble"
                    colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                />
                <Card.Body>
                    <Card.Title>{dataUser?.username}</Card.Title>
                </Card.Body>
            </Card>
            <h1 className="text-center"> pesanku : </h1>
            {dataUser?.pesan.map((pesan, index) => {
                return (
                    <Card style={{ width: '18rem' }} className='mx-auto d-flex justify-content-center align-items-center my-3 p-3' key={index}>
                        <Card.Body>
                            <Card.Title>{pesan.pesan}</Card.Title>
                            <p>{convertDate(pesan.createdAt)}</p>
                        </Card.Body>
                    </Card>
                )
            })}

        </div>
    )
}

export default Home