const { user } = require('../../models')
const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    const schema = Joi.object({
        nama: Joi.string().min(3).required(),
        username: Joi.string().min(3).required(),
        email: Joi.string().email().min(5).required(),
        password: Joi.string().min(4).required()
    })

    const { error } = schema.validate(req.body)

    if (error) {
        return res.status(400).send({
            status: 'error',
            message: error.details[0].message
        })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    try {

        const emailExist = await user.findOne({
            where: {
                email: req.body.email
            },
            attributes: {
                exclude: ["password"]
            }
        })

        if (emailExist) {
            return res.status(400).send({
                status: 'error',
                message: 'email already exist, use another one!'
            })
        }

        const data = await user.create({
            ...req.body,
            password: hashedPassword
        })

        const token = jwt.sign({
            id: data.id,
            email: data.email,
            username: data.username
        }, process.env.TOKEN_KEY)

        res.status(200).send({
            status: 'success',
            message: 'registration success!',
            token
        })
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.toString()
        })
    }
}

exports.login = async (req, res) => {
    try {

        const emailExist = await user.findOne({
            where: { email: req.body.email }
        }
        )

        if (!emailExist) return res.status(400).send({
            status: 'error',
            message: 'email not found!'
        })

        const verify = await bcrypt.compare(req.body.password, emailExist.password)

        const data = await user.findOne({
            where: {
                id: emailExist.id
            },
            attributes: {
                exclude: ["password"]
            }
        }
        )

        if (!verify) return res.status(400).send({
            status: 'error',
            message: 'password incorrect!'
        })

        const token = jwt.sign({
            id: data.id,
            email: data.email,
            username: data.username
        }, process.env.TOKEN_KEY)

        res.status(200).send({
            status: 'success',
            data,
            token
        })
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.toString()
        })
    }
}