import express from 'express'
import authRoutes from './authentication/auth'
import restaurantsRoutes from './restaurants/restaurants'
import foodRoutes from './restaurants/food'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/restaurants', restaurantsRoutes)
router.use('/restaurants', foodRoutes)

export default router