'use strict';

var Types = {};

Types.fields = {
  description: 'string',
  descriptionPrefix: 'string',
  workorder: 'string',
  client: 'string',
  flagged: 'boolean'
};

Types.keys = ['description', 'descriptionPrefix', 'workorder', 'client', 'flagged'];

module.exports = Types;