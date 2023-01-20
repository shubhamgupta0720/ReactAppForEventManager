import axios from "axios";

const apiClient = axios.create(
    {
        baseURL: 'http://localhost:9090'
    }
)

export const updateEventApi = (eventId, event) => apiClient.put(`/api/events/${eventId}`, event)