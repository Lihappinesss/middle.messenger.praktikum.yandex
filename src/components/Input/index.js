import Handlebars from 'handlebars';

import tpl from './input';

Handlebars.registerPartial('input', tpl);

export default(type, placeholder, name, value) => {
  return Handlebars.compile(tpl())({type, placeholder, name, value});
}
