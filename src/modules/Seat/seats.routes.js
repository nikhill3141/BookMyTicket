import express from 'express'
import { bookSeat, getAllSeats } from './seats.controller.js'
import { isUserAuthenticated } from '../../middlewares/isUserAuthenticated.js'
const router = express.Router()


router.put('/:id/:name',isUserAuthenticated, bookSeat)                             
router.get('/seats',isUserAuthenticated, getAllSeats)                             


export default router