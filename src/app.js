'use strict';
import 'bootstrap';
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import Layout from 'backbone.layoutmanager';
import Handlebars from 'handlebars';
import LayoutView from './layout-view';

import './main.scss';

import LogLevel from 'loglevel';
const logger = LogLevel.getLogger('App');

import RootRouter from './root-router';
import UserInfoRouter from './userinfo-router';

// configure backbone.layoutmanager
const DEFAULT_CONTEXT = {
  app: { root: '/' }
};

Layout.configure({
  manage: true,
  fetchTemplate: function (template) {
    if ('^templates:'.test(template)) {
      let cached = Backbone.Layout.cache(template);
      // return cached
      if (cached) {
        return cached;
      }

      // async load
      let done = this.async();

      fetch(template).then(r => {
        cached = Backbone.Layout.cache(template, Handlebars.template(r.text()));
        done(cached);
      });
    } else if (template) {
      return template;
    } else {
      throw new Error('template is null or empty');
    }
  },
  renderTemplate: (template, context) => {
    // Assuming the template function accepts the context object and a callback
    // function, this is how you would render the template.
    return template(_.extend(context, DEFAULT_CONTEXT));
  }

});

if (process.env.NODE_ENV === 'development') {
  LogLevel.setLevel('debug');
}

$(document).ajaxError(function (event, jqxhr, settings, thrownError) {
  logger.error('ajax error', jqxhr.status);
  switch (jqxhr.status) {
    /*
    case 0:
      notify.error(gettext("CORS failed"));
      break;
    */
    case 401:
      // logger.error('Authenticate Failed');
      break;
    case 403:
      logger.error('Access Denied');
      break;
    default:
      logger.info('other status:', jqxhr.status);
  }
});

export const startup = _.once(() => {
  let layout = new LayoutView();

  $(document).on('click', 'a:not([data-bypass])', function (e) {
    let href = {
      prop: $(this).prop('href'),
      attr: $(this).attr('href')
    };

    e.preventDefault();

    Backbone.history.navigate(href.attr, true);
  });

  logger.debug('after Backbone history start');

  layout.render()
    .promise()
    .then(() => {
      let routers = {
        'userinfo': new UserInfoRouter(),
        'router': new RootRouter()
      };

      logger.info('init routers:', Object.keys(routers).join(','));

      logger.debug('before Backbone history start');

      Backbone.history.start({
        root: '/',
        pushState: true
      });

      layout.$el.appendTo($('section#wrapper'));
    })
    .catch((error) => {
      // TODO render layout error
      logger.error('layout manager render error', error);
    });

  logger.info('Helpkit startup');
});

$(document).ready(() => startup());
