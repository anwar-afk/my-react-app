import React, { useState, useEffect, useRef } from 'react';
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
  // State declarations
  const [title, setTitle] = useState(programData ? programData.title : '');
  const [detail, setDetail] = useState(programData ? programData.detail : '');
  const [category, setCategory] = useState(programData ? programData.category : '');
  const [startDate, setStartDate] = useState(programData ? programData.startDate?.split('T')[0] : '');
  const [endDate, setEndDate] = useState(programData ? programData.endDate?.split('T')[0] : '');
  const [target, setTarget] = useState(programData ? programData.target : '');
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState(programData?.images || []);
  const [latitude, setLatitude] = useState(programData?.latitude || -6.200000);
  const [longitude, setLongitude] = useState(programData?.longitude || 106.816666);
  const [errors, setErrors] = useState({});
  const baseUrl = 'http://localhost:5000';

  // Refs for map components
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const isInitializedRef = useRef(false);

  const categories = [
    "bencana alam",
    "pendidikan",
    "kesehatan",
    "kemanusiaan",
    "lingkungan",
    "lainnya",
  ];

  // Fungsi untuk membersihkan instance peta
  const cleanupMap = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
      markerRef.current = null;
      isInitializedRef.current = false;
    }
  };

  // Effect untuk inisialisasi peta
  useEffect(() => {
    // Jangan inisialisasi jika sudah ada instance atau container belum siap
    if (!mapContainerRef.current || isInitializedRef.current) {
      return;
    }

    const initializeMap = () => {
      try {
        // Bersihkan instance yang mungkin masih ada
        cleanupMap();

        // Buat instance peta baru
        mapInstanceRef.current = L.map(mapContainerRef.current).setView([latitude, longitude], 13);

        // Tambahkan tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapInstanceRef.current);

        // Tambahkan marker
        markerRef.current = L.marker([latitude, longitude], {
          draggable: true
        }).addTo(mapInstanceRef.current);

        // Event handler untuk klik pada peta
        mapInstanceRef.current.on('click', (e) => {
          const { lat, lng } = e.latlng;
          if (markerRef.current && typeof lat === 'number' && typeof lng === 'number') {
            markerRef.current.setLatLng([lat, lng]);
            setLatitude(lat);
            setLongitude(lng);
          }
        });

        // Event handler untuk drag marker
        markerRef.current.on('dragend', (e) => {
          const position = e.target.getLatLng();
          if (position && typeof position.lat === 'number' && typeof position.lng === 'number') {
            setLatitude(position.lat);
            setLongitude(position.lng);
          }
        });

        // Tandai bahwa peta sudah diinisialisasi
        isInitializedRef.current = true;

        // Pastikan ukuran peta terupdate dengan benar
        setTimeout(() => {
          mapInstanceRef.current?.invalidateSize();
        }, 250);

      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    // Berikan sedikit delay untuk memastikan DOM sudah siap
    const timeoutId = setTimeout(initializeMap, 100);

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      cleanupMap();
    };
  }, []); // Empty dependency array karena kita hanya ingin ini berjalan sekali

  // Effect untuk update posisi marker ketika koordinat berubah
  useEffect(() => {
    if (markerRef.current && mapInstanceRef.current) {
      const newLatLng = [latitude, longitude];
      markerRef.current.setLatLng(newLatLng);
      mapInstanceRef.current.panTo(newLatLng);
    }
  }, [latitude, longitude]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!title.trim()) newErrors.title = "Judul program wajib diisi";
    if (!detail.trim()) newErrors.detail = "Detail program wajib diisi";
    if (!category) newErrors.category = "Kategori wajib dipilih";
    if (!startDate) newErrors.startDate = "Tanggal mulai wajib diisi";
    if (!endDate) newErrors.endDate = "Tanggal berakhir wajib diisi";
    if (!target) newErrors.target = "Target donasi wajib diisi";
    if (!programData && !images.length && !existingImages.length) {
      newErrors.images = "Minimal satu gambar wajib diunggah";
    }
    
    // Validate dates
    if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
      newErrors.endDate = "Tanggal berakhir harus setelah tanggal mulai";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert("Mohon lengkapi semua data yang diperlukan");
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('detail', detail);
    formData.append('category', category);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('target', target);
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);
    
    // Handle both new and existing images
    if (images.length > 0) {
      Array.from(images).forEach(image => {
        formData.append('images', image);
      });
    }
    
    // Pass existing images if we're editing
    if (existingImages.length > 0) {
      formData.append('existingImages', JSON.stringify(existingImages));
    }

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
            {programData ? `Edit Program: ${programData.title}` : 'Buat Program Baru'}
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
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.title ? 'border-red-500' : ''
                }`}
                required
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="detail">
                Detail Program
              </label>
              <textarea
                id="detail"
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline min-h-[100px] ${
                  errors.detail ? 'border-red-500' : ''
                }`}
                required
              />
              {errors.detail && <p className="text-red-500 text-xs mt-1">{errors.detail}</p>}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                Kategori
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.category ? 'border-red-500' : ''
                }`}
                required
              >
                <option value="">Pilih Kategori</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
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
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.startDate ? 'border-red-500' : ''
                  }`}
                  required
                />
                {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
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
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.endDate ? 'border-red-500' : ''
                  }`}
                  required
                />
                {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
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
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.target ? 'border-red-500' : ''
                }`}
                required
              />
              {errors.target && <p className="text-red-500 text-xs mt-1">{errors.target}</p>}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="images">
                {programData ? 'Update Gambar (Opsional)' : 'Upload Gambar'}
              </label>
              <input
                type="file"
                id="images"
                onChange={handleImageChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.images ? 'border-red-500' : ''
                }`}
                multiple
                accept="image/*"
                required={!programData && !existingImages.length}
              />
              {errors.images && <p className="text-red-500 text-xs mt-1">{errors.images}</p>}
              
              {/* Show existing images if editing */}
              {existingImages.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-700 mb-2">Gambar Saat Ini:</p>
                  <div className="grid grid-cols-4 gap-2">
                    {existingImages.map((imagePath, index) => (
                      <div key={index} className="relative">
                        <img
                          src={`${baseUrl}${imagePath}`}
                          alt={`Existing ${index + 1}`}
                          className="w-full h-24 object-cover rounded"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Preview for newly selected images */}
              {images.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-700 mb-2">Preview Gambar Baru:</p>
                  <div className="grid grid-cols-4 gap-2">
                    {Array.from(images).map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Pilih Koordinat (Klik pada peta atau geser marker)
              </label>
              <div 
                ref={mapContainerRef} 
                className="w-full h-[300px] rounded-lg shadow-md mb-2"
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-xs font-medium mb-1">Latitude</label>
                  <input
                    type="text"
                    value={latitude}
                    readOnly
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-xs font-medium mb-1">Longitude</label>
                  <input
                    type="text"
                    value={longitude}
                    readOnly
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm"
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