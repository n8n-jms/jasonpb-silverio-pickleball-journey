export const OPENING_HOUR = 6;
export const CLOSING_HOUR = 22;
export const COACHING_DAYS = [0, 1, 2, 3, 4, 5, 6];

export function availableStartTimes(duration: number) {
  return Array.from({ length: Math.max(0, CLOSING_HOUR - duration - OPENING_HOUR + 1) }, (_, i) => {
    const hour = OPENING_HOUR + i;
    return `${hour % 12 || 12}:00 ${hour < 12 ? "AM" : "PM"}`;
  });
}

export function isValidSessionTime(time: string, duration: number) {
  return availableStartTimes(duration).includes(time);
}