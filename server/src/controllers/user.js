const { user, pesan } = require('../../models')
const jwt = require('jsonwebtoken')

exports.getUsers = async (req, res) => {
    try {
        const data = await user.findAll({
            include: {
                as: 'pesan',
                model: pesan,
            },
            attributes: {
                exclude: ["password"]
            }
        })
        res.status(200).send({
            status: 'success',
            data
        })
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.toString()
        })
    }
}

exports.getUser = async (req, res) => {
    try {

        const { username } = req.params

        if (username != req.user.username) return res.status(400).send({
            status: 'error',
            message: 'user tidak ditemukan!'
        })

        const data = await user.findOne({
            where: { username },
            include: {
                as: 'pesan',
                model: pesan,
            },
            attributes: {
                exclude: ["password"]
            }
        })

        if (!data) return res.status(400).send({
            status: 'error',
            message: 'user tidak ditemukan!'
        })

        res.status(200).send({
            status: 'success',
            data
        })
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.toString()
        })
    }
}

exports.updateUser = async (req, res) => {
    try {

        const { id } = req.params

        const data = await user.update(req.body, {
            where: { id }
        })

        if (data == 0) {
            return res.status(400).send({
                status: 'error',
                message: `user id ${id} not found!`
            })
        }

        res.status(200).send({
            status: 'success',
            message: `user with id : ${id} has been updated!`
        })
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.toString()
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {

        const { id } = req.params

        const data = await user.destroy({
            where: { id }
        })

        if (data == 0) {
            return res.status(400).send({
                status: 'error',
                message: `user id ${id} not found!`
            })
        }

        res.status(200).send({
            status: 'success',
            message: `user with id : ${id} has been deleted!`
        })
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.toString()
        })
    }
}



