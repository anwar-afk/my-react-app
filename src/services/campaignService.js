import axios from 'axios';

const API_URL = 'http://express-production-c596.up.railway.app/api/campaigns'; // Sesuaikan dengan URL API Anda

export const getCampaigns = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};