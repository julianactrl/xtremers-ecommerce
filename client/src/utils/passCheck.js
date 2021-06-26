export default (input, language) => {
  //   const s = strings[language];
  let errors = [];
  // if (!/[a-z]/.test(input)) errors.push(s.lower + ' (a-z)');
  // if (!/[A-Z]/.test(input)) errors.push(s.upper + ' (A-Z)');
  // if (!/[0-9]/.test(input)) errors.push(s.number + ' (0-9)');
  // if (!/[^a-zA-Z0-9]/.test(input)) errors.push(s.special + ' (- _ ! @ # $ %)');
  // if (input.length < 8 || input.length > 15) errors.push(s.size);
  return errors;
};
