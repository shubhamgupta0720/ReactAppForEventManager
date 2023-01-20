import axios from "axios";

const apiClient = axios.create(
    {
        baseURL: 'http://localhost:9090'
    }
)

export const createEventApi = (event) => apiClient.post('/api/events/organiser/3/eventadd', event)