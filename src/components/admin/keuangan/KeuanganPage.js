import React, { useEffect, useState } from "react";
import { getCampaignStatistics } from "../../../services/campaignService";
import CampaignStatisticCard from "../../CampaignStatisticCard";
import { useSpring, animated } from "@react-spring/web";

const KeuanganPage = () => {
  const [campaignData, setCampaignData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 250 },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCampaignStatistics();
        setCampaignData(data);
        setLoading(false);
      } catch (err) {
        setError("Gagal memuat data campaign");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-6">Memuat data...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <animated.div style={fadeIn}>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-2">Dashboard Keuangan</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaignData.map((campaign) => (
            <CampaignStatisticCard
              key={campaign.campaign.id}
              campaignData={campaign}
            />
          ))}
          {campaignData.length === 0 && (
            <div className="col-span-3 text-center text-gray-500 py-8">
              Belum ada campaign
            </div>
          )}
        </div>
      </div>
    </animated.div>
  );
};

export default KeuanganPage;
