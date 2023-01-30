import './index.sass';

import Signin from './pages/signin';
import Signup from './pages/signup';
import NotFound from './pages/notFound';
import ServerError from './pages/serverError';
import Profile from './pages/profile';
import Chat from './pages/chat';

import render from './utils/renderDom';

const signinPage = new Signin();
const signupPage = new Signup();
const serverErrorPage = new ServerError();
const notFoundPage = new NotFound();
const profilePage = new Profile();
const chatPage = new Chat();

if (window.location.pathname === '/') {
  render('#root', signinPage);
}
if (window.location.pathname === '/signin') {
  render('#root', signinPage);
}
if (window.location.pathname === '/signup') {
  render('#root', signupPage);
}
if (window.location.pathname === '/profile') {
  render('#root', profilePage);
}
if (window.location.pathname === '/notFound') {
  render('#root', notFoundPage);
}
if (window.location.pathname === '/serverError') {
  render('#root', serverErrorPage);
}
if (window.location.pathname === '/chat') {
  render('#root', chatPage);
}
