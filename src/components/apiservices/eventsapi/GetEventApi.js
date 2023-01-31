import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../security/AuthContext";

const apiClient = axios.create(
    {
        baseURL: 'http://localhost:9090'
    }
)

export const getEventApi = (eventId) => apiClient.get(`/api/events/${eventId}`)