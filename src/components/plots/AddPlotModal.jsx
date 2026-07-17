import React, { useState, useEffect } from 'react';

const CustomDropdown = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="relative w-full">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white rounded-[10px] h-[34px] pl-3.5 pr-9 shadow-[0px_1px_2px_rgba(0,0,0,0.08)] border border-slate-100 text-[#3c3b3b] text-xs font-medium flex items-center justify-between cursor-pointer outline-none transition-all select-none"
      >
        <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
        <div className="absolute right-3 pointer-events-none flex items-center justify-center">
          <img src="/assets/figma/addplot/dropdown_arrow.svg" className={`w-4 h-4 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} alt="" />
        </div>
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute z-20 top-[105%] left-0 w-full bg-[#fbf9f3] border border-[#e8e4d9] shadow-lg rounded-[10px] max-h-48 overflow-y-auto py-1 animate-fade-in scrollbar-thin">
            {options.map((opt) => (
              <div
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`px-3.5 py-2.5 text-xs font-medium cursor-pointer transition-colors ${
                  value === opt.value ? 'bg-[#c6d5a2]/40 text-[#28502d] font-bold' : 'text-[#3c3b3b] hover:bg-black/5'
                }`}
              >
                {opt.label}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};


export default function AddPlotModal({ isOpen, onClose, onSave, komoditasList, provinsi, kecamatan }) {
  const [formData, setFormData] = useState({
    plot_name: '',
    komoditas_id: komoditasList?.[0]?.id || 'kom-1',
    area: '',
    unit: 'm²',
    location: '',
    planting_date: new Date().toISOString().split('T')[0],
    current_growth_stage: 'Vegetative (Pertumbuhan Daun)',
  });

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
          <div className="w-8" /> 
        </div>

        
        <form onSubmit={handleSubmit} className="space-y-4">
          
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
              className="w-full bg-white rounded-[10px] h-[34px] px-3.5 shadow-[0px_1px_2px_rgba(0,0,0,0.08)] border border-slate-100 text-[#3c3b3b] text-xs font-medium focus:ring-1 focus:ring-[#4c8644] outline-none transition-all"
            />
          </div>

          
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
                className="w-full bg-white rounded-[10px] h-[34px] pl-3.5 pr-9 shadow-[0px_1px_2px_rgba(0,0,0,0.08)] border border-slate-100 text-[#3c3b3b] text-xs font-medium focus:ring-1 focus:ring-[#4c8644] outline-none transition-all"
              />
              <div className="absolute right-3 pointer-events-none flex items-center justify-center">
                <img src="/assets/figma/addplot/location_pin.svg" className="w-3 h-3.5 shrink-0" alt="" />
              </div>
            </div>
          </div>

          
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-7 sm:col-span-8">
              <label className="block font-['Montserrat_Alternates',sans-serif] font-medium text-[12px] text-[#3c3b3b] mb-1.5">
                Luas Lahan
              </label>
              <input
                type="number"
                required
                min="0.1"
                step="any"
                placeholder="1000"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="w-full bg-white rounded-[10px] h-[34px] px-3.5 shadow-[0px_1px_2px_rgba(0,0,0,0.08)] border border-slate-100 text-[#3c3b3b] text-xs font-medium focus:ring-1 focus:ring-[#4c8644] outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>

            <div className="col-span-5 sm:col-span-4">
              <label className="block font-['Montserrat_Alternates',sans-serif] font-medium text-[12px] text-[#3c3b3b] mb-1.5">
                Satuan
              </label>
              <CustomDropdown
                options={[
                  { value: 'm²', label: 'm²' },
                  { value: 'Hektar', label: 'Hektar' },
                  { value: 'Are', label: 'Are' },
                ]}
                value={formData.unit}
                onChange={(val) => setFormData({ ...formData, unit: val })}
              />
            </div>
          </div>

          
          <div>
            <label className="block font-['Montserrat_Alternates',sans-serif] font-medium text-[12px] text-[#3c3b3b] mb-1.5">
              Jenis Tanaman
            </label>
              <CustomDropdown
                options={komoditasList?.map(k => ({ value: k.id, label: k.nama })) || []}
                value={formData.komoditas_id}
                onChange={(val) => setFormData({ ...formData, komoditas_id: val })}
                placeholder="Pilih Tanaman"
              />
          </div>

          
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
                className="w-full bg-white rounded-[10px] h-[34px] pl-3.5 pr-10 shadow-[0px_1px_2px_rgba(0,0,0,0.08)] border border-slate-100 text-[#3c3b3b] text-xs font-medium focus:ring-1 focus:ring-[#4c8644] outline-none transition-all"
              />
              <div className="absolute right-3 pointer-events-none flex items-center justify-center">
                <img src="/assets/figma/addplot/calendar.svg" className="w-3.5 h-3.5 shrink-0" alt="" />
              </div>
            </div>
          </div>

          
          <div className="pt-6 flex justify-center">
            <button
              type="submit"
              className="bg-[#578a3e] hover:bg-[#477332] active:scale-95 text-white font-['Montserrat_Alternates',sans-serif] font-bold text-[16px] sm:text-[18px] px-12 py-[10px] rounded-[20px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] transition-all flex items-center justify-center min-w-[147px]"
            >
              Buat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}