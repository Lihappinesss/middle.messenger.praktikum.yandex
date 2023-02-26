import './index.sass';

import authController from './controllers/Auth';

import router from './modules/Router';

import Signin from './pages/signin';
import Signup from './pages/signup';
import Profile from './pages/profile';
import Chat from './pages/chat';

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
    .use(RoutesPage.ChatPage, Chat);

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

  try {
    await authController.fetchUser();
    router.start();

    if (!isProtectedRoute) {
      router.go(RoutesPage.ProfilePage);
    }
  } catch (e) {
    router.start();

    if (isProtectedRoute) {
      router.go(RoutesPage.SigninPage);
    }
  }
});
