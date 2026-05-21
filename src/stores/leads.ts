import { defineStore } from 'pinia'
import { submitLead } from '../services/leadService'
import type { LeadPayload } from '../types/models'

type StoredLead = LeadPayload & {
    id: string
    createdAt: string
}

const STORAGE_KEY = 'dietrix_leads'

function readStoredLeads(): StoredLead[] {
    if (typeof localStorage === 'undefined') {
        return []
    }

    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) {
            return []
        }

        const parsed = JSON.parse(raw) as StoredLead[]
        return Array.isArray(parsed) ? parsed : []
    } catch {
        return []
    }
}

export const useLeadStore = defineStore('leads', {
    state: () => ({
        leads: [] as StoredLead[],
        isSubmitting: false,
        error: '',
        successMessage: '',
    }),
    getters: {
        totalLeads: (state) => state.leads.length,
    },
    actions: {
        initialize() {
            this.leads = readStoredLeads()
        },
        async captureLead(payload: LeadPayload) {
            this.error = ''
            this.successMessage = ''
            this.isSubmitting = true

            try {
                const response = await submitLead(payload)
                const lead: StoredLead = {
                    ...payload,
                    id: response.id,
                    createdAt: response.createdAt,
                }
                this.leads.unshift(lead)
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.leads))
                }
                this.successMessage = 'Thanks! We received your request and will contact you shortly.'
            } catch (error) {
                this.error = error instanceof Error ? error.message : 'Something went wrong. Please try again.'
            } finally {
                this.isSubmitting = false
            }
        },
        clearStatus() {
            this.error = ''
            this.successMessage = ''
        },
    },
})
