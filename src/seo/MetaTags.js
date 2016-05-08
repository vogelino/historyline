import React from 'react';
import Helmet from 'react-helmet';

const shortTitle = `Historyline`;
const fullTitle = 'A visualisation of historical events and epoches over time';
const fullDescription = `Historyline is a data visualisation of historycal events and epoches over time`;
const serverUrl = process.env.NODE_ENV === 'production' ?
	'http://historyline.com/' : `http://localhost:${process.env.PORT || 3333}/`;
const contentUrl = typeof window === 'undefined' ? serverUrl : window.location.href;
const allKeywords = [
	'Data visualisation',
	'Historical timeline'
];

export default () =>
	<Helmet
		title='Welcome'
		titleTemplate={`${shortTitle} - %s`}
		meta={[
			{ name: 'description', content: fullDescription },
			{ property: 'og:type', content: 'article' },
			{ name: 'theme-color', content: '#2e2e2e' },
			{ name: 'keywords', content: allKeywords.join(', ') },
			{ name: 'news_keywords', content: allKeywords.join(', ') },

			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },

			{ itemprop: 'name', content: fullTitle },
			{ itemprop: 'description', content: fullDescription },

			{ name: 'twitter:site', content: 'article' },
			{ name: 'twitter:title', content: contentUrl },
			{ name: 'twitter:description', content: fullDescription },
			{ name: 'twitter:creator', content: '@soyvogelino' },

			{ property: 'og:title', content: fullTitle },
			{ property: 'og:type', content: 'article' },
			{ property: 'og:locale', content: 'en' },
			{ property: 'og:url', content: contentUrl },
			{ property: 'og:description', content: fullDescription },
			{ property: 'og:site_name', content: shortTitle }
		]}
		link={[
			{ rel: 'author', href: 'http://www.vogelino.com' }
		]}
	/>;
