import React from 'react';
import { RiFireFill } from 'react-icons/ri';

export default function StreakFlame({ count, status }) {
  const color =
    status === 'hot'  ? 'text-orange-500' :
    status === 'warm' ? 'text-amber-400'  : 'text-slate-400';
  const size = count >= 30 ? 'text-4xl' : count >= 7 ? 'text-3xl' : 'text-2xl';
  return <RiFireFill className={`${size} ${color}`} />;
}
