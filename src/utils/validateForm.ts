const isBetween = (
  length: number,
  min: number,
  max: number,
) => {
  if (length > max || length < min) return false;
  return true;
};

const isRequired = (value: string) => {
  if (value === '') return false;
  return true;
};

const isEmailValid = (email:string) => {
  const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  return re.test(email);
};

const isPasswordSecure = (password: string) => {
  const re = /[-+~!?@#$%^&*;\\()\\[\\]\\|:\\w]*/;
  return re.test(password);
};

const phoneValid = (phone: string) => {
  const re = /\+7\(\d{3}\)\d{3}-\d{2}-\d{2}/;
  return re.test(phone);
};

const showError = (input: HTMLElement, message: string):void => {
  const formWrapper = input.parentElement;

  const error = formWrapper.querySelector('.error');
  error.textContent = message;
};

const showSuccess = (input: HTMLElement) => {
  const formWrapper = input.parentElement;

  const error = formWrapper.querySelector('.error');
  error.textContent = '';
};

const validateEmail = (email: string, elem?: HTMLElement): boolean => {
  let valid = false;
  if (!isRequired(email)) {
    showError(elem, 'Введите email');
  } else if (!isEmailValid(email)) {
    showError(elem, 'Не валидный email');
  } else {
    showSuccess(elem);
    valid = true;
  }
  return valid;
};

const validatePassword = (password: string, elem?: HTMLElement) => {
  let valid = false;
  if (!isRequired(password)) {
    showError(elem, 'Введите пароль');
  } else if (!isPasswordSecure(password)) {
    showError(elem, 'Пароль должен содержать одну заглавную букву, от 8 до 40 смиволов');
  } else {
    showSuccess(elem);
    valid = true;
  }
  return valid;
};

const validateLogin = (login: string, elem?: HTMLElement): boolean => {
  let valid = false;
  if (!isRequired(login)) {
    showError(elem, 'Введите логин');
  } else if (!isBetween(login.length, 3, 20)) {
    showError(elem, 'Логин от 3 до 20 символов');
  } else {
    showSuccess(elem);
    valid = true;
  }
  return valid;
};

const validateName = (name: string, elem?: HTMLElement): boolean => {
  let valid = false;
  if (!isRequired(name)) {
    showError(elem, 'Введите логин');
  } else if (!isBetween(name.length, 3, 20)) {
    showError(elem, 'Логин от 3 до 20 символов');
  } else {
    showSuccess(elem);
    valid = true;
  }
  return valid;
};

const validatePhone = (phone: string, elem?: HTMLElement) => {
  let valid = false;
  if (!isRequired(phone)) {
    showError(elem, 'Введите номер');
  } else if (!phoneValid(phone)) {
    showError(elem, 'Не верный фомат');
  } else {
    showSuccess(elem);
    valid = true;
  }
  return valid;
};

const validateMessage = (message: string, elem?: HTMLElement) => {
  let valid = false;
  if (!isRequired(message)) {
    showError(elem, 'Пустое сообщение');
  } else {
    showSuccess(elem);
    valid = true;
  }
  return valid;
};

const validateForm = (value: string, name: string, elem?: HTMLElement) => {
  let isValid = true;
  if (name === 'email') {
    isValid = validateEmail(value, elem);
  }
  switch (name) {
    case 'email':
      isValid = validateEmail(value, elem);
      break;
    case 'password':
      isValid = validatePassword(value, elem);
      break;
    case 'login':
      isValid = validateLogin(value, elem);
      break;
    case 'first_name':
      isValid = validateName(name, elem);
      break;
    case 'second_name':
      isValid = validateName(name, elem);
      break;
    case 'phone':
      isValid = validatePhone(name, elem);
      break;
    case 'message':
      isValid = validateMessage(name, elem);
      break;
    default:
      return isValid;
  }
  return isValid;
};

export default validateForm;
