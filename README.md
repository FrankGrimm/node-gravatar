gravatar.js for node.js
=============

A library to assemble gravatar URLs for [image](http://en.gravatar.com/site/implement/images/) and [profile](http://en.gravatar.com/site/implement/profiles/) requests, as well as the JSON API.

Usage
-------

### `gravatar.createHash(email)`

Creates and returns a hash of the email address according to the gravatar [implementation guide](http://en.gravatar.com/site/implement/hash/).

### `gravatar.imageUrlFor(hash[, options])`

Assembles the image URL for the hash. options is a object with the following supported keys:

* size: Integer (1-512) which will be the image size in pixel (defaults to 80px)
* defaultImage: String (a URL or one of the constants documented [here](http://en.gravatar.com/site/implement/images/) )
* rating: Only show an image that matches this rating
* format: A graphic format extension or 'qr' to get the QR Code image for the profile

### `gravatar.profileUrlFor(hash[, format, callback])`

Assembles the profile URL for the hash. If format and callback are omitted the human-usable profile URL is generated.
If format is set to 'json', the JavaScript API URL is generated. The callback parameter can be used to enclose the JSON data in a callback for client-side use.

### `gravatar.getProfileFor(hash, callback)`

Retrieves the JSON profile data object via HTTP. `callback` is a function with two parameters: `function(err, data)`
The data parameter will be set to the decoded JSON object retrieved from the API service.

Current TO-DO
------

* Support other formats than JSON
* Better error handling for the redirect support in SimpleHttpRequest
* Proper error handling in profile retrieval
* Inline documentation

