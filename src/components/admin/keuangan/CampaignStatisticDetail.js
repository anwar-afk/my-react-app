import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getCampaignStatistics } from '../../../services/campaignService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CampaignStatisticDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaignData, setCampaignData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCampaignStatistics();
        const campaign = data.find(c => c.campaign.id === parseInt(id));
        if (!campaign) {
          throw new Error('Campaign tidak ditemukan');
        }
        setCampaignData(campaign);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div className="p-6">Memuat data...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!campaignData) return <div className="p-6">Campaign tidak ditemukan</div>;

  const { campaign, statistics } = campaignData;

  const chartData = {
    labels: statistics.daily.map(item => item.date),
    datasets: [
      {
        label: 'Total Donasi per Hari',
        data: statistics.daily.map(item => item.totalAmount),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Statistik Donasi Harian',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return 'Rp ' + value.toLocaleString('id-ID');
          }
        }
      }
    }
  };

  // Mengumpulkan semua donasi dari setiap hari
  const allDonations = statistics.daily.reduce((acc, day) => {
    return [...acc, ...day.donations.map(donation => ({
      ...donation,
      date: new Date(donation.date).toLocaleString('id-ID')
    }))];
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{campaign.title}</h1>
        <button
          onClick={() => navigate('/admin/keuangan')}
          className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Kembali
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">Informasi Campaign</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Target</p>
              <p className="text-lg font-bold">Rp {campaign.target.toLocaleString('id-ID')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Terkumpul</p>
              <p className="text-lg font-bold">Rp {campaign.currentAmount.toLocaleString('id-ID')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Progress</p>
              <p className="text-lg font-bold">{(statistics.total.progress * 100).toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Donatur</p>
              <p className="text-lg font-bold">{statistics.total.totalDonations}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">Rata-rata Donasi</h3>
          <p className="text-3xl font-bold">Rp {statistics.total.averageDonation.toLocaleString('id-ID')}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="h-[400px]">
          <Line data={chartData} options={options} />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-4">Daftar Donatur</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">Nama</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-right">Jumlah Donasi</th>
                <th className="px-4 py-2 text-left">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {allDonations.map((donation, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{donation.donorName}</td>
                  <td className="px-4 py-2">{donation.donorEmail}</td>
                  <td className="px-4 py-2 text-right">Rp {donation.amount.toLocaleString('id-ID')}</td>
                  <td className="px-4 py-2">{donation.date}</td>
                </tr>
              ))}
              {allDonations.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-4 py-2 text-center text-gray-500">
                    Belum ada donasi
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CampaignStatisticDetail; 