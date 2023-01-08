import Handlebars from 'handlebars';

import notFound from './notFound';

Handlebars.registerPartial('notFound', notFound);

export default (props = {}) => {
	return Handlebars.compile(notFound())(props);
}
