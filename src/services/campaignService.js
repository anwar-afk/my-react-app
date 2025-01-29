import axios from 'axios';

const API_URL = 'https://express-production-51f2.up.railway.app/api/campaigns'; // Sesuaikan dengan URL API Anda

// Fungsi untuk mengambil semua campaign
export const getCampaigns = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};