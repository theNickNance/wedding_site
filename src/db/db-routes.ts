import * as express from 'express'
import * as config from 'config'
import * as mongoose from 'mongoose'

import { IGuest, IGuestUpdate } from '../types'

import Guest from './models/guest'

const router = express.Router()
const dbUri = config.get('mongodb') as string

console.log(`connecting to db at ${dbUri}`)
mongoose.connect(dbUri, {useMongoClient: true})

router.post('/guests', (req, res) => {
    const guest = new Guest(req.body)
    guest.save(err => res.send(200))
})

router.get('/guests', (req, res) => {

})

router.put('/guests/:_id', (req, res) => {})

export default router
