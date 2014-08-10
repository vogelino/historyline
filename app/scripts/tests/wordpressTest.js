_define({
	BaseView: 'base/BaseView',
	Template : 'text!tests/wordpressTest.html',
	PostsView: 'components/posts/postsView',
	PostsModel: 'components/posts/postsModel',
	Header: 'components/header/header',
	Moment: 'moment',
	Loading: 'util/loading',
	Contentful: 'contentful'
}, function(m) {
	'use strict';

	var LIVE_REFRESH_DELAY = 10000;

	var wordpressTest = function() {
		var that = {}, my = {};

		that.name = 'wordpressTest';
		that.instanceId = that.name + m.Moment();
		that.template = m.Template;

		that.events = {
			'click button.refresh': 'forceRefresh'
		};

		that.construct = function() {
			that.on('view_ready', that.onViewReady);

			my.postsView = new m.PostsView();
			var PostsCollection = Backbone.Collection.extend({
				model: m.PostsModel
			});
			my.postsCollection = new PostsCollection();
			my.postsView.setCollection(my.postsCollection);

			var header = new m.Header();
			that.children = {
				header: header,
				posts: my.postsView
			};

			return that;
		};

		that.postDestructor = function() {
			that.stopLiveRefresh();
		};

		that.onViewReady = function() {
			that.fetchPosts({
				liveRefresh: true
			});
		};

		that.startLiveRefresh = function() {
			my.liveRefresh = setTimeout(function() {
				that.fetchPosts();
				that.startLiveRefresh();
			}, 5000);
		};

		that.stopLiveRefresh = function() {
			 clearTimeout(my.liveRefresh);
		};

		that.forceRefresh = function() {
			m.Loading.start();
			that.fetchPosts({
				liveRefresh: false
			}).done(function() {
				var $message = that.$el.find('.refresh-done-message');
				$message.slideDown();
				_.delay(function() {
					$message.slideUp();
				}, LIVE_REFRESH_DELAY);
			});
		};

		that.fetchPosts = function(options) {
			console.log('fetch.start');
			var $dfd = $.Deferred();

			window.Api.entries({
				'content_type': '2svEnQffpKYo0we00YEmkg'
			}).then(function(response) {
				var posts = [];
				_.each(response.posts, function(val) {
					var model,
						oldModel = my.postsCollection.get(val.id);
					if (!_.isUndefined(oldModel)) {
						model = oldModel;
					}
					else {
						model = new m.PostsModel();
					}
					model.set(val);
					if (model.hasChanged()) {
						m.Loading.start();
					}
					posts.push(model);
				});
				my.postsCollection.set(posts);
				m.Loading.stop();
				console.log('fetch.done');
				$dfd.resolve();
				if (options && options.liveRefresh) {
					that.startLiveRefresh();
				}
			}, function() {
				var $message = that.$el.find('.refresh-fail-message');
				$message.slideDown();
				m.Loading.stop();
				that.stopLiveRefresh();
				$dfd.reject();
			});

			return $dfd.promise();
		};

		var inherited = m.BaseView();
		that = _.extend(inherited, that);
		that.construct.apply(that, arguments);
		return that;
	};

	return wordpressTest;
});
