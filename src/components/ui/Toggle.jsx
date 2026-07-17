import React from 'react';

export default function Toggle({ enabled, onChange }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${enabled ? 'bg-emerald-500' : 'bg-slate-300'}`}
    >
      <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${enabled ? 'translate-x-6' : 'translate-x-0'}`} />
    </button>
  );
}
