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

export const getCampaigns = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/campaigns`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // Ensure response has the expected format
    if (response.data && Array.isArray(response.data)) {
      return {
        success: true,
        campaigns: response.data.map(campaign => ({
          ...campaign,
          latitude: campaign.latitude || -6.200000, // Default to Jakarta coordinates if not set
          longitude: campaign.longitude || 106.816666
        }))
      };
    }
    
    return response.data;
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    throw error.response;
  }
};