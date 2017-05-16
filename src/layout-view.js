'use strict';

import Backbone from 'backbone';
import Layout from 'backbone.layoutmanager';

import './layout.scss';

import LogLevel from 'loglevel';
const logger = LogLevel.getLogger('LayoutView');

import LayoutTemplate from './layout.hbs';

export default Layout.extend({

  template: LayoutTemplate, // require layout.hbs

  afterRender () {
    logger.debug('after layout render');
    let that = this;
    let lastView;
    Backbone.on('layout:switch-main', o => {
      o = o || {};
      logger.debug('layout switch  main-view', o);
      if (!o.view) {
        throw new Error('switch:main-view required options.view without undefined!! viewName: ' + o.viewName);
      }

      if (lastView) {
        lastView.remove();
      }

      lastView = o.view;

      logger.debug('removeLastView, switch view');

      that.setView('#main', o.view).render().promise()
        .then(() => {
          logger.debug('render view success:', o.viewName);
        })
        .catch(() => {
          // TODO render error
          logger.warn('render view error:', o.viewName);
        });
    });
  }

});
