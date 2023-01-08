import Handlebars from 'handlebars';

import profile from './profile';

Handlebars.registerPartial('profile', profile);

export default (...arg) => {
	return Handlebars.compile(profile())(...arg);
}
