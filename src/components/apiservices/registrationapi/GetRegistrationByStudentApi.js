import axios from "axios";

const apiClient = axios.create(
    {
        baseURL: 'http://localhost:9090'
    }
)

export const getRegistrationByStudentApi = (stdId) => apiClient.get(`/api/registrations/student/${stdId}`)