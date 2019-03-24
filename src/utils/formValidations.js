export const loginValidation = login => {
  if (!login || login === '') {
    return 'Username is not set';
  } else if (login.length < 5) {
    return 'Username is too short';
  } else {
    return true;
  }
};

export const passwordValidation = password => {
  if (!password || password === '') {
    return 'Password is not set';
  } else if (password.length < 8) {
    return 'Password is too short';
  } else {
    const numbers = password.match(/[0-9]/g);
    if (!numbers || numbers.length < 2) {
      return 'Password must contains at least 2 digits';
    }

    const uppercases = password.match(/[A-Z]/g);
    if (!uppercases || uppercases.length < 1) {
      return 'Password must contains at least 1 capital letter';
    }

    const specialChars = password.match(/[^a-zA-Z0-9]/g);
    if (!specialChars || specialChars.length < 1) {
      return 'Password must contains at least 1 special character';
    }

    return true;
  }
};

export const formValidations = {
  login: loginValidation,
  password: passwordValidation,
};

export default formValidations;
