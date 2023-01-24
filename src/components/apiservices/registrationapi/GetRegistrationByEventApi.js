import axios from "axios";

const apiClient = axios.create(
    {
        baseURL: 'http://localhost:9090'
    }
)

export const getRegistrationByEventApi = (eventId) => apiClient.get(`/api/registrations/event/${eventId}`)