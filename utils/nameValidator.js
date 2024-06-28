function motherNameValidator(name) {

  if (typeof name !== 'string') {
    return { valid: false, message: 'Name must be a string.' };
  }

  
  const words = name.trim().split(/\s+/);

  
  if (words.length !== 4) {
    return { valid: false, message: 'Full Name must consist of exactly four names.' };
  }

  
  const nameRegex = /^[a-zA-Z]+$/;

  for (let word of words) {
    if (!nameRegex.test(word)) {
      return { valid: false, message: 'Each name in the fullname must contain only alphabetic characters.' };
    }
  }

  return { valid: true, message: 'Valid name.' };
}

export default motherNameValidator;