// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ProgramForm from '../../components/admin/JS_programForm'; // Sesuaikan path

// const ProgramPage = () => {
//   const [selectedProgram, setSelectedProgram] = useState(null);
//   const [campaigns, setCampaigns] = useState([]);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [notification, setNotification] = useState(null);

//   const token = localStorage.getItem('token');
//   const baseUrl = 'https://api2donation.syakiramutiara.my.id';

//   const fetchCampaigns = async () => {
//     try {
//       const url = `${baseUrl}/api/campaigns`;
//       console.log('Fetching campaigns from:', url);
      
//       const response = await axios.get(url, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
  
//       console.log('Campaigns response:', response.data);
      
//       // Pastikan mengambil array `campaigns` dari response API
//       if (response.data && Array.isArray(response.data.campaigns)) {
//         setCampaigns(response.data.campaigns);
//       } else {
//         console.error('Unexpected response format:', response.data);
//         setCampaigns([]); // Set ke array kosong untuk menghindari error
//       }
//     } catch (error) {
//       console.error('Error fetching campaigns:', error);
//       setCampaigns([]); // Set ke array kosong jika terjadi error
//     }
//   };
  

//   useEffect(() => {
//     fetchCampaigns();
//   }, []);

//   const handleCreateProgram = async (data) => {
//     try {
//       const url = `${baseUrl}/api/campaigns`;
//       console.log('Creating program at:', url);
//       const response = await axios.post(url, data, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       fetchCampaigns();
//       showNotification('Program berhasil dibuat!', 'success');
//       return response.data;
//     } catch (error) {
//       console.error('Error creating program:', error);
//       showNotification('Gagal membuat program.', 'error');
//       throw error;
//     }
//   };

//   const handleUpdateProgram = async (data) => {
//     try {
//       const url = `${baseUrl}/api/campaigns/${selectedProgram._id}`;
//       console.log('Updating program at:', url);
//       const response = await axios.put(url, data, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       fetchCampaigns();
//       setSelectedProgram(null);
//       setModalIsOpen(false);
//       showNotification('Program berhasil diperbarui!', 'success');
//       return response.data;
//     } catch (error) {
//       console.error('Error updating program:', error);
//       showNotification('Gagal memperbarui program.', 'error');
//       throw error;
//     }
//   };
//   const handleDeleteProgram = async (campaignId) => {
//     try {
//       const url = `${baseUrl}/api/campaigns/${campaignId}`;
//       console.log('Deleting program at:', url);
  
//       await axios.delete(url, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
  
//       fetchCampaigns();
//       showNotification('Program berhasil dihapus!', 'success');
//     } catch (error) {
//       console.error('Error deleting program:', error);
//       showNotification('Gagal menghapus program.', 'error');
//     }
//   };
  

//   const showNotification = (message, type) => {
//     setNotification({ message, type });
//     setTimeout(() => setNotification(null), 3000);
//   };

//   return (
//     <div className="flex-1 p-8">
//       <h1 className="text-3xl font-bold mb-6">Program Admin</h1>

//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-xl font-semibold mb-4">Buat Program Baru</h2>
//         <ProgramForm onSubmit={handleCreateProgram} />
//       </div>

//       <div className="mt-8">
//         <h2 className="text-xl font-semibold mb-4">Daftar Program</h2>
//         <table className="min-w-full bg-white border border-gray-300">
//           <thead>
//             <tr>
//               <th className="py-2 px-4 border-b">Title</th>
//               <th className="py-2 px-4 border-b">Images</th>
//               <th className="py-2 px-4 border-b">Date</th>
//               <th className="py-2 px-4 border-b">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//   {Array.isArray(campaigns) && campaigns.length > 0 ? (
//     campaigns.map((campaign) => (
//       <tr key={campaign.id}> {/* Ganti dari `_id` ke `id` karena sesuai dengan API */}
//         <td className="py-2 px-4 border-b">{campaign.title}</td>
//         <td className="py-2 px-4 border-b">
//           <div className="flex space-x-2">
//             {campaign.images && Array.isArray(campaign.images)
//               ? campaign.images.map((image, index) => (
//                   <img
//                     key={index}
//                     src={`${baseUrl}${image}`} // Gabungkan base URL dengan path gambar
//                     alt={`Campaign Image ${index + 1}`}
//                     className="w-16 h-16 object-cover rounded-md"
//                   />
//                 ))
//               : 'No Images'}
//           </div>
//         </td>
//         <td className="py-2 px-4 border-b">
//           {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
//         </td>
//         <td className="py-2 px-4 border-b">
//           <button
//             onClick={() => {
//               setSelectedProgram(campaign);
//               setModalIsOpen(true);
//             }}
//             className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
//           >
//             Edit
//           </button>
//           <button
//             onClick={() => handleDeleteProgram(campaign.id)} 
//             className="bg-red-500 text-white px-4 py-2 rounded-md"
//           >
//             Delete
//           </button>
//         </td>
//       </tr>
//     ))
//   ) : (
//     <tr>
//       <td colSpan="4" className="text-center py-4">
//         No campaigns available
//       </td>
//     </tr>
//   )}
// </tbody>

//         </table>
//       </div>

//       {modalIsOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-4 rounded-lg shadow-md w-11/12 md:w-1/2 lg:w-1/3">
//             <h2 className="text-xl font-semibold mb-4">Edit Program</h2>
//             <ProgramForm
//               programData={selectedProgram}
//               onSubmit={handleUpdateProgram}
//               onCancel={() => setModalIsOpen(false)}
//             />
//           </div>
//         </div>
//       )}

//       {notification && (
//         <div
//           className={`fixed bottom-4 right-4 p-4 rounded-md text-white ${
//             notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
//           }`}
//         >
//           {notification.message}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProgramPage;
