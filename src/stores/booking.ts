import { defineStore } from 'pinia'
import { submitBooking } from '../services/bookingService'
import type { BookingPayload } from '../types/models'

type StoredBooking = BookingPayload & {
    id: string
    createdAt: string
    paymentReady: boolean
}

const STORAGE_KEY = 'dietrix_bookings'

function readBookings(): StoredBooking[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) {
            return []
        }

        const parsed = JSON.parse(raw) as StoredBooking[]
        return Array.isArray(parsed) ? parsed : []
    } catch {
        return []
    }
}

export const useBookingStore = defineStore('bookings', {
    state: () => ({
        selectedDate: '',
        selectedTime: '',
        bookings: [] as StoredBooking[],
        isSubmitting: false,
        error: '',
        successMessage: '',
    }),
    actions: {
        initialize() {
            this.bookings = readBookings()
        },
        setSlot(date: string, time: string) {
            this.selectedDate = date
            this.selectedTime = time
            this.error = ''
        },
        async createBooking(payload: BookingPayload) {
            this.error = ''
            this.successMessage = ''
            this.isSubmitting = true

            try {
                const response = await submitBooking(payload)
                const booking: StoredBooking = {
                    ...payload,
                    id: response.id,
                    createdAt: response.createdAt,
                    paymentReady: response.paymentReady,
                }

                this.bookings.unshift(booking)
                localStorage.setItem(STORAGE_KEY, JSON.stringify(this.bookings))
                this.successMessage =
                    'Session reserved. Continue to payment during checkout to confirm your appointment.'
            } catch (error) {
                this.error = error instanceof Error ? error.message : 'Could not reserve the slot. Please try again.'
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
