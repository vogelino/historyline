_define({
	BaseView: 'base/BaseView',
	Template : 'text!tests/wordpressTest.html',
	PostsView: 'components/posts/postsView',
	PostsModel: 'components/posts/postsModel',
	request: 'util/request',
	Moment: 'moment',
	Loading: 'util/loading'
}, function(m) {
	'use strict';

	var wordpressTest = function() {
		var that = {}, my = {};

		that.name = 'wordpressTest';
		that.instanceId = that.name + m.Moment();
		that.template = m.Template;

		that.construct = function() {
			that.on('view_ready', that.onViewReady);

			my.postsView = new m.PostsView();
			var PostsCollection = Backbone.Collection.extend({
				model: m.PostsModel
			});
			my.postsCollection = new PostsCollection();
			my.postsView.setCollection(my.postsCollection);

			that.children = {
				posts: my.postsView
			};

			return that;
		};

		that.postDestructor = function() {
			that.stopLiveRefresh();
		};

		that.onViewReady = function() {
			that.fetchPosts();

			that.startLiveRefresh();
		};

		that.startLiveRefresh = function() {
			my.liveRefresh = setTimeout(function() {
				that.fetchPosts();
				that.startLiveRefresh();
			}, 3000);
		};

		that.stopLiveRefresh = function() {
			 clearTimeout(my.liveRefresh);
		};

		that.fetchPosts = function() {
			console.log('fetch.start');
			var req = m.request().new('get_recent_posts', {
				tagSlug: 'test'
			});

			req.done(function(response) {
				var posts = [];
				_.each(response.posts, function(val) {
					var model = new m.PostsModel();
					model.set(val);
					posts.push(model);
				});
				my.postsCollection.set(posts);
				m.Loading.stop();
				console.log('fetch.done');
			});
		};

		var inherited = m.BaseView();
		that = _.extend(inherited, that);
		that.construct.apply(that, arguments);
		return that;
	};

	return wordpressTest;
});
