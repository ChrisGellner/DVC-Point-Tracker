import { differenceInDays, parseISO } from 'date-fns';

// Simplified 2025 DVC point chart (sample data)
const pointCharts = {
  'Animal Kingdom Lodge': {
    Studio: {
      Standard: { Adventure: 10, Magic: 15 },
      Savanna: { Adventure: 12, Magic: 18 },
    },
    '1-Bedroom': {
      Standard: { Adventure: 20, Magic: 30 },
      Savanna: { Adventure: 24, Magic: 36 },
    },
  },
  'Polynesian Villas': {
    Studio: {
      Standard: { Adventure: 15, Magic: 22 },
    },
    '1-Bedroom': {
      Standard: { Adventure: 30, Magic: 45 },
    },
  },
  'Bay Lake Tower': {
    Studio: {
      Standard: { Adventure: 12, Magic: 18 },
      Theme Park: { Adventure: 15, Magic: 22 },
    },
    '1-Bedroom': {
      Standard: { Adventure: 24, Magic: 36 },
      Theme Park: { Adventure: 28, Magic: 42 },
    },
  },
};

export const calculatePoints = ({ resort, checkIn, checkOut, roomType, viewType }) => {
  const checkInDate = parseISO(checkIn);
  const checkOutDate = parseISO(checkOut);
  const days = differenceInDays(checkOutDate, checkInDate);
  const month = checkInDate.getMonth() + 1;
  const season = month >= 9 && month <= 12 ? 'Magic' : 'Adventure'; // Simplified season logic
  const pointsPerNight = pointCharts[resort]?.[roomType]?.[viewType]?.[season] || 10; // Fallback
  return pointsPerNight * days;
};
