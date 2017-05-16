import Backbone from 'backbone';

import LogLevel from 'loglevel';
const logger = LogLevel.getLogger('RootView');

import RootTemplate from './root.hbs';

export default Backbone.View.extend({
  template: RootTemplate,
  serialize () {
    logger.debug('serialize RootView');
    return { who: 'World' };
  }
});
