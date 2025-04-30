import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { getCampaignStatistics } from '../services/campaignService';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CampaignChart = () => {
  const [campaignData, setCampaignData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCampaignStatistics();
        setCampaignData(data);
        setLoading(false);
      } catch (err) {
        setError('Gagal memuat data campaign');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Memuat data...</div>;
  if (error) return <div>{error}</div>;

  const chartData = {
    labels: campaignData[0]?.statistics.daily.map(item => item.date) || [],
    datasets: [
      {
        label: 'Total Donasi per Hari',
        data: campaignData[0]?.statistics.daily.map(item => item.totalAmount) || [],
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
        text: 'Statistik Donasi Campaign',
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

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Statistik Campaign</h2>
      <div className="h-[400px]">
        <Line data={chartData} options={options} />
      </div>
      
      {campaignData[0] && (
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-medium">Total Donasi</h3>
            <p className="text-2xl font-bold">
              Rp {campaignData[0].statistics.total.totalAmount.toLocaleString('id-ID')}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-medium">Progress</h3>
            <p className="text-2xl font-bold">
              {campaignData[0].statistics.total.progress}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignChart; 