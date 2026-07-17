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
  // Crop / Komoditas mappings (both string keys and legacy emojis from localStorage)
  'tomato': RiPlantLine,
  '🍅': RiPlantLine,
  'chili': RiSeedlingLine,
  '🌶️': RiSeedlingLine,
  'rice': RiLeafLine,
  '🌾': RiLeafLine,
  'corn': RiEarthLine,
  '🌽': RiEarthLine,
  'shallot': RiPlantLine,
  '🧅': RiPlantLine,
  'cabbage': RiLeafLine,
  '🥬': RiLeafLine,
  'plant': RiPlantLine,
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

  // If icon is a string (key or legacy emoji)
  if (typeof icon === 'string') {
    const MappedIcon = STRING_ICON_MAP[icon] || STRING_ICON_MAP[icon.trim()] || RiPlantLine;
    return <MappedIcon className={className} />;
  }

  return <RiPlantLine className={className} />;
}
