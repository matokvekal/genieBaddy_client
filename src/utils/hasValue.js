

/**
 * Checks if a given value is null, undefined, or a non-empty string (ignoring whitespace).
 *
 * @param {any} value - The value to check.
 * @returns {boolean} - Returns true if the value is null, undefined, or a string containing only whitespace.
 */
export const hasValue = (value) => {

   if (value === null) {
     return false;
   }
 

   if (typeof value === 'string' && value.trim()=== '') {
     return false;
   }
 

   return true;
 };
 