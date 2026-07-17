import React from 'react';
import {
  RiSunLine,
  RiSunCloudyLine,
  RiCloudyLine,
  RiCloudy2Line,
  RiMistLine,
  RiDrizzleLine,
  RiRainyLine,
  RiHeavyShowersLine,
  RiSnowyLine,
  RiThunderstormsLine,
  RiMoonClearLine,
  RiTempHotLine,
  RiPlantLine,
  RiSeedlingLine,
  RiLeafLine,
  RiEarthLine,
  RiAlertLine,
  RiErrorWarningLine,
  RiCheckboxCircleLine,
  RiCalendar2Line,
  RiTimeLine,
  RiMapPinLine,
  RiRefreshLine,
  RiSettings4Line,
  RiInformationLine,
  RiWaterFlashLine,
  RiDropLine,
  RiScissorsCutLine,
  RiInputMethodLine,
  RiAddLine,
  RiArrowRightLine,
  RiPriceTag3Line,
  RiFilePaper2Line,
  RiGlobalLine,
  RiNewspaperLine,
  RiShieldCheckLine,
  RiBox3Line,
} from 'react-icons/ri';

const STRING_ICON_MAP = {
  // Crop / Komoditas mappings (English, Indonesian, both lowercase and formatted keys, and emojis)
  'tomato': RiPlantLine,
  'tomat': RiPlantLine,
  'tomat_(tomato)': RiPlantLine,
  '🍅': RiPlantLine,
  'chili': RiSeedlingLine,
  'cabai': RiSeedlingLine,
  'cabai_merah': RiSeedlingLine,
  'cabai_merah_(chili)': RiSeedlingLine,
  '🌶️': RiSeedlingLine,
  'rice': RiLeafLine,
  'padi': RiLeafLine,
  'padi_(rice)': RiLeafLine,
  '🌾': RiLeafLine,
  'corn': RiEarthLine,
  'jagung': RiEarthLine,
  'jagung_(corn)': RiEarthLine,
  '🌽': RiEarthLine,
  'shallot': RiPlantLine,
  'bawang': RiPlantLine,
  'bawang_merah': RiPlantLine,
  'bawang_merah_(shallot)': RiPlantLine,
  '🧅': RiPlantLine,
  'cabbage': RiLeafLine,
  'kubis': RiLeafLine,
  'kubis_(cabbage)': RiLeafLine,
  '🥬': RiLeafLine,
  'plant': RiPlantLine,
  'tanaman': RiPlantLine,
  'sayur': RiLeafLine,
  'sayuran': RiLeafLine,
  'leaf': RiLeafLine,
  'seedling': RiSeedlingLine,
  '🌱': RiPlantLine,

  // Weather mappings
  'sun': RiSunLine,
  '☀️': RiSunLine,
  'partly_cloudy': RiSunCloudyLine,
  '🌤️': RiSunCloudyLine,
  '⛅': RiSunCloudyLine,
  'cloudy': RiCloudyLine,
  '☁️': RiCloudyLine,
  'fog': RiMistLine,
  '🌫️': RiMistLine,
  'drizzle': RiDrizzleLine,
  '🌦️': RiDrizzleLine,
  'rain': RiRainyLine,
  '🌧️': RiRainyLine,
  'heavy_rain': RiHeavyShowersLine,
  'snow': RiSnowyLine,
  '🌨️': RiSnowyLine,
  '❄️': RiSnowyLine,
  'thunderstorm': RiThunderstormsLine,
  '⛈️': RiThunderstormsLine,
  'moon': RiMoonClearLine,
  '🌙': RiMoonClearLine,

  // UI / Actions / Status mappings
  'alert': RiAlertLine,
  '⚠️': RiAlertLine,
  'warning': RiErrorWarningLine,
  'success': RiCheckboxCircleLine,
  '🎉': RiCheckboxCircleLine,
  'calendar': RiCalendar2Line,
  '📅': RiCalendar2Line,
  'time': RiTimeLine,
  '⏱️': RiTimeLine,
  'location': RiMapPinLine,
  '📍': RiMapPinLine,
  'refresh': RiRefreshLine,
  '🔄': RiRefreshLine,
  'settings': RiSettings4Line,
  '⚙️': RiSettings4Line,
  'info': RiInformationLine,
  'ℹ️': RiInformationLine,
  'water': RiWaterFlashLine,
  '🌊': RiWaterFlashLine,
  'drop': RiDropLine,
  '🚿': RiDropLine,
  'pruning': RiScissorsCutLine,
  '✂️': RiScissorsCutLine,
  'write': RiInputMethodLine,
  '✍️': RiInputMethodLine,
  'box': RiBox3Line,
  '📦': RiBox3Line,
};

export default function UniversalIcon({ icon, className = "w-5 h-5 inline-block shrink-0" }) {
  if (!icon) return <RiPlantLine className={className} />;

  // If icon is already a React element (e.g. <RiSunLine />)
  if (React.isValidElement(icon)) {
    return React.cloneElement(icon, {
      className: `${className} ${icon.props.className || ''}`.trim(),
    });
  }

  // If icon is a React component function/class object
  if (typeof icon === 'function' || (typeof icon === 'object' && icon !== null)) {
    const IconComponent = icon;
    return <IconComponent className={className} />;
  }

  // If icon is a string (key, legacy emoji, name, or image URL)
  if (typeof icon === 'string') {
    const trimmed = icon.trim();

    // If icon is an image path or URL
    if (
      trimmed.startsWith('/') ||
      trimmed.startsWith('./') ||
      trimmed.startsWith('http://') ||
      trimmed.startsWith('https://') ||
      trimmed.startsWith('data:image/') ||
      trimmed.endsWith('.png') ||
      trimmed.endsWith('.svg') ||
      trimmed.endsWith('.jpg') ||
      trimmed.endsWith('.webp')
    ) {
      return (
        <img
          src={trimmed}
          className={`${className} object-contain`}
          alt=""
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      );
    }

    const lower = trimmed.toLowerCase();
    const normalized = lower.replace(/\s+/g, '_');

    // Direct and normalized lookup
    const MappedIcon =
      STRING_ICON_MAP[trimmed] ||
      STRING_ICON_MAP[lower] ||
      STRING_ICON_MAP[normalized];

    if (MappedIcon) {
      return <MappedIcon className={className} />;
    }

    // Partial match lookup for crop names passed as text (e.g., "Tomat (Tomato)")
    if (lower.includes('tomat')) return <RiPlantLine className={className} />;
    if (lower.includes('cabai') || lower.includes('chili')) return <RiSeedlingLine className={className} />;
    if (lower.includes('padi') || lower.includes('rice')) return <RiLeafLine className={className} />;
    if (lower.includes('jagung') || lower.includes('corn')) return <RiEarthLine className={className} />;
    if (lower.includes('bawang') || lower.includes('shallot')) return <RiPlantLine className={className} />;
    if (lower.includes('kubis') || lower.includes('cabbage')) return <RiLeafLine className={className} />;
    if (lower.includes('sayur') || lower.includes('leaf')) return <RiLeafLine className={className} />;

    return <RiPlantLine className={className} />;
  }

  return <RiPlantLine className={className} />;
}
