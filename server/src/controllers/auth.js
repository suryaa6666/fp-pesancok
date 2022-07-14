const { user } = require('../../models')
const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
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

        const usernameExist = await user.findOne({
            where: {
                username: req.body.username
            },
        })

        const emailExist = await user.findOne({
            where: {
                email: req.body.email
            },
        })

        if (usernameExist) {
            return res.status(400).send({
                status: 'error',
                message: 'username already exist, use another one!'
            })
        }

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

        const usernameExist = await user.findOne({
            where: { username: req.body.username }
        }
        )

        if (!usernameExist) return res.status(400).send({
            status: 'error',
            message: 'username not found!'
        })

        const verify = await bcrypt.compare(req.body.password, usernameExist.password)

        if (!verify) return res.status(400).send({
            status: 'error',
            message: 'password incorrect!'
        })

        const data = await user.findOne({
            where: {
                id: usernameExist.id
            },
            attributes: {
                exclude: ["password"]
            }
        }
        )

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