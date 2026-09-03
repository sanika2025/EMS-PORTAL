export const EIGHT_HOUR_SHIFT = 8;
export const RESUME_WORK_THRESHOLD_HOURS = 8.5;
export const AUTO_PUNCH_OUT_HOURS = 9;

/**
 * Returns the shift configuration for a given employee ID.
 * @param {string} employeeId - The unique employee ID (e.g., 'FS-CO002')
 * @returns {object} - Shift configuration including shiftHours, SHIFT_MS, and AUTO_PUNCH_OUT_MS
 */
export const getShiftConfig = (employeeId) => {
  const shiftHours = EIGHT_HOUR_SHIFT;
  
  return {
    shiftHours,
    SHIFT_MS: shiftHours * 60 * 60 * 1000,
    RESUME_WORK_THRESHOLD_MS: RESUME_WORK_THRESHOLD_HOURS * 60 * 60 * 1000,
    AUTO_PUNCH_OUT_MS: AUTO_PUNCH_OUT_HOURS * 60 * 60 * 1000,
  };
};
