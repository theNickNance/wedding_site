import * as express from 'express'
import * as config from 'config'
import mongoose = require('mongoose')

import { IGuest, IGuestUpdate } from '../types'

import Guest from './models/guest'

const router = express.Router()
const dbUri = config.get('mongodb.uri') as string
const dbOptions = config.get('mongodb.options') as mongoose.ConnectionOptions

console.log(`connecting to db at ${dbUri}`)

mongoose.Promise = global.Promise
mongoose.connect(dbUri, dbOptions).catch(err => console.error(err))

router.post('/guests', (req, res) => {
    const guest = new Guest(req.body)
    guest.save()
        .then(() => res.status(200).send(guest))
        .catch(err => res.status(500).send(err))
})

router.get('/guests', (req, res) => {
    Guest.find()
        .then(items => res.json(items))
        .catch(err => res.status(500).send(err))
})

router.put('/guests/:_id', async (req, res) => {
    const id = req.params._id
    const guestUpdate = req.body as IGuestUpdate

    console.log(`got id ${id} count ${guestUpdate.rsvpCount}`)

    try {
        const guest = await Guest.findById(id)
        if (guest) {
            guest.rsvpCount = guestUpdate.rsvpCount
            guest.hasResponded = guestUpdate.hasResponded
            await guest.save()
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    } catch (err) {
        res.status(500).send(err)
    }
})

export default router
