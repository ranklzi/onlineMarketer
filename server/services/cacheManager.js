'use strict';

var cacheManager = (function() {

	var cache = {};

	return {
		clear: function() {
			cache = {};
		},
		getValue: function(key) {
			var obj = cache[key];
			if (!obj) {
				return {};
			}
			return obj;

		},
		setValue: function(key, obj) {
			cache[key] = obj;
		},
		containsKey: function(key) {
			return (key in cache);
		}
	}
}());

exports.cacheManager = cacheManager;