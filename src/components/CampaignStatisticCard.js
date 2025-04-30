import React from 'react';
import { useNavigate } from 'react-router-dom';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CampaignStatisticCard = ({ campaignData }) => {
  const navigate = useNavigate();
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
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
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
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">{campaign.title}</h3>
        <span className="text-sm text-gray-500">{campaign.category}</span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Target</p>
          <p className="text-lg font-bold">Rp {campaign.target.toLocaleString('id-ID')}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Terkumpul</p>
          <p className="text-lg font-bold">Rp {campaign.currentAmount.toLocaleString('id-ID')}</p>
        </div>
      </div>

      <div className="h-[150px] mb-4">
        <Line data={chartData} options={options} />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Total Donatur</p>
          <p className="text-lg font-bold">{statistics.total.totalDonations}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Progress</p>
          <p className="text-lg font-bold">{(statistics.total.progress * 100).toFixed(1)}%</p>
        </div>
      </div>

      <button
        onClick={() => navigate(`/admin/keuangan/detail/${campaign.id}`)}
        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
      >
        Lihat Detail
      </button>
    </div>
  );
};

export default CampaignStatisticCard; 