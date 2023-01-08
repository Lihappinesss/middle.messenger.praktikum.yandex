import Handlebars from 'handlebars';

import chat from './chat';

Handlebars.registerPartial('chat', chat);

export default (...arg) => {
	return Handlebars.compile(chat())(...arg);
}
