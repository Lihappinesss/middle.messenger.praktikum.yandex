import './index.sass';

import authController from './controllers/Auth';

import router from './modules/Router';

import Signin from './pages/signin';
import Signup from './pages/signup';
import Profile from './pages/profile';
import Chat from './pages/chat';
import NotFound from './pages/notFound';

import store from './store';

// eslint-disable-next-line no-shadow
enum RoutesPage {
  SigninPage = '/',
  SignupPage = '/sign-up',
  ChatPage = '/messenger',
  ProfilePage = '/settings',
  NotFoundPage = '/notFound',
}

window.addEventListener('DOMContentLoaded', async () => {
  router
    .use(RoutesPage.SigninPage, Signin)
    .use(RoutesPage.SignupPage, Signup)
    .use(RoutesPage.ProfilePage, Profile)
    .use(RoutesPage.ChatPage, Chat)
    .use(RoutesPage.NotFoundPage, NotFound);

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case RoutesPage.SigninPage:
      isProtectedRoute = false;
      break;
    case RoutesPage.SignupPage:
      isProtectedRoute = false;
      break;
    default:
      isProtectedRoute = true;
  }

  await authController.fetchUser();

  if (store.getState().user) {
    router.start();

    if (!isProtectedRoute) {
      router.go(RoutesPage.ProfilePage);
    }
  } else {
    router.start();

    if (isProtectedRoute) {
      router.go(RoutesPage.SigninPage);
    }
  }
});
