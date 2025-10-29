// api.js - API service for making requests to the backend

import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const postService = {
  getAllPosts: async (page = 1, limit = 10, search = '', category = null) => {
    let url = `/posts?page=${page}&limit=${limit}`;
    if (search) url += `&search=${search}`;
    if (category) url += `&category=${category}`;
    const response = await api.get(url);
    return response.data;
  },
  getPost: async (id) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },
  createPost: async (postData) => {
    const response = await api.post('/posts', postData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  updatePost: async (id, postData) => {
    const response = await api.put(`/posts/${id}`, postData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  deletePost: async (id) => {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  },
  searchPosts: async (query) => {
    const response = await api.get(`/posts?search=${query}`);
    return response.data;
  },
};

export const categoryService = {
  getAllCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },
  createCategory: async (categoryData) => {
    const response = await api.post('/categories', categoryData);
    return response.data;
  },
};

export const commentService = {
  getComments: async (postId) => {
    const response = await api.get(`/comments/${postId}`);
    return response.data;
  },
  addComment: async (commentData) => {
    const response = await api.post('/comments', commentData);
    return response.data;
  },
};

export const authService = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
    }
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

export default api;