var log = console.log;

// function parseLocation(location) {
// 	console.log('host', location.host);
// 	console.log('pathname', location.pathname);
// 	console.log('search', location.search);
// 	console.log('hash', location.hash);
//
// 	return {
// 		host: location.host,
// 		path: location.pathname,
// 		query: location.search, // TODO parse
// 		hash: location.hash
// 	};
// }

function parseLocation(location) {
	function parseSearch(search) {
		var result = {};

		var keyValuePart = search.slice(1);

		keyValuePart && keyValuePart.split('&').forEach(keyValue => {
			var [key, value] = keyValue.split('=');
			result[key] = value || '';
		});

		return result;
	}

	return {
		path: location.pathname,
		query: parseSearch(location.search),
		hash: location.hash.slice(1)
	};
}
class Router {
	constructor() {
		this.listeners = [];

		window.addEventListener('popstate', () => {
			this.locationChanged();
		});

		this.locationChanged();
	}

	locationChanged() {
		this.route = parseLocation(window.location);
		for (var listener of this.listeners) {
			listener(this.route);
		}
	}

	onRoute(listener) {
		this.listeners.push(listener);
		if (this.route) {
			listener(this.route);
		}
	}

	navigate(url) {
		window.history.pushState(null, null, url);
		this.locationChanged();
	}
}

