import axios from "axios";

const apiClient = axios.create(
    {
        baseURL: 'http://localhost:9090'
    }
)

export const getAllOrganisersApi = () => apiClient.get('/api/organisers/')