import Handlebars from 'handlebars';

import serverError from './serverError';

Handlebars.registerPartial('serverError', serverError);

export default (props = {}) => {
	return Handlebars.compile(serverError())(props);
}
