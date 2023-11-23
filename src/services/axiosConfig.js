import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8001/api', // Replace with your API base URL
});

export default instance;