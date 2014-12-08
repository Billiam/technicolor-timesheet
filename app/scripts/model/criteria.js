'use strict';

var Criterion = require('app/model/criterion');
var Types = require('app/config/criteriaTypes');

/**
 * A collection of criterion instances, allowing tests for 'all match' and 'any match'
 * 
 * @class Criteria
 * @param {String} type either "any" or "all" 
 * @param {Array} criteria Array of criterion data
 * @constructor
 */
var Criteria = function(type, criteria) {
  criteria = criteria || [];
  
  /**
   * Comparison type (any or all)
   * 
   * @property type
   * @type String
   */
  this.type = type || 'any';

  this._matchMethod = type === 'any' ? 'some': 'every';
  /**
   * Method called on array of criterion objects when testing for matches
   *
   * @private
   * @property _matchMethod
   * @type String
   */

  /**
   * Collection of criterion instances
   * 
   * @property criteria
   * @type Criterion[]
   */
  this.criteria = [];

  /**
   * Key/Value pair of criteria columns to criteria objects
   * 
   * @property criteriaHash
   * @type {{}}
   */
  this.criteriaHash = {};
  
  this.addCriteria(criteria);
  this.generateCriteria();
};


var proto = Criteria.prototype;

/**
 * Fetch all active criteria
 * 
 * @method activeCriteria
 * @return {Criterion[]}
 */
proto.activeCriteria = function() {
  return this.criteria.filter(function(criterion) {
    return criterion.enabled;
  }, this);
};

/**
 * Add multiple criteria
 * 
 * @method addCriteria
 * @param {Object[]} data Criteria data 
 */
proto.addCriteria = function(data) {
  data.forEach(this.addCriterion, this);
};

/**
 * Add a single criterion
 * 
 * @method addCriterion
 * @param {Object} data Criterion data
 */
proto.addCriterion = function(data) {
  this.removeCriterion(data.column);
  
  var criterion = new Criterion(data);
  
  //insert criterion in sorted position
  this.insertSorted(criterion);

  this.criteriaHash[data.column] = criterion;
};

/**
 * Insert criterion into list in ordered position
 * 
 * @param {Criterion} criterion
 */
proto.insertSorted = function(criterion) {
  var insertIndex = criterion.position();
  
  var inserted = this.criteria.some(function(oldCriteria, i) {
    if (oldCriteria.position() > insertIndex) {
      this.criteria.splice(i, 0, criterion);
      return true;
    }
  }, this);

  if ( ! inserted) {
    this.criteria.push(criterion);
  }
};

/**
 * Remove criteria for a column, if present
 * 
 * @method removeCriterion 
 * @param {String} column Column name to remove
 */
proto.removeCriterion = function(column) {
  var criterion = this.criteriaHash[column];
  if (criterion) {
    var index = this.criteria.indexOf(criterion);
    if(index !== -1) {
      this.criteria.splice(index, 1);
    }
    
    delete this.criteriaHash[column];
  }
};

/**
 * Test whether a row matches any/all criteria
 * 
 * @method matches
 * @param {TimesheetEntry} row The entry to test
 * @return {Boolean} Whether entry can be said to match criteria
 */
proto.matches = function(row) {
  return this.activeCriteria()[this._matchMethod](function(criterion) {
    return criterion.matches(row);
  }, this);
};

/**
 * Add inactive, unselected criteria
 * 
 * @method generateCriteria
 */
proto.generateCriteria = function() {
  Types.keys.forEach(function(column) {
    if (this.criteriaHash[column] == null) {
      this.addCriterion({
        column: column,
        enabled: false
      });
    }
  }, this);
};

/**
 * Whether criteria set is valid
 * 
 * Some criteria should be set, and all criteria should be valid
 * 
 * @return {boolean}
 */
proto.isValid = function() {
  var criterionValid = true;
  
  this.criteria.forEach(function(criterion) {
    if ( ! criterion.isValid()) {
      criterionValid = false;
    }
  }, this);
  
  return criterionValid && this.activeCriteria().length > 0;
};

/**
 * Fetch criteria data for persistance
 * 
 * @method criteriaData
 * @return {Criterion[]}
 */
proto.criteriaData = function() {
  return this.activeCriteria()
    .map(function(criterion) {
      return criterion.toJson();
    });
};

module.exports = Criteria;