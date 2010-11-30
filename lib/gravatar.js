var Crypto = require('crypto'),
  querystring = require('querystring'),
  SimpleHttpRequest = require('./simplehttp').SimpleHttpRequest;

var baseUrlImage = 'http://www.gravatar.com/avatar/';
var baseUrlProfile = 'http://www.gravatar.com/';
// HTTPS URLs
//var baseUrlImage = 'https://www.gravatar.com/avatar/';
//var baseUrlProfile = 'https://www.gravatar.com/';

exports.createHash = function (mailaddress) {
  // trim the address
  mailaddress = mailaddress.replace(/^\s*/, "").replace(/\s*$/, "");
  // convert to lower case
  mailaddress = mailaddress.toLowerCase();
  // calculate and return md5 hash
  return Crypto.createHash('md5').update(mailaddress).digest('hex');
}

exports.imageUrlFor = function(hash, options) {
  var res = baseUrlImage;

  var opt = options || {};
  var params = {};
  var appendFormat = '';

  if (opt.format) {
    appendFormat = opt.format.toLowerCase();

    if (appendFormat == 'qr') res = baseUrlProfile;
  } else {
    opt.format = '';
  }

  if (opt.size) {
    if (isNaN(opt.size)) {
      opt.size = null;
    } else {
      if (opt.size < 1) {
        opt.size = 1;
      } else if (opt.size > 512) {
        opt.size = 512;
      }
      params.s = opt.size;
    }
  } else {
    opt.size = null;
  }

  if (opt.rating) {
    params.r = opt.rating;
  }

  if (opt.defaultImage) {
    params.d = opt.defaultImage;
  }

  res += querystring.escape(hash);

  if (appendFormat != '') res += '.' + appendFormat;

  res += '?' + querystring.stringify(params);

  return res;
}

exports.profileUrlFor = function(hash, format, callbackName) {
  var setFormat = format ? '.' + format : '';
  var res = baseUrlProfile;

  res += querystring.escape(hash);
  res += querystring.escape(setFormat);

  if (callbackName) {
    res += '?callback=' + querystring.escape(callbackName);
  }

  return res;
}

exports.getProfileFor = function(hash, callback) {
  if (!(callback instanceof Function)) return;

  var requestUrl = exports.profileUrlFor(hash, 'json');

  SimpleHttpRequest(requestUrl, function(response, data) {
    if (response.statusCode == 200) {
      try {
        var decodedData = JSON.parse(data.toString());
        if (decodedData) {
          callback(null, decodedData);
        } else {
          callback("No data", null);
        }
      } catch(ex) {
        callback(ex, null);
      }
    } else {
      callback("Error: " + response.statusCode, null);
    }
  });
}
