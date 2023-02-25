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
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return re.test(password);
};

const phoneValid = (phone: string) => {
  const re = /\+7\(\d{3}\)\d{3}-\d{2}-\d{2}/;
  return re.test(phone);
};

const showError = (input?: HTMLElement, message?: string):void => {
  if (!input && !message) return;
  const formWrapper = input.parentElement;

  const error = formWrapper.querySelector('.error');
  error.textContent = message;
};

const showSuccess = (input: HTMLElement) => {
  if (input) {
    const formWrapper = input.parentElement;

    const error = formWrapper.querySelector('.error');
    error.textContent = '';
  }
};

const validateEmail = (email: string, elem?: HTMLElement): boolean => {
  let valid = false;
  if (!isRequired(email) && elem) {
    showError(elem, 'Введите email');
  } else if (!isEmailValid(email) && elem) {
    showError(elem, 'Не валидный email');
  } else {
    showSuccess(elem);
    valid = true;
  }
  return valid;
};

const validatePassword = (password: string, elem?: HTMLElement) => {
  let valid = false;
  if (!isRequired(password) && elem) {
    showError(elem, 'Введите пароль');
  } else if (!isPasswordSecure(password) && elem) {
    showError(elem, 'Пароль должен содержать одну заглавную букву, от 8 до 40 смиволов');
  } else {
    showSuccess(elem);
    valid = true;
  }
  return valid;
};

const validateLogin = (login: string, elem?: HTMLElement): boolean => {
  let valid = false;
  if (!isRequired(login) && elem) {
    showError(elem, 'Введите логин');
  } else if (!isBetween(login.length, 3, 20) && elem) {
    showError(elem, 'Логин от 3 до 20 символов');
  } else {
    showSuccess(elem);
    valid = true;
  }
  return valid;
};

const validateName = (name: string, elem?: HTMLElement): boolean => {
  let valid = false;
  if (!isRequired(name) && elem) {
    showError(elem, 'Введите имя');
  } else if (!isBetween(name.length, 3, 20) && elem) {
    showError(elem, 'Логин от 3 до 20 символов');
  } else {
    showSuccess(elem);
    valid = true;
  }
  return valid;
};

const validatePhone = (phone: string, elem?: HTMLElement) => {
  let valid = false;
  if (!isRequired(phone) && elem) {
    showError(elem, 'Формат: +7(999)999-99-99');
  } else if (!phoneValid(phone) && elem) {
    showError(elem, 'Не верный фомат');
  } else {
    showSuccess(elem);
    valid = true;
  }
  return valid;
};

const validateMessage = (message: string, elem?: HTMLElement) => {
  let valid = false;
  if (!isRequired(message) && elem) {
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
      isValid = validateName(value, elem);
      break;
    case 'second_name':
      isValid = validateName(value, elem);
      break;
    case 'phone':
      isValid = validatePhone(value, elem);
      break;
    case 'message':
      isValid = validateMessage(value, elem);
      break;
    case 'display_name':
      isValid = validateName(value, elem);
      break;
    default:
      return isValid;
  }
  return isValid;
};

export default validateForm;
