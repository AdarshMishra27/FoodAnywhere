import express from 'express'
import authRoutes from './authentication/auth'
import orderRoutes from './order/order'

const router = express.Router();

router.use('/auth', authRoutes)
router.use('/order', orderRoutes)

export default router