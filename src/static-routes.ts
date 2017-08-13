import * as express from 'express'
import * as fs from 'fs'

import { IGuest, IGuestUpdate } from './types'

const router = express.Router()

router.get('/guests', (req, res) => {
    fs.readFile('./fixtures/guests.json', (err, buffer) => {
        const guests = JSON.parse(buffer.toString('utf8')) as Array<IGuest>
        res.setHeader('Content-Type', 'application/json')
        res.json(guests)
    })
})

router.put('/guests/:_id', (req, res) => {
    const id = req.params._id
    const guestUpdate = req.body as IGuestUpdate

    console.log(`got id ${id} count ${guestUpdate.rsvpCount}`)
    res.sendStatus(204)
})

export default router
