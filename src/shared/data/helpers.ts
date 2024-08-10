export function formatTime(totalSeconds: number, elapsedSeconds: number): string {
  // Calculate remaining seconds
  const remainingTime = totalSeconds - elapsedSeconds;

  // Ensure remaining time is not negative
  const safeRemainingTime = Math.max(remainingTime, 0);

  // Calculate hours, minutes, and remaining seconds
  const hours = Math.floor(safeRemainingTime / 3600);
  const minutes = Math.floor((safeRemainingTime % 3600) / 60);
  const remainingSeconds = Math.floor(safeRemainingTime % 60);

  // Format the time components with leading zeros if necessary
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  // Return the formatted string
  return `Осталось: ${formattedHours}h ${formattedMinutes}m ${formattedSeconds}s`;
}
