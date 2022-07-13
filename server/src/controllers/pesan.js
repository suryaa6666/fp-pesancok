const { pesan, user } = require('../../models')
const Joi = require('joi')

exports.addPesan = async (req, res) => {
    const schema = Joi.object({
        pesan: Joi.string().min(3).required(),
    })

    const { id } = req.params

    const { error } = schema.validate(req.body)

    if (error) {
        return res.status(400).send({
            status: 'error',
            message: error.details[0].message
        })
    }

    try {
        const userExist = await user.findOne({
            where: { id }
        })

        if (!userExist) return res.status(400).send({
            status: 'error',
            message: `user id ${id} doesn't exist!`
        })

        const data = await pesan.create({
            pesan: req.body.pesan,
            idUser: id
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

exports.getPesans = async (req, res) => {
    try {
        const data = await pesan.findAll()
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

exports.getPesan = async (req, res) => {
    try {

        const { id } = req.params

        const data = await pesan.findOne({
            where: { id }
        })

        if (!data) return res.status(400).send({
            status: 'error',
            message: `message with id ${id} is not found!`
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

exports.updatePesan = async (req, res) => {
    try {

        const { id } = req.params

        const data = await pesan.update(req.body, {
            where: { id }
        })


        if (data == 0) {
            return res.status(400).send({
                status: 'error',
                message: `pesan id ${id} not found!`
            })
        }

        res.status(200).send({
            status: 'success',
            message: `pesan with id : ${id} has been updated!`
        })
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.toString()
        })
    }
}

exports.deletePesan = async (req, res) => {
    try {

        const { id } = req.params

        const data = await pesan.destroy({
            where: { id }
        })

        if (data == 0) {
            return res.status(400).send({
                status: 'error',
                message: `pesan id ${id} not found!`
            })
        }

        res.status(200).send({
            status: 'success',
            message: `pesan with id : ${id} has been deleted!`
        })
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.toString()
        })
    }
}



