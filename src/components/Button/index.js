import Handlebars from 'handlebars';

import tpl from './button';

Handlebars.registerPartial('button', tpl);

export default(type, text) => {
  return Handlebars.compile(tpl())({type, text});
}
