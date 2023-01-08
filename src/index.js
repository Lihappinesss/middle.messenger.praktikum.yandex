import signin from './pages/signin';
import signup from './pages/signup';
import notFound from './pages/notFound';
import serverError from './pages/serverError';
import profile from './pages/profile';
import chat from './pages/chat';

import mainTpl from './index.hbs';
import signinTpl from './pages/signin/signin.hbs';
import signupTpl from './pages/signup/signup.hbs';
import chatTpl from './pages/chat/chat.hbs';
import profileTpl from './pages/profile/profile.hbs';
import notFoundTpl from './pages/notFound/notFound.hbs';
import serverErrorTpl from './pages/serverError/serverError.hbs';

import input from './components/Input';
import button from './components/Button';
import error from './components/Error';

import data from './data/chats.json';
import messages from './data/messages.json';

import './index.sass';

import avatar from './images/avatar.jpg'


function mainPage() {
  return mainTpl();
}

function signinPage() {
  return signinTpl({
    signin: signin({
      login: input('text', 'Логин', 'login'),
      pass: input('password', 'Пароль', 'password'),
      button: button('submit', 'Авторизоваться'),
    }),
  });
}

function signupPage() {
  return signupTpl({
    signup: signup({
      email: input('email', 'Почта', 'email'),
      login: input('text', 'Логин', 'login'),
      name: input('text', 'Имя', 'first_name'),
      sername: input('text', 'Фамилия', 'second_name'),
      tel: input('tel', 'Телефон', 'phone'),
      pass: input('password', 'Пароль', 'password'),
      button: button('submit', 'Зарегистрироваться'),
    }),
  })
}

function profilePage() {
  return profileTpl({
    profile: profile({
      name: input('name', '', 'first_name', 'name'),
      avatar,
      nameProfile: 'name',
      email: input('email', '', 'email', 'email'),
      login: input('text', '', 'login', 'login'),
      sername: input('text', '', 'second_name', 'sername'),
      tel: input('tel', '', 'phone', '8927'),
      pass: input('password', '', 'password', 'password'),
      changeData: button('submit', 'Сохранить'),
      exit: button('button', 'Выйти'),
    }),
  })
}

function notFoundPage() {
  return notFoundTpl({
    notFound: notFound({
      error: error('404', 'Не туда попали')
    })
  })
}

function serverErrorPage() {
  return serverErrorTpl({
    serverError: serverError({
      error: error('500', 'Мы уже фиксим')
    })
  })
}

function chatPage() {
  return chatTpl({
    chat: chat({
      users: data,
      messages,
      companion: 'Павел',
      inputField: input('text', 'Сообщение', 'message'),
    })
  })
}

const root = document.getElementById('root');

if (window.location.pathname === '/') {
  root.innerHTML = mainPage();
}
if (window.location.pathname === '/signin') {
  root.innerHTML = signinPage();
}
if (window.location.pathname === '/signup') {
  root.innerHTML = signupPage();
}
if (window.location.pathname === '/profile') {
  root.innerHTML = profilePage();
}
if (window.location.pathname === '/notFound') {
  root.innerHTML = notFoundPage();
}
if (window.location.pathname === '/serverError') {
  root.innerHTML = serverErrorPage();
}
if (window.location.pathname === '/chat') {
  root.innerHTML = chatPage();
}
