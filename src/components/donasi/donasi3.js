import React from "react";

const StatisticsSection = () => {
  const statistics = [
    {
      id: 1,
      icon: "/image/hand-love.svg", // Ganti dengan path ikon
      value: "200",
      label: "Donasi",
    },
    {
      id: 2,
      icon: "/image/coin.svg", // Ganti dengan path ikon
      value: "Rp. 100.000.000",
      label: "Donasi Terkumpul",
    },
    {
      id: 3,
      icon: "/image/wallet.svg", // Ganti dengan path ikon
      value: "300,00",
      label: "Transaksi Donasi",
    },
  ];

  return (
    <div className="bg-green-200 px-10 lg:px-40 py-16 mb-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
        {statistics.map((stat, index) => (
          <div
            key={stat.id}
            className={`flex flex-col items-center ${
              index !== statistics.length - 1 ? "border-r border-gray-300" : ""
            }`}
          >
            <img
              src={stat.icon}
              alt={stat.label}
              className="w-10 h-10 mb-4"
            />
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatisticsSection;
