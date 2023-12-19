import express from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../../../db/index'
import { SECRET } from '../../../config'
import mongoose from 'mongoose'

const router = express.Router()

interface UserTemplate {
        username: string
        password: string,
        order: mongoose.Schema.Types.ObjectId
}

router.post('/signup', async (req, res) => {
        if (!SECRET) return

        const body: UserTemplate = req.body
        const user = await User.findOne({ username: body.username })
        if (!user) {
                const newUser = new User({
                        username: body.username,
                        password: body.password
                })
                newUser.save()
                const token = jwt.sign({ _id: newUser._id }, SECRET, { expiresIn: '5h' });
                res.status(200).json({ message: "User Created Successfully", token: token, username: body.username })
        } else {
                res.status(403).json({ message: "User Already Exists" })
        }
})

router.post('/login', async (req, res) => {
        if (!SECRET) return

        const { username, password } = req.body
        const user = await User.findOne({ username, password })
        if (user) {
                const token = jwt.sign({ _id: user._id }, SECRET, { expiresIn: '5h' });
                res.status(200).json({ message: "Logged In Successfully", token: token, username })
        } else {
                res.status(403).json({ message: 'Invalid username or password' });
        }
})

export default router