import Backbone from 'backbone';
import Layout from 'backbone.layoutmanager';
import _ from 'underscore';

// configure backbone.layoutmanager
const DEFAULT_CONTEXT = {
  app: { root: '/' }
};
const mockParse = _.once(() => {
  let originParse = Backbone.Collection.prototype.parse;
  Backbone.Collection.prototype.parse = function (data) {
    if (_.isObject(data)) {
      if (_.has(data, 'page')) {
        this.page = data.page; // page meta
      }
      if (_.has(data, 'content')) {
        return data.content;
      }
    }
    return originParse.call(this, data);
  };
});
const mockLayout = _.once(() => {
  Layout.configure({
    manage: true,
    fetchTemplate: template => {
      if (template) {
        return template;
      }
      throw new Error('template is null or empty');
    },
    renderTemplate: (template, context) => {
      // Assuming the template function accepts the context object and a callback
      // function, this is how you would render the template.
      return template(_.extend(context, DEFAULT_CONTEXT));
    }
  });
});

module.exports = {
  mockLayout: mockLayout,
  mockParse: mockParse,
  mockAll: () => {
    mockLayout();
    mockParse();
  }

};
