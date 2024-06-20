function uwuifyText(req, res) {
    try {
      const { text, crazy } = req.body; // Added 'crazy' option for intense transformations
  
      if (!text) {
        return res.status(400).json({ error: 'Text is required' });
      }
  
      // Base replacements
      let uwuText = text
        .replace(/(?:l|r)/gi, 'w')
        .replace(/(?:L|R)/g, 'W')
        .replace(/th/gi, 'f')  // Replace 'th' with 'f' for a cute twist
        .replace(/Th/g, 'F');   // Case-sensitive replacement
  
      // Handle 'Y' after 'N' with a Vowel
      uwuText = uwuText.replace(/n([aeiou])/gi, 'ny$1');
      uwuText = uwuText.replace(/N([aeiou])/g, 'Ny$1');
  
      // Repeat words ending in 'Y'
      uwuText = uwuText.replace(/\b(\w+)(y)\b/gi, '$1$2$2');
  
      // Random stuttering effect
      uwuText = uwuText.replace(/\b(\w+)\b/g, (match) => {
        if (Math.random() < 0.1) { // 10% chance of stuttering
          const firstLetter = match.charAt(0);
          return `${firstLetter}-${match}`;
        }
        return match;
      });
  
      // Random emotive substitutions
      uwuText = uwuText.replace(/\b(?:I)\b/g, 'me');  // Replace 'I' with 'me' for cuteness
      uwuText = uwuText.replace(/\b(?:you)\b/gi, 'uwu');  // Replace 'you' with 'uwu'
  
      // Random nicknames and endearments
      const nicknames = ['cutie', 'sweetie', 'darling', 'dear', 'honey', 'angel', 'bunny', 'pumpkin', 'snuggles'];
      uwuText = uwuText.replace(/\b(?:my)\b/gi, nicknames[Math.floor(Math.random() * nicknames.length)]);
  
      // Additional cute transformations
      uwuText = uwuText.replace(/(?:good|great|awesome)/gi, 'amazing');
      uwuText = uwuText.replace(/\b(?:is)\b/gi, 'is vewy');
      uwuText = uwuText.replace(/\b(?:are)\b/gi, 'awe');
  
      // Add cute suffixes to some words if crazy mode is enabled
      if (crazy) {
        uwuText = uwuText.replace(/\b(\w+)(ing)\b/gi, '$1y $2 uwu'); // Add 'uwu' after '-ing'
        uwuText = uwuText.replace(/\b(hello|hi)\b/gi, '$1o'); // Replace 'hello' or 'hi' with 'hello' with an 'o' at the end
      }
  
      // Randomly add cute prefixes if crazy mode is enabled
      if (crazy && Math.random() < 0.15) { // 15% chance of adding a prefix
        const cutePrefixes = ['hehe ', 'teehee ', 'blushu '];
        const randomPrefix = cutePrefixes[Math.floor(Math.random() * cutePrefixes.length)];
        uwuText = randomPrefix + uwuText;
      }
  
      res.status(200).json({ uwuText });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  module.exports = {
    uwuifyText,
  };
  