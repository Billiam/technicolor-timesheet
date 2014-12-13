'use strict';

var Types = {};

Types.fields = {
  description: {
    type: 'string',
    value: ''
  },
  descriptionPrefix: {
    type: 'string',
    value: ''
  },
  workorder: {
    type: 'string',
    value: ''
  },
  client: {
    type: 'string',
    value: ''
  },
  flagged: {
    type: 'boolean',
    value: true
  }
};

Types.keys = ['description', 'descriptionPrefix', 'workorder', 'client', 'flagged'];

module.exports = Types;