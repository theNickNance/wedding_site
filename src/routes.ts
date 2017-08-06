import * as express from 'express'
import * as fs from 'fs'

import { IGuest } from './types'

const router = express.Router()

router.get('/guests', (req, res) => {
    let guests: Array<IGuest>

    fs.readFile('./fixtures/guests.json', (err, buffer) => {
        guests = JSON.parse(buffer.toString('utf8'))
        res.setHeader('Content-Type', 'application/json');
        res.json(guests)
    })
})

router.put('/guests/:_id', (req, res) => {
    const id = req.params._id
    console.log(`got id ${id}`)
    res.sendStatus(204)
})

export default router
