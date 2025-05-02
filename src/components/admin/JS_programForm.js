import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Konfigurasi default icon untuk marker
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const ProgramForm = ({ programData, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(programData ? programData.title : '');
  const [detail, setDetail] = useState(programData ? programData.detail : '');
  const [category, setCategory] = useState(programData ? programData.category : '');
  const [startDate, setStartDate] = useState(programData ? programData.startDate : '');
  const [endDate, setEndDate] = useState(programData ? programData.endDate : '');
  const [target, setTarget] = useState(programData ? programData.target : '');
  const [images, setImages] = useState([]);
  const [latitude, setLatitude] = useState(-6.200000);
  const [longitude, setLongitude] = useState(106.816666);

  const categories = [
    "bencana alam",
    "pendidikan",
    "kesehatan",
    "kemanusiaan",
    "lingkungan",
    "lainnya",
  ];

  useEffect(() => {
    const map = L.map('map').setView([latitude, longitude], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const marker = L.marker([latitude, longitude], {
      draggable: true
    }).addTo(map);

    // Handle click pada peta
    map.on('click', function(e) {
      const { lat, lng } = e.latlng;
      marker.setLatLng([lat, lng]);
      setLatitude(lat);
      setLongitude(lng);
    });

    // Handle drag marker
    marker.on('dragend', function(e) {
      const { lat, lng } = e.target.getLatLng();
      setLatitude(lat);
      setLongitude(lng);
    });

    return () => {
      map.remove();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('detail', detail);
    formData.append('category', category);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('target', target);
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);
    
    Array.from(images).forEach(image => {
      formData.append('images', image);
    });

    onSubmit(formData);
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-50 pt-10">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 mb-10 overflow-y-auto max-h-[90vh]">
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">
            {programData ? 'Edit Program' : 'Buat Program Baru'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                Judul Program
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="detail">
                Detail Program
              </label>
              <textarea
                id="detail"
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline min-h-[100px]"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                Kategori
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Pilih Kategori</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
                  Tanggal Mulai
                </label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
                  Tanggal Berakhir
                </label>
                <input
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="target">
                Target Donasi
              </label>
              <input
                type="number"
                id="target"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="images">
                Upload Gambar
              </label>
              <input
                type="file"
                id="images"
                onChange={handleImageChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                multiple
                accept="image/*"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Pilih Koordinat (Klik pada peta atau geser marker)
              </label>
              <div id="map" className="w-full h-[200px] rounded-lg shadow-md mb-2"></div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-1">
                    Latitude
                  </label>
                  <input
                    type="text"
                    value={latitude}
                    readOnly
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-1">
                    Longitude
                  </label>
                  <input
                    type="text"
                    value={longitude}
                    readOnly
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-50"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-100 text-gray-800 rounded-lg hover:bg-yellow-200 transition-colors"
            >
              {programData ? 'Simpan Perubahan' : 'Buat Program'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProgramForm;