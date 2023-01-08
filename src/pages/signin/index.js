import Handlebars from 'handlebars';

import signin from './signin';

Handlebars.registerPartial('signin', signin);

export default (props = {}) => {
	return Handlebars.compile(signin())(props);
}
