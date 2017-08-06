export interface IGuest {
    guestName: string
    guestDisplayName: string
    hasResponded: boolean
    guestCount: number
    rsvpCount: number
    isBridalGuest: boolean
}

export interface IGuestUpdate {
    hasResponded: boolean
    rsvpCount: number
}
