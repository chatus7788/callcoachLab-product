import api from './api';
import { API_ENDPOINTS } from '../config/api';

export const userService = {
  // Get users
  async getUsers(params = {}) {
    const response = await api.get(API_ENDPOINTS.GET_USERS, { params });
    return response.data.data;
  },

  // Update user
  async updateUser(userId, data) {
    const response = await api.patch(`${API_ENDPOINTS.UPDATE_USER}/${userId}`, data);
    return response.data.data;
  },

  // Delete user
  async deleteUser(userId) {
    const response = await api.delete(`${API_ENDPOINTS.DELETE_USER}/${userId}`);
    return response.data;
  },
};
