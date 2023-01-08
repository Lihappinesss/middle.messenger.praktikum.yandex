import Handlebars from 'handlebars';

import error from './error';

Handlebars.registerPartial('error', error);

export default (err, text) => {
	return Handlebars.compile(error())({err, text});
}
