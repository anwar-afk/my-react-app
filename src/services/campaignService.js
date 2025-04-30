import axios from 'axios';

const baseUrl = 'http://localhost:5000/api';
export const getCampaigns = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${baseUrl}/campaigns`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response;
  }
};