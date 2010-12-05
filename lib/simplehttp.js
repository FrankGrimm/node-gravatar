exports.SimpleHttpRequest = function(requestURI, callback, maxRedirects) {
  var url = require('url');
  var parsedURI = url.parse(requestURI);

  // set some defaults
  parsedURI.pathname = parsedURI.pathname || '/';
  parsedURI.port = parsedURI.port || 80;
  parsedURI.hostname = parsedURI.hostname || 'localhost';

  var httpClient = require('http').createClient(parsedURI.port, parsedURI.hostname);
  var httpRequest = httpClient.request('GET', parsedURI.pathname, 
				{ 'host': parsedURI.hostname});
  var responseBuffer = null;
  var responseObject = null;
  var isRedirected = false;
  var maxRedirectCount = 5;
  if (maxRedirects != undefined) maxRedirectCount = maxRedirects;

  httpRequest.on('response', function(response) {
    responseObject = response;

      if (response.headers && response.headers['location'] && maxRedirectCount) {
        isRedirected = true;
        httpRequest.end();
        exports.SimpleHttpRequest(response.headers['location'], callback, maxRedirectCount - 1);
      } else if (!maxRedirectCount) {
        callback(new Error('Max redirect count exceeded'));
      }

    responseObject.on('data', function(chunk) {
      responseBuffer = addToBuffer(responseBuffer, chunk);
    });
    responseObject.on('end', function() {
      if (!isRedirected) {
        // valid data response was buffered
        process.nextTick(function() {
          callback(null, responseObject, responseBuffer);
        });
      }
    });
  });
	httpRequest.end();

}

var addToBuffer = function(destBuffer, chunk) {
	var res = null;
	if (destBuffer !== null) {
		res = new Buffer(destBuffer.length + chunk.length);
		destBuffer.copy(res, 0, 0);
		chunk.copy(res, destBuffer.length, 0);
	} else {
		res = chunk;
	}
	return res;
}
