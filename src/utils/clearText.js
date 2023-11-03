
export const  clearText = (text) => {
   // Define arrays of characters and words to remove.
   const specialChars = ['!', '@', '#',   '^', '&', '*', '(', ')', '_', '+', '|', '~', '=', '`', '{', '}', '[', ']', ':', ';', "'", '<', '>', '?', ',', '.', '/', '"', '\\', '¬', '¦', '´', '”', '“', '‘', '’']; // etc.
   const sqlCommands = ['SELECT', 'UPDATE', 'DELETE', 'INSERT', 'DROP', 'OR', 'AND']; 
   const jsCommands = ['eval', 'Function', '=>', 'constructor'];
   const regexPatterns = [
    /\S+@\S+\.\S+/, // Email addresses
    /\b\d{3}[-.\s]?\d{2,4}[-.\s]?\d{2,4}\b/, // Phone numbers (This is a basic pattern that will capture many, but not all, phone number formats)
    /https?:\/\/\S+/ // URLs
];
   // Process the input to remove the special characters and command words.
   let sanitizedText = text;
  // Replace patterns defined in regexPatterns with "####".
  regexPatterns.forEach((pattern) => {
    sanitizedText = sanitizedText.replace(pattern, '$$$$');
  });
   // Remove special characters.
   specialChars.forEach((char) => {
     sanitizedText = sanitizedText.split(char).join('');
   });
 
   // Remove SQL command words.
   sqlCommands.forEach((command) => {
     const regex = new RegExp(`\\b${command}\\b`, 'gi'); // Matches the command as a whole word, case-insensitive.
     sanitizedText = sanitizedText.replace(regex, '');
   });
 
   // Remove dangerous JS commands.
   jsCommands.forEach((command) => {
     const regex = new RegExp(`\\b${command}\\b`, 'gi'); // Matches the command as a whole word, case-insensitive.
     sanitizedText = sanitizedText.replace(regex, '');
   });

   return sanitizedText;
 }
 

 