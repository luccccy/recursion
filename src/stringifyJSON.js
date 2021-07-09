// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  var arrEle = [];
  var objEle = [];
  var objKey = [];
  if (typeof obj === 'number' || typeof obj === 'boolean' || obj === null) {
    return '' + obj;
  } else if (typeof obj === 'string') {
    return '"' + obj + '"';
  } else if (Array.isArray(obj)) {
    if (obj[0] === undefined) {
      return '[]';
    } else {
      for (var i = 0, len = obj.length; i < len; i++) {
        arrEle.push(stringifyJSON(obj[i]));
      }
      return '[' + arrEle + ']';
    }
  } else if (obj instanceof Object) {
    objKey = Object.keys(obj);
    objKey.forEach(function(key) {
      var keyOutput = '"' + key + '":';
      var keyValueOutput = obj[key];
      if (keyValueOutput instanceof Function || typeof keyValueOutput === undefined) {
        objEle.push('');
      } else if (typeof keyValueOutput === 'string') {
        objEle.push(keyOutput + '"' + keyValueOutput + '"');
      } else if (typeof keyValueOutput === 'boolean'
      || typeof keyValueOutput === 'number'
      || keyValueOutput === null) {
        objEle.push(keyOutput + keyValueOutput);
      } else if (keyValueOutput instanceof Object) {
        objEle.push(keyOutput + stringifyJSON(keyValueOutput));
      }
    });
    return '{' + objEle + '}';
  }
};
