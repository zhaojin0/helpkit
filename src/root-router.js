import Backbone from 'backbone';

import RootView from './root-view';

import LogLevel from 'loglevel';
const logger = LogLevel.getLogger('RootRouter');

const switchMainView = (view, viewName) => {
  viewName = viewName || 'unkndown-view';
  Backbone.trigger('layout:switch-main', {
    navigation: 'root',
    viewName: viewName,
    view: view
  });
};

export default Backbone.Router.extend({
  routes: {
    '': 'root'
  },
  root () {
    logger.debug('switch RootView');
    switchMainView(new RootView());
  }
});

