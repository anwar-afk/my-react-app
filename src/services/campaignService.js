import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getCampaignStatistics = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/campaigns/statistics`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching campaign statistics:', error);
    throw error;
  }
};

const baseUrl = 'http://localhost:5000/api';
export const getCampaigns = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/campaigns`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response;
  }
};