import Backbone from 'backbone';

import LogLevel from 'loglevel';
const logger = LogLevel.getLogger('UserInfoRouter');

import UserInfoView from './userinfo-view';

const switchMainView = (view, viewName) => {
  viewName = viewName || 'unkndown-userinfo-view';
  Backbone.trigger('layout:switch-main', {
    navigation: 'userinfo',
    viewName: viewName,
    view: view
  });
};

export default Backbone.Router.extend({
  routes: {
    'userinfo': 'userinfo'
  },
  userinfo () {
    logger.info('switch UserInfoView');
    switchMainView(new UserInfoView());
  }
});

