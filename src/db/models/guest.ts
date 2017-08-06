import * as mongoose from 'mongoose'

import { IGuest } from '../../types'

const guestSchema = new mongoose.Schema({
    guestName: String,
    guestDisplayName: String,
    hasResponded: Boolean,
    guestCount: Number,
    rsvpCount: Number,
    isBridalGuest: Boolean
})

interface IGuestModel extends IGuest, mongoose.Document { }

export default mongoose.model<IGuestModel>('Guest', guestSchema)
