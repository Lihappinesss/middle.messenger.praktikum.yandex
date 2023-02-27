import Block from '../../modules/Block';

import chatController from '../../controllers/ChatController';
import messageController from '../../controllers/MessageController';
import userController from '../../controllers/UserController';

import router from '../../modules/Router';
import connect from '../../hoc/connect';
import store from '../../store';
import {
  setMessages,
  setChatId,
  setSearchUsers,
  setShowUserAffect,
  setShowSearchUser,
}
  from '../../store/actions';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Chats from '../../components/Chats';
import MessageSend from '../../components/MessageSend';
import UserAffect from '../../components/UserAffectList';
import Popup from '../../components/Popup';

import template from './template';

import more from '../../images/more.svg';

class ChatPage extends Block {
  constructor(tag: string, props: Record<string, any> = {}) {
    super('div', {
      ...props,
    });
  }

  init() {
    let chatName = '';

    this.children.NewChatInput = new Input({
      type: 'text',
      placeholder: 'Название чата',
      name: 'chatName',
      onInput: (value: string) => { chatName = value; },
    });

    this.children.CreateNewChatBtn = new Button({
      text: 'Создать чат',
      attr: {
        type: 'button',
      },
      onClick: () => {
        chatController.create({
          title: chatName,
        }).then(() => this.requestChatList());
      },
    });

    this.children.ChatsCard = new Chats('ul', {
      onClick: (chatId: number) => {
        store.dispatch(setMessages([]));
        messageController.leave();
        store.dispatch(setChatId(chatId));
        this.requestChat(chatId);
        this.requestChatUsers();
      },
    });

    this.children.SearchChat = new Input({
      type: 'text',
      placeholder: 'Поиск',
      name: 'search',
      styleType: 'secondary',
      // onInput: (value) => console.log(value),
    });

    this.children.Send = new MessageSend('form', {
      onMessageSend: (e: Event) => {
        this.handleSend(e);
      },
      events: {
        submit: (e: Event) => {
          this.handleSend(e);
        },
      },
    });

    this.children.UserAffectList = new UserAffect('ul', {
      ...this.props,
      addUser: () => {
        store.dispatch(setShowUserAffect(false));
        store.dispatch(setShowSearchUser(true));
      },
      deleteUser: () => {
        const data = {
          chatId: this.props.chatId,
          users: this.props.chatUsers,
        };
        chatController.deleteUserChat(data);
        store.dispatch(setShowUserAffect(false));
      },
      deleteChat: () => {
        const data = {
          chatId: this.props.chatId,
        };
        chatController.removeChat(data);
        store.dispatch(setShowUserAffect(false));
      },
    });

    this.children.PopupChat = new Popup('div', {
      ...this.props,
      onInput: (value: string) => {
        if (value === '') {
          store.dispatch(setSearchUsers([]));
        } else {
          userController.search(value);
        }
      },
      onClick: (userId: number) => {
        const users = [];
        users.push(userId);
        const data = {
          users,
          chatId: this.props.chatId,
        };
        chatController.addUserChat(data).then(() => {
          this.requestChatUsers();
        });
        store.dispatch(setShowSearchUser(false));
      },
      closeSearch: () => {
        store.dispatch(setShowSearchUser(false));
      },
    });

    this.children.MoreBtn = new Button({
      icon: more,
      attr: {
        type: 'button',
      },
      type: 'ghost',
      onClick: () => store.dispatch(setShowUserAffect(true)),
    });

    this.children.GoProfileBtn = new Button({
      text: 'Профиль',
      attr: {
        type: 'button',
      },
      type: 'ghost',
      onClick: () => {
        router.go('/settings');
      },
    });
  }

  requestMessages(token: string) {
    messageController.connect({
      userId: this.props.user?.id,
      chatId: this.props.chatId,
      token,
    });
  }

  requestChat(chatId: number) {
    if (!chatId) {
      return;
    }
    chatController.requestMessageToken(chatId)
      .then(() => {
        this.requestMessages(this.props.token);
      });
  }

  requestChatList() {
    return chatController.request()
      .then(() => {
        this.requestChat(this.props.chatId);
      });
  }

  requestChatUsers() {
    chatController.requestChatUsers(this.props.chatId);
  }

  handleSend(e: Event) {
    e.preventDefault();

    const form = (e.target as HTMLElement).closest('form');

    const fields = Array.from(form).filter((el) => el.nodeName === 'INPUT');
    const formData = fields.reduce((acc: Record<string, string>, field: HTMLInputElement) => {
      acc[field.name] = field.value;
      return acc;
    }, {});

    if (!formData.message) {
      return;
    }

    messageController.sendMessage(formData.message);
  }

  componentDidMount() {
    this.requestChatList().then(() => this.requestChatUsers());
  }

  render(): DocumentFragment {
    return (
      this.compile(template(this.props), this.props)
    );
  }
}

const withStore = connect((state) => ({
  user: state.user,
  chatUsers: state.chatUsers,
  chats: state.chats,
  messages: state.messages,
  socket: state.socket,
  chatId: state.chatId,
  token: state.token,
  searchUsers: state.searchUsers,
  showUserAffect: state.showUserAffect,
  showSearchUser: state.showSearchUser,
}));

const Chat = withStore(ChatPage);

export default Chat;
