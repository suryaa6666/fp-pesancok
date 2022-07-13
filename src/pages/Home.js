import React, { useEffect } from 'react'

const Home = () => {

    const getUserData = () => {
        const token = localStorage.getItem('token')
        console.log(token)
    }

    useEffect(() => {
        getUserData()
    }, [])

    return (
        <div>

        </div>
    )
}

export default Home