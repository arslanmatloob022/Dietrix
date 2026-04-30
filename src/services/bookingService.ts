import type { BookingPayload } from '../types/models'
import { sendClientEmail } from './emailService'

export type BookingResponse = {
    id: string
    createdAt: string
    paymentReady: boolean
}

export async function submitBooking(payload: BookingPayload): Promise<BookingResponse> {
    if (!payload.date || !payload.time) {
        throw new Error('Please select an appointment date and time.')
    }

    if (!/^\S+@\S+\.\S+$/.test(payload.email)) {
        throw new Error('Please enter a valid email address.')
    }

    if (payload.healthGoal.trim().length < 8) {
        throw new Error('Please tell us a bit more about your health goal.')
    }

    await sendClientEmail({
        name: payload.name.trim(),
        email: payload.email.trim(),
        message: [
            'New Dietrix Nutrition booking reservation',
            `Name: ${payload.name.trim()}`,
            `Email: ${payload.email.trim()}`,
            `Selected date: ${payload.date}`,
            `Selected time: ${payload.time}`,
            `Primary health goal: ${payload.healthGoal.trim()}`,
            `Additional notes: ${payload.notes.trim() || 'None provided'}`,
        ].join('\n'),
    })

    return {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        paymentReady: true,
    }
}
