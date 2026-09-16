import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headsers: {'Content-Type': 'application/json'},
    timeout: 10000,

});

export default api;