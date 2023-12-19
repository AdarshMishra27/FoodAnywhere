import express from 'express'
import jwt from 'jsonwebtoken'
import { Admin } from '../../../db/index'
import { SECRET } from '../../../config'
import { z } from "zod"

const router = express.Router()

const adminInput = z.object({
        username: z.string().min(1).max(30).email(),
        password: z.string().min(4).max(20),
})

router.post('/signup', async (req, res) => {
        if (!SECRET) return

        const body = req.body

        const parsedInput = adminInput.safeParse(body)
        if (!parsedInput.success) {
                console.log(parsedInput.error);
                res.status(411).json({ error: "user input wrong" })
                return;
        }

        const username = parsedInput.data.username;
        const password = parsedInput.data.password;
        const admin = await Admin.findOne({ username: username })
        if (!admin) {
                const newAdmin = new Admin({
                        username: username,
                        password: password
                })
                newAdmin.save()
                const token = jwt.sign({ _id: newAdmin._id }, SECRET, { expiresIn: '5h' });
                res.status(200).json({ message: "User Created Successfully", token: token, username })
        } else {
                res.status(403).json({ message: "User Already Exists" })
        }
})

router.post('/login', async (req, res) => {
        if (!SECRET) return

        const parsedInput = adminInput.safeParse(req.body)
        if (!parsedInput.success) {
                res.status(411).json({ error: "user input wrong" })
                return;
        }

        const username = parsedInput.data.username;
        const password = parsedInput.data.password;

        const admin = await Admin.findOne({ username, password })
        if (admin) {
                const token = jwt.sign({ _id: admin._id }, SECRET, { expiresIn: '5h' });
                res.status(200).json({ message: "Logged In Successfully", token: token, username })
        } else {
                res.status(403).json({ message: 'Invalid username or password' });
        }
})

export default router