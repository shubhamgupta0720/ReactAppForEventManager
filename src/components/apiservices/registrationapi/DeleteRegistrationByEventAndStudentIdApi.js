import axios from "axios";

const apiClient = axios.create(
    {
        baseURL: 'http://localhost:9090'
    }
)

export const deleteRegistrationByEventAndStudentApi = (eventId, stdId) => apiClient.delete(`/api/registrations/event/${eventId}/student/${stdId}`)