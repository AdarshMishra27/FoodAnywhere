import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { SECRET } from '../config'

export const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
        if (!SECRET) return res.sendStatus(403) //secret cannot be undefined though it will be not to fix ts error this line is wriiten

        const authHeader = req.headers.authorization
        if (authHeader) {
                const token = authHeader.split(' ')[1];
                jwt.verify(token, SECRET, function (err, payload) {
                        if (err) {
                                res.sendStatus(403)
                        }

                        if (!payload) {
                                return res.sendStatus(403)
                        }

                        if (typeof payload === "string") {
                                return res.sendStatus(403)
                        }

                        req.headers['_id'] = payload._id;
                        next()
                })
        } else {
                res.sendStatus(401)
        }
}
