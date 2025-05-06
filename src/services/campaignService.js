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
      headers: token ? {
        Authorization: `Bearer ${token}`
      } : {}
    });

    // Normalize response data
    const campaignsData = Array.isArray(response.data) ? response.data : 
                         response.data.campaigns ? response.data.campaigns : [];
    
    return {
      success: true,
      campaigns: campaignsData.map(campaign => ({
        ...campaign,
        id: campaign._id || campaign.id, // Handle both MongoDB _id and regular id
        latitude: campaign.latitude || -6.200000,
        longitude: campaign.longitude || 106.816666
      }))
    };
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return {
      success: false,
      campaigns: [],
      error: error.message
    };
  }
};