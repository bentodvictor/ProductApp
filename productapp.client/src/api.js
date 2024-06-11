import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7128/api', // URL da sua API
});

export const getProducts = (params) => api.get('/products', { params });
export const getProductsById = (id) => api.get(`/products/${id}`);
export const createProducts = (produto) => api.post('/products', produto);
export const updateProducts = (id, produto) => api.put(`/products/${id}`, produto);
export const deleteProducts = (id) => api.delete(`/products/${id}`);