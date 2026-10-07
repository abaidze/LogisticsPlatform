import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7123/api', // ჩასვი შენი .NET API-ს პორტი (Swagger-იდან)
  headers: {
    'Content-Type': 'application/json',
  },
});

// მოთხოვნამდე ტოკენის ავტომატური დამატება
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;