import Router from './router';
import Block from '../Block';

const router = new Router('#root');
document.body.innerHTML = '<div id="root"></div>';

describe('Router testing', () => {
  class Profile extends Block {}
  class Chat extends Block {}

  router
    .use('/settings', Profile)
    .use('/chat', Chat)
    .start();


  it('change path', () => {
    router.go('/chat');
    expect(router.history.length).toBe(2)
  });

  it('change path', () => {
    router.go('/chat');
    expect(window.location.pathname).toBe('/chat')
  });
});
