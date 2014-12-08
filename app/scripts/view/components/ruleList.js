var Vue = require('vue');
var template = require('app/view/template/ruleList');
var Sortable = require('sortablejs');

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
