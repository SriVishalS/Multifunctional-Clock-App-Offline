module.exports = {
	globDirectory: './',
	globPatterns: [
		'**/*.{svg,webp,png,mp3,html,json,js,css}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};