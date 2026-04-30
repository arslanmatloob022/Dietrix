import type { LeadPayload } from '../types/models'
import { sendClientEmail } from './emailService'

export type LeadResponse = {
    id: string
    createdAt: string
}

export async function submitLead(payload: LeadPayload): Promise<LeadResponse> {
    if (!payload.name.trim()) {
        throw new Error('Please enter your full name.')
    }

    if (!/^\S+@\S+\.\S+$/.test(payload.email)) {
        throw new Error('Please enter a valid email address.')
    }

    if (payload.goal.trim().length < 8) {
        throw new Error('Please tell us a bit more about your goal.')
    }

    await sendClientEmail({
        name: payload.name.trim(),
        email: payload.email.trim(),
        message: [
            'New Dietrix Nutrition contact request',
            `Source: ${payload.source}`,
            `Name: ${payload.name.trim()}`,
            `Email: ${payload.email.trim()}`,
            `Health goal: ${payload.goal.trim()}`,
        ].join('\n'),
    })

    return {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
    }
}
