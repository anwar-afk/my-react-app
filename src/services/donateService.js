import axios from 'axios';

const baseUrl = "http://localhost:8000/api";

// ✅ Function to create a donation
export const createDonation = async (campaignId, amount) => {
  try {
    const token = localStorage.getItem('token'); // ✅ Ensure token exists
    if (!token) {
      console.warn("⚠️ No authentication token found!");
      return { error: "User not logged in." };
    }

    const donationData = { campaignId, amount: parseInt(amount) }; // ✅ Convert amount to number

    console.log("🔼 Sending donation request:", donationData);

    const response = await axios.post(`${baseUrl}/donate`, donationData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // ✅ Include token for authentication
      },
    });

    console.log("✅ Donation response:", response.data);

    return response.data; // ✅ Return API response
  } catch (error) {
    console.error("❌ Error creating donation:", error);
    
    if (error.response) {
      console.error("Server response:", error.response.data);
    }

    return { error: "Terjadi kesalahan saat membuat donasi. Silakan coba lagi." };
  }
};

// ✅ Function to fetch donation history
export const getDonationHistory = async () => {
  try {
    const token = localStorage.getItem('token'); // ✅ Get auth token
    if (!token) {
      console.warn("⚠️ No authentication token found!");
      return { error: "User not logged in." };
    }

    const response = await axios.get(`${baseUrl}/donations/history`, {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Include token for authentication
      },
    });

    console.log("✅ Donation history response:", response.data);

    if (response.data && Array.isArray(response.data.history)) {
      return response.data.history;
    } else {
      console.error("🚨 Unexpected response format:", response.data);
      return [];
    }
  } catch (error) {
    console.error("❌ Error fetching donation history:", error);
    
    if (error.response) {
      console.error("Server response:", error.response.data);
    }

    return { error: "Terjadi kesalahan server. Silakan coba lagi." };
  }
};
