import Handlebars from 'handlebars';
import signup from './signup';

Handlebars.registerPartial('signup', signup);

export default (props = {}) => {
	return Handlebars.compile(signup())(props);
}
