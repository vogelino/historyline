_define({
	BaseView: 'base/BaseView',
	Template : 'text!pages/content/content.html',
	PostsView: 'components/posts/postsView',
	PostsModel: 'components/posts/postsModel',
	Header: 'components/header/header',
	Moment: 'moment',
	Loading: 'util/loading'
}, function(m) {
	'use strict';

	var LIVE_REFRESH_DELAY = 10000;

	var content = function() {
		var that = {}, my = {};

		that.name = 'content';
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
			// that.fetchPosts({
			// 	liveRefresh: true
			// });
			m.Loading.stop();
		};

		that.startLiveRefresh = function() {
			my.liveRefresh = setTimeout(function() {
				that.fetchPosts();
				that.startLiveRefresh();
			}, LIVE_REFRESH_DELAY);
		};

		that.stopLiveRefresh = function() {
			 clearTimeout(my.liveRefresh);
		};

		that.forceRefresh = function() {
			m.Loading.start();
			that.fetchPosts({
				liveRefresh: false
			}).done(function() {
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
				window.inlineNotif.show({
					type: 'success',
					title: 'success',
					message: 'Api reached successfully'
				});
				console.log('fetch.done');
				$dfd.resolve();
				if (options && options.liveRefresh) {
					that.startLiveRefresh();
				}
			}, function(error) {
				m.Loading.stop();
				window.inlineNotif.show({
					message: error.message
				});
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

	return content;
});
