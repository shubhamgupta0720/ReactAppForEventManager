import axios from "axios";

const apiClient = axios.create(
    {
        baseURL: 'http://localhost:9090'
    }
)

export const getRegistrationByEventAndStudentApi = (eventId, stdId) => apiClient.get(`/api/registrations/event/${eventId}/student/${stdId}`)