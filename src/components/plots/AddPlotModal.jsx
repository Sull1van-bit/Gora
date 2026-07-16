import React, { useState, useEffect } from 'react';
import useUserLocation from '../../hooks/useUserLocation';

export default function AddPlotModal({ isOpen, onClose, onSave, komoditasList }) {
  const { provinsi, kecamatan } = useUserLocation();

  const [formData, setFormData] = useState({
    plot_name: '',
    komoditas_id: komoditasList?.[0]?.id || 'kom-1',
    area: '',
    unit: 'm²',
    location: '',
    planting_date: new Date().toISOString().split('T')[0],
    current_growth_stage: 'Vegetative (Pertumbuhan Daun)',
  });

  // Auto populate location once detected if not modified by user
  useEffect(() => {
    if (provinsi && kecamatan && !formData.location) {
      setFormData(prev => ({ ...prev, location: `${kecamatan}, ${provinsi}` }));
    }
  }, [provinsi, kecamatan, formData.location]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.plot_name) return;
    onSave({
      ...formData,
      area: formData.unit === 'Hektar' 
        ? Number(formData.area) * 10000 
        : formData.unit === 'Are' 
        ? Number(formData.area) * 100 
        : Number(formData.area)
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div 
        className="bg-[#fbf9f3] w-full max-w-[380px] rounded-[25px] p-6 sm:p-7 shadow-2xl relative border border-[#e8e4d9] max-h-[92vh] overflow-y-auto text-[#3c3b3b]"
      >
        {/* Top Header Row with Close Icon and Title */}
        <div className="flex items-center justify-between mb-6 relative">
          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 flex items-center justify-center hover:opacity-80 active:scale-90 transition-all z-10"
            aria-label="Tutup"
          >
            <img src="/assets/figma/addplot/close_x.svg" className="w-4 h-4 shrink-0" alt="Close" />
          </button>
          <h2 className="absolute inset-0 flex items-center justify-center font-['Montserrat_Alternates',sans-serif] font-bold text-[20px] text-[#3c3b3b] pointer-events-none">
            Lahan Baru
          </h2>
          <div className="w-8" /> {/* Spacer for symmetry */}
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nama Lahan */}
          <div>
            <label className="block font-['Montserrat_Alternates',sans-serif] font-medium text-[12px] text-[#3c3b3b] mb-1.5">
              Nama Lahan
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Lahan Barat"
              value={formData.plot_name}
              onChange={(e) => setFormData({ ...formData, plot_name: e.target.value })}
              className="w-full bg-white rounded-[10px] h-[40px] px-3.5 shadow-[0px_1px_2px_rgba(0,0,0,0.08)] border border-slate-100 text-[#3c3b3b] text-xs font-medium focus:ring-1 focus:ring-[#4c8644] outline-none transition-all"
            />
          </div>

          {/* Lokasi Lahan */}
          <div>
            <label className="block font-['Montserrat_Alternates',sans-serif] font-medium text-[12px] text-[#3c3b3b] mb-1.5">
              Lokasi Lahan
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                required
                placeholder="Desa/Kecamatan, Kabupaten"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-white rounded-[10px] h-[40px] pl-3.5 pr-9 shadow-[0px_1px_2px_rgba(0,0,0,0.08)] border border-slate-100 text-[#3c3b3b] text-xs font-medium focus:ring-1 focus:ring-[#4c8644] outline-none transition-all"
              />
              <div className="absolute right-3 pointer-events-none flex items-center justify-center">
                <img src="/assets/figma/addplot/location_pin.svg" className="w-3 h-3.5 shrink-0" alt="" />
              </div>
            </div>
          </div>

          {/* Luas Lahan & Satuan */}
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-7 sm:col-span-8">
              <label className="block font-['Montserrat_Alternates',sans-serif] font-medium text-[12px] text-[#3c3b3b] mb-1.5">
                Luas Lahan
              </label>
              <input
                type="number"
                required
                min="1"
                placeholder="1000"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="w-full bg-white rounded-[10px] h-[40px] px-3.5 shadow-[0px_1px_2px_rgba(0,0,0,0.08)] border border-slate-100 text-[#3c3b3b] text-xs font-medium focus:ring-1 focus:ring-[#4c8644] outline-none transition-all"
              />
            </div>

            <div className="col-span-5 sm:col-span-4">
              <label className="block font-['Montserrat_Alternates',sans-serif] font-medium text-[12px] text-[#3c3b3b] mb-1.5">
                Satuan
              </label>
              <div className="relative flex items-center">
                <select
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  className="w-full bg-white rounded-[10px] h-[40px] pl-3 pr-8 shadow-[0px_1px_2px_rgba(0,0,0,0.08)] border border-slate-100 text-[#3c3b3b] text-xs font-medium focus:ring-1 focus:ring-[#4c8644] appearance-none outline-none transition-all cursor-pointer"
                >
                  <option value="m²">m²</option>
                  <option value="Hektar">Hektar</option>
                  <option value="Are">Are</option>
                </select>
                <div className="absolute right-2.5 pointer-events-none flex items-center justify-center">
                  <img src="/assets/figma/addplot/dropdown_arrow.svg" className="w-4 h-4 shrink-0" alt="" />
                </div>
              </div>
            </div>
          </div>

          {/* Jenis Tanaman */}
          <div>
            <label className="block font-['Montserrat_Alternates',sans-serif] font-medium text-[12px] text-[#3c3b3b] mb-1.5">
              Jenis Tanaman
            </label>
            <div className="relative flex items-center">
              <select
                value={formData.komoditas_id}
                onChange={(e) => setFormData({ ...formData, komoditas_id: e.target.value })}
                className="w-full bg-white rounded-[10px] h-[40px] pl-3.5 pr-9 shadow-[0px_1px_2px_rgba(0,0,0,0.08)] border border-slate-100 text-[#3c3b3b] text-xs font-medium focus:ring-1 focus:ring-[#4c8644] appearance-none outline-none transition-all cursor-pointer"
              >
                {komoditasList?.map((k) => (
                  <option key={k.id} value={k.id}>
                    {k.icon} {k.nama}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 pointer-events-none flex items-center justify-center">
                <img src="/assets/figma/addplot/dropdown_arrow.svg" className="w-4 h-4 shrink-0" alt="" />
              </div>
            </div>
          </div>

          {/* Tanggal Tanam */}
          <div>
            <label className="block font-['Montserrat_Alternates',sans-serif] font-medium text-[12px] text-[#3c3b3b] mb-1.5">
              Tanggal Tanam
            </label>
            <div className="relative flex items-center">
              <input
                type="date"
                required
                value={formData.planting_date}
                onChange={(e) => setFormData({ ...formData, planting_date: e.target.value })}
                className="w-full bg-white rounded-[10px] h-[40px] pl-3.5 pr-10 shadow-[0px_1px_2px_rgba(0,0,0,0.08)] border border-slate-100 text-[#3c3b3b] text-xs font-medium focus:ring-1 focus:ring-[#4c8644] outline-none transition-all"
              />
              <div className="absolute right-3 pointer-events-none flex items-center justify-center">
                <img src="/assets/figma/addplot/calendar.svg" className="w-3.5 h-3.5 shrink-0" alt="" />
              </div>
            </div>
          </div>

          {/* Action Button: Buat */}
          <div className="pt-6 flex justify-center">
            <button
              type="submit"
              className="bg-[#4c8644] hover:bg-[#3f6f38] active:scale-95 text-white font-['Montserrat_Alternates',sans-serif] font-bold text-[16px] sm:text-[18px] px-14 py-2.5 rounded-full shadow-[0px_4px_4px_rgba(0,0,0,0.25)] transition-all flex items-center justify-center min-w-[150px]"
            >
              Buat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
