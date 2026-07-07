export const DEFAULT_LUNCH_MINUTES = 30;

/**
 * Calculates the estimated out time based on punch-in, shift duration, and lunch breaks.
 * @param {Object} attendance - The active attendance record
 * @param {Object} employee - The employee profile
 * @param {number} shiftHours - The employee's shift hours (8 or 9)
 * @param {number} clockDrift - Drift to adjust current time to server time
 * @returns {Date|null} - The estimated out Date object, or null if not punched in
 */
export const calculateEstimatedOutTime = (attendance, employee, shiftHours, clockDrift = 0) => {
  if (!attendance || !attendance.punch_in_time) return null;

  const punchInTime = new Date(attendance.punch_in_time).getTime();
  const shiftMs = shiftHours * 60 * 60 * 1000;
  const defaultLunchMs = DEFAULT_LUNCH_MINUTES * 60 * 1000;
  
  let lunchMsToAdd = defaultLunchMs;

  // After Lunch Ends: Use actual lunch duration
  if (attendance.lunch_end_time && attendance.lunch_start_time) {
    if (attendance.lunch_duration_ms !== undefined && attendance.lunch_duration_ms !== null) {
      lunchMsToAdd = attendance.lunch_duration_ms;
    } else {
      lunchMsToAdd = new Date(attendance.lunch_end_time).getTime() - new Date(attendance.lunch_start_time).getTime();
    }
  } 
  // During Lunch: Use max(30 min, current lunch duration)
  else if (attendance.lunch_start_time && !attendance.lunch_end_time) {
    const now = Date.now() + clockDrift;
    const currentLunchDuration = now - new Date(attendance.lunch_start_time).getTime();
    lunchMsToAdd = Math.max(defaultLunchMs, currentLunchDuration);
  }
  // Before Lunch: Implicitly uses defaultLunchMs (30 minutes)

  const estimatedOutMs = punchInTime + shiftMs + lunchMsToAdd;
  return new Date(estimatedOutMs);
};
