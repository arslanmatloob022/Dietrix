import type { BookingPayload } from '../types/models'

export type BookingResponse = {
    id: string
    createdAt: string
    paymentReady: boolean
}

const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))

export async function submitBooking(payload: BookingPayload): Promise<BookingResponse> {
    await delay(950)

    if (!payload.date || !payload.time) {
        throw new Error('Please select an appointment date and time.')
    }

    if (!/^\S+@\S+\.\S+$/.test(payload.email)) {
        throw new Error('Please enter a valid email address.')
    }

    return {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        paymentReady: true,
    }
}
