'use strict';

/**
 * Error collection instance
 *
 * @class Error
 * @param {Array} values Error keys to generate in advance
 * @constructor
 */
var Errors = function (values) {
  if (values == null) {
    values = [];
  }
  
  this.messages = {
    base: []
  };
  
  values.forEach(function(val) {
    this.messages[val] = [];
  }, this);
  
  this.length = 0;
};

var proto = Errors.prototype;

/**
 * Fetch list of error messages
 *
 * @method errorMessages
 * @return {String[]}
 */
proto.errorMessages = function () {
  var messages = [];
  for (var field in this.messages) {
    messages = messages.concat(this.fieldErrorMessages(field));
  }
  return messages;
};

/**
 * Fetch error messages for a single field
 *
 * @method fieldErrorMessages
 * @param field
 * @return {String}
 */
proto.fieldErrorMessages = function(field) {
  if (Object.prototype.hasOwnProperty.call(this.messages, field)) {
    return this.messages[field];
  }
  return [];
};

/**
 * Whether error collection has any errors
 *
 * @method hasErrors
 * @return {boolean}
 */
proto.hasErrors = function () {
  return this.length > 0;
};

/**
 * Whether error collection contains no errors
 *
 * @method empty
 * @return {boolean}
 */
proto.empty = function() {
  return ! this.hasErrors();
};

/**
 * Whether a given field has any errors
 *
 * @method hasError
 * @param {String} field Fieldname to check for errors
 * @return {boolean}
 */
proto.hasError = function(field) {
  return this.messages[field] && this.messages[field].length > 0;
};

/**
 * Add a single error to the collection
 *
 * @method add
 * @param {String} field
 * @param message
 * @chainable
 */
proto.add = function (field, message) {
  if (this.messages[field] === undefined) {
    this.messages[field] = [];
  }

  this.length++;
  this.messages[field].push(message);

  return this;
};

/**
 * Clear error messages
 *
 * @method clear
 * @chainable
 */
proto.clear = function () {
  for (var key in this.messages) {
    if (Object.prototype.hasOwnProperty.call(this.messages, key)) {
      this.messages[key].splice(0, this.messages[key].length);
    }
  }
  
  this.length = 0;

  return this;
};


module.exports = Errors;
