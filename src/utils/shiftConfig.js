export const EIGHT_HOUR_SHIFT = 8;

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
    AUTO_PUNCH_OUT_MS: (shiftHours + 0.5) * 60 * 60 * 1000,
  };
};
