import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import Swal from "sweetalert2";
import axios from "axios";

const LaporanKeuangan = () => {
  const [laporan, setLaporan] = useState([]); // mulai dari array kosong
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    tanggal: "",
    pdf: null, // ganti dari 'file' ke 'pdf'
  });

  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 250 },
  });

  const openModal = () => {
    setForm({ title: "", tanggal: "", pdf: null });
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.tanggal) return;
    if (!form.pdf) {
      Swal.fire("Error", "File PDF wajib diupload", "error");
      return;
    }
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("pdf", form.pdf); // field harus 'pdf'
    // Jika backend butuh tanggal, tambahkan juga:
    formData.append("tanggal", form.tanggal);
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire(
        "Error",
        "Anda belum login atau token tidak ditemukan. Silakan login ulang.",
        "error"
      );
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/documents/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.document || response.data;
      setLaporan([
        ...laporan,
        {
          id: data.id || Date.now(),
          title: data.title || form.title,
          tanggal: form.tanggal,
          dibuat: new Date().toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),
          // bisa tambahkan data.filepath jika ingin preview/download
        },
      ]);
      setShowModal(false);
      Swal.fire("Sukses", "Laporan berhasil diupload", "success");
    } catch (err) {
      console.error("Upload error detail:", err);
      let msg =
        "Gagal upload laporan (Unauthorized/Forbidden/Format Salah). Pastikan Anda admin, token valid, dan file PDF.";
      if (err.response && err.response.data && err.response.data.message) {
        msg = err.response.data.message;
      }
      Swal.fire("Error", msg, "error");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Laporan ini akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });
    if (result.isConfirmed) {
      setLaporan(laporan.filter((item) => item.id !== id));
      Swal.fire("Dihapus!", "Laporan berhasil dihapus.", "success");
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Main Content */}
        <main className="flex-1 p-8 bg-gray-100">
          <animated.div style={fadeIn}>
            <h1 className="text-2xl font-bold mb-4">Keuangan Tahunan</h1>
            <button
              className="mb-6 px-4 py-2 bg-yellow-200 rounded font-semibold hover:bg-yellow-300 transition"
              onClick={openModal}
              type="button"
            >
              + Laporan keuangan
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {laporan.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow p-4 flex flex-col justify-between"
                >
                  <div>
                    <h2 className="text-sm font-semibold mb-2">{item.title}</h2>
                    <p className="text-xs text-gray-600 mb-1">
                      Tanggal: {item.tanggal}
                    </p>
                    <p className="text-xs text-gray-600 mb-4">
                      Dibuat pada: {item.dibuat}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-4 py-1 bg-gray-100 text-gray-700 rounded border border-gray-300 hover:bg-red-100 hover:text-red-600 transition"
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>
          </animated.div>
        </main>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-10 relative overflow-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold mb-8 text-gray-800">
              Tambah Laporan Tahunan
            </h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Judul Program
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleFormChange}
                  className="w-full border border-gray-300 rounded-lg px-5 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none text-lg"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Tanggal Mulai
                </label>
                <input
                  type="date"
                  name="tanggal"
                  value={form.tanggal}
                  onChange={handleFormChange}
                  className="w-full border border-gray-300 rounded-lg px-5 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none text-lg"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Upload File
                </label>
                <input
                  type="file"
                  name="pdf" // ganti dari 'file' ke 'pdf'
                  accept="application/pdf"
                  onChange={handleFormChange}
                  className="w-full border border-gray-300 rounded-lg px-5 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none text-lg"
                  required
                />
              </div>
              <div className="flex justify-end gap-3 mt-8">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200 text-lg font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-yellow-200 rounded-lg hover:bg-yellow-300 font-semibold text-lg"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LaporanKeuangan;
