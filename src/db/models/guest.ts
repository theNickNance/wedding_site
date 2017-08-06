import * as mongoose from 'mongoose'

const Schema = mongoose.Schema

var GuestSchema   = new Schema({
    guestName: String,
    guestDisplayName: String,
    hasResponded: Boolean,
    guestCount: Number,
    rsvpCount: Number,
    isBridalGuest: Boolean
});

export default mongoose.model('Guest', GuestSchema)
