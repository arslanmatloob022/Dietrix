import type { LeadPayload } from '../types/models'

export type LeadResponse = {
    id: string
    createdAt: string
}

const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))

export async function submitLead(payload: LeadPayload): Promise<LeadResponse> {
    await delay(850)

    if (!payload.name.trim()) {
        throw new Error('Please enter your full name.')
    }

    if (!/^\S+@\S+\.\S+$/.test(payload.email)) {
        throw new Error('Please enter a valid email address.')
    }

    if (payload.goal.trim().length < 8) {
        throw new Error('Please tell us a bit more about your goal.')
    }

    return {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
    }
}
