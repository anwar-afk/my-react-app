import axios from 'axios';

const baseUrl = 'https://api2donation.syakiramutiara.my.id/api';
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