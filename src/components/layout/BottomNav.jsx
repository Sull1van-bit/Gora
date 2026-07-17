import React from 'react';
import { 
  RiHome5Fill, RiHome5Line,
  RiPlantFill, RiPlantLine,
  RiFileTextFill, RiFileTextLine,
  RiUser3Fill, RiUser3Line,
  RiAddLine
} from 'react-icons/ri';

export default function BottomNav({ activeTab, onTabChange, onOpenAddPlot, urgentCount = 0 }) {
  const getIcon = (tab) => {
    switch (tab) {
      case 'home':
        return activeTab === 'home' ? <RiHome5Fill className="w-6 h-6" /> : <RiHome5Line className="w-6 h-6" />;
      case 'plots':
        return activeTab === 'plots' ? <RiPlantFill className="w-6 h-6" /> : <RiPlantLine className="w-6 h-6" />;
      case 'insights':
        return activeTab === 'insights' ? <RiFileTextFill className="w-6 h-6" /> : <RiFileTextLine className="w-6 h-6" />;
      case 'profile':
        return activeTab === 'profile' ? <RiUser3Fill className="w-6 h-6" /> : <RiUser3Line className="w-6 h-6" />;
      default:
        return null;
    }
  };

  const navItems = [
    { id: 'home', label: 'Beranda' },
    { id: 'plots', label: 'Tanaman' },
    { id: 'insights', label: 'Informasi' },
    { id: 'profile', label: 'Profil' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
      <div className="max-w-md mx-auto relative pointer-events-auto h-[75px]" style={{ paddingBottom: 'var(--sab, 0px)' }}>
        
        
        <div className="absolute bottom-0 left-0 w-full h-[65px] drop-shadow-[0_-3px_8px_rgba(0,0,0,0.1)]">
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 375 65" 
            preserveAspectRatio="none"
            className="text-[#CDE0B1]"
          >
            <path 
              d="M0,20 
                 C0,8.95 8.95,0 20,0 
                 L137.5,0 
                 C148.5,0 151,3.5 156,12.5 
                 C163,24.5 174.5,31 187.5,31 
                 C200.5,31 212,24.5 219,12.5 
                 C224,3.5 226.5,0 237.5,0 
                 L355,0 
                 C366.05,0 375,8.95 375,20 
                 L375,65 L0,65 Z" 
              fill="currentColor"
            />
          </svg>
        </div>

        
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center z-10">
          <div className="rounded-full bg-transparent p-1 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]">
             
             <button
              onClick={() => onOpenAddPlot ? onOpenAddPlot() : onTabChange('add-plot')}
              className="w-[52px] h-[52px] rounded-full bg-[#5A843E] text-white flex items-center justify-center shadow-md active:scale-90 transition-all cursor-pointer group"
              title="Tambah Tanaman"
              aria-label="Tambah Tanaman"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <RiAddLine className="w-7 h-7 font-bold transition-transform duration-300" />
            </button>
          </div>
        </div>

        
        <div className="absolute inset-0 flex items-center justify-between px-2 pt-3 h-full">
          {navItems.map((item, index) => {
            const isActive = activeTab === item.id;
            const isRightSide = index >= 2;
            
            return (
              <React.Fragment key={item.id}>
                {index === 2 && <div className="w-[70px] shrink-0" /> }
                <button
                  onClick={() => onTabChange(item.id)}
                  className="flex-1 flex flex-col items-center justify-center h-full active:scale-95 transition-transform group"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  <div className={`relative flex items-center justify-center transition-colors duration-200 ${isActive ? 'text-[#28502d] drop-shadow-[0_2px_3px_rgba(159,181,142,0.8)]' : 'text-[#627D56]'}`}>
                    {getIcon(item.id)}
                    {item.id === 'plots' && urgentCount > 0 && (
                      <span className="absolute -top-1 -right-2 bg-rose-500 text-white text-[9px] font-extrabold w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-sm animate-pulse">
                        {urgentCount}
                      </span>
                    )}
                  </div>
                  <span className={`text-[10px] font-['Montserrat_Alternates',sans-serif] tracking-tight mt-1 transition-colors duration-200 ${isActive ? 'text-[#28502d] font-bold' : 'text-[#627D56] font-semibold'}`}>
                    {item.label}
                  </span>
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
