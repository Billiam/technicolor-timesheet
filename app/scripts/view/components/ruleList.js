var Vue = require('vue');
var template = require('app/view/template/ruleList');
var Sortable = require('sortablejs');

/**
 * @class RuleListComponent
 * @static
 */
Vue.component('rule-list', {
  template: template,
  replace: true,
  methods: {
    removeRule: function(rule) {
      this.$dispatch('remove-rule', rule);
    }
  },
  
  paramAttributes: ['rules'],
  
  ready: function() {
    var self = this;
    
    this.sort = Sortable.create(this.$el, {
      animation: 150,
      draggable: '.ruleset',
      filter: '.remove-rule',
      onStart: function() {
        Sortable.utils.toggleClass(self.$el, 'sorting', true);
      },
      
      onEnd: function() {
        var childNodes = self.$el.childNodes;
        var comments = [];
    
        //create childnodes snapshot
        for (var i = 0, l = childNodes.length; i < l; i++) {
           if(childNodes[i].nodeType === 8) {
             comments.push(childNodes[i]);
           }
        }
        
        //move all comment nodes to the end of the sort list
        comments.forEach(function(comment) {
          self.$el.appendChild(comment);
        });
            
        Sortable.utils.toggleClass(self.$el, 'sorting', false);
      },
      
      onUpdate: function(evt) {
        var oldIndex = evt.item.getAttribute('data-id');
        var newIndex = this.toArray().indexOf(oldIndex);
        
        if (oldIndex != null && newIndex != null && newIndex !== oldIndex) {
          self.$dispatch('sort-rules', oldIndex, newIndex);
        }
      }
    }); 
  }
});
