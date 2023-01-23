import axios from "axios";

const apiClient = axios.create(
    {
        baseURL: 'http://localhost:9090'
    }
)

export const createRegistrationApi = (registration, eventId, stdId) => apiClient.post(`/api/registrations/event/${eventId}/student/${stdId}`, registration)