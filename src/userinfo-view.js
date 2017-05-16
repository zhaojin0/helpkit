
import Backbone from 'backbone';

import LogLevel from 'loglevel';
const logger = LogLevel.getLogger('UserInfoView');

import UserinfoTemplate from './userinfo.hbs';

let UserInfoModel = Backbone.Model.extend({
  url: '/user.json'
});

export default Backbone.View.extend({
  template: UserinfoTemplate,

  model: new UserInfoModel(),

  events: {
    'submit .userinfo-form': 'submitForm'
  },

  serialize () {
    logger.debug('serialize model json', this.model.toJSON());

    return this.model.toJSON();
  },

  initialize () {
    logger.info('initialize userinfo-view');
  },

  beforeRender () {
    let done = this.async();
    this.model.fetch()
      .then(() => done());
  },
  afterRender () {
    logger.info('after UserinfoView render');
  },
  submitForm (e) {
    e.preventDefault();

    logger.debug('submit form: ' + this.model.toJSON());
  }

});
