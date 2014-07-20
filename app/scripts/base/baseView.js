
_define({
	Loading: 'util/loading',
	Mustache: '../../bower_components/mustache/mustache',
	Moment: 'moment'
}, function(m) {

	'use strict';

	var BaseView = function() {
		var my = {}, that = {};
		my.model = undefined;

		that.name = 'view';
		that.instanceId = that.name + m.Moment();
		that.path = '';

		that.children = {};
		that.viewsList = [];

		that.construct = function() {
			that.on('after_render', that.eventAfterRender);
			that.on('view_ready', that.eventControllerReady);
			return that;
		};

		that.destructor = function() {
			that.destructChildren();
			that.getEvent().off(null, null, that.instanceId);
			var model = that.getModel();
			if (model) {
				model.destructor();
			}
			var collection = that.getCollection();
			if (collection) {
				collection.unbind();
			}
			that.off();

			that.postDestructor();
		};

		that.postDestructor = function() {};

		that.initialize = function() {
			that.postInitialize();
		};

		that.postInitialize = function() {
			that.trigger('initialize');
		};

		that.eventAfterRender = function() {
			that.onAfterRender.apply(that, arguments);
		};

		that.eventControllerReady = function() {
			that.bindEvents.apply(that, arguments);
		};

		that.destructChildren = function() {
			if (_.size(that.children) > 0) {
				_.each(that.children, function(child) {
					if (_.isArray(child)) {
						_.each(child, function(subChild) {
							my.destructChild(subChild);
						});
					}
					else {
						my.destructChild(child);
					}
				});
			}
		};

		my.destructChild = function(child) {
			if (_.isFunction(child.destructor)) {
				child.destructor();
			}
		};

		that.onAfterRender = function() {
			if (that.setMyElement()) {
				that.trigger('view_ready');
				that.triggerChildren('after_render');
			}
		};

		that.setMyElement = function($element) {
			var $finalElement = $element ? $element : $('.' + that.name + that.cid);
			if ($finalElement.length === 1) {
				that.setElement($finalElement);
				return true;
			}
			else if ($finalElement.length > 1) {

			}
			else {
				console.debug('(®) Render: Element "' + that.name + '" not found: ',
					'.' + that.name + that.cid);
				return false;
			}
		};

		that.bindEvents = function() {
			that.$el.find('.controller-export').
				off('click').
				on('click', function(e) {
					e.preventDefault();
				});
		};

		that.setModel = function(model) {
			my.model = model;
		};

		that.startLoading = function() {
			console.log();
			m.Loading.start();
		};

		that.stopLoading = function() {
			m.Loading.stop();
		};

		that.incLoading = function() {
			m.Loading.inc();
		};

		that.setLoading = function(percent) {
			var status = Math.round(NProgress.status * 100);
			if (status > percent) {
				return;
			}
			m.Loading.set(percent / 100);
		};

		that.getModel = function() {
			return my.model;
		};

		that.getTemplateData = function() {
			return {};
		};

		that.getPath = function() {
			var path = that.path;
			if (path.substr(path.length - 1) !== '/') {
				path += '/';
			}
			return path;
		};

		that.getTemplate = function() {
			if (that.template) {
				return that.template;
			}
			var template = '';
			if (_.isEmpty(that.path)) {
				console.info('!! the controller ' + that.name +
					' has no path variable and cannot autoload his template.');
			}
			else {
				require(['text!' + that.getPath() + that.name + '.html'], function(file) {
					template = file;
				});
			}
			return template;
		};

		that.render = function() {
			that.renderComponent();
		};

		that.renderComponent = function() {
			var data = that.getTemplateData() || {},
				template = that.getTemplate();
			my.renderTemplate(template, data);
		};

		that.afterRender = function() {};

		my.renderChildren = function() {
			var data = {};
			_.each(that.children, function(child, name) {
				child.render();
				data[name] = child.getHtml();
			});
			return data;
		};

		that.triggerChildren = function(eventname) {
			if (_.size(that.children) > 0) {
				_.each(that.children, function(child) {
					child.trigger(eventname);
				});
			}
		};

		my.renderTemplate = function(template, data) {
			var html = '', children = {};
			that.id += that.cid;

			if (_.size(that.children) > 0) {
				children = my.renderChildren(template);
			}

			data = _.extend(data, children);

			html = m.Mustache.render(template, data);
			that.$el.html(my.wrapHtml(html));

			that.trigger('dom_ready');

			return true;
		};

		my.wrapHtml = function(html) {
			var prefix = '<div class="' + that.name + that.cid + '">',
				suffix = '</div>';

			return prefix + html + suffix;
		};

		that.getHtml = function() {
			var html = m.Mustache.render(that.el.innerHTML);
			return html;
		};

		that.setCollection = function(model) {
			that.collection = model;
			that.collection.on('add', function(model) {
				var view = that.getSubView();
				view.setModel(model);
				that.viewsList.push(view);
				that.renderCollection();
			});
			that.collection.on('change', function() {
				that.renderCollection();
			});
			that.collection.on('remove', function(model) {
				_.each(that.viewsList, function(view) {
					var thatViewModel = view.getModel();
					if (thatViewModel.instanceId === model.instanceId) {
						view.destructor();
						model.destructor();
					}
				});
				that.renderCollection();
			});
		};

		that.renderCollection = function() {
			var
				children = {},
				template = '';
			_.each(that.viewsList, function(viewFromList) {
				var viewName = viewFromList.instanceId;
				children[viewName] = viewFromList;
				template += '{{{' + viewName + '}}}';
			});
			that.children = children;
			that.template = template;
			that.render();
			_.each(that.viewsList, function(viewFromList) {
				viewFromList.trigger('view_ready');
			});
		};

		that.getCollection = function() {
			return that.collection;
		};

		_.extend(that, Backbone.Events);
		var BackboneConst = Backbone.View.extend(that);
		that = new BackboneConst();
		that.construct.apply(that, arguments);
		return that;
	};

	return BaseView;
});
