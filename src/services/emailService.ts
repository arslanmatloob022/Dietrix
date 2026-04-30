const CONTACT_EMAIL_ENDPOINT = 'https://reviewflow.store/api/contact/send-email/'

export type ClientEmailPayload = {
    name: string
    email: string
    message: string
}

export async function sendClientEmail(payload: ClientEmailPayload) {
    let response: Response

    try {
        response = await fetch(CONTACT_EMAIL_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
    } catch {
        throw new Error('Could not send your request right now. Please try again.')
    }

    if (!response.ok) {
        let detail = ''

        try {
            detail = await response.text()
        } catch {
            detail = ''
        }

        throw new Error(
            detail || 'Could not send your request right now. Please try again.',
        )
    }
}
