import axios from "axios";

const apiClient = axios.create(
    {
        baseURL: 'http://localhost:9090'
    }
)

export const getOrganiserApi = (orgId) => apiClient.get(`/api/organisers/${orgId}`)