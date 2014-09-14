'use strict';
import Backbone from 'backbone';
import $ from 'jquery';
import moment from 'moment';
import template from './template.html';
import _ from 'underscore';
import data from 'data';

Backbone.$ = $;


var EventCollection = Backbone.Collection.extend({
  initialize: function() {
    this.now = moment();
  },
  comparator: function(data) {
    var now = this.now || (this.now = moment()); 
    var datetime = data.get('datetime_end');
    //console.log(datetime);
    var diff = moment(datetime, 'YYYY-MM-DD h:mm').diff(now);
    return diff;
  }
});

var coll = new EventCollection(data);

coll.on('sort', function(data) {
  //console.dir(data);
  render(data.toJSON());
});

var templ = _.template(template);

function render(data) {
  var now = moment();
  data = _.filter(data, function(d) {
    return moment(d.datetime).diff(now) >= 0;
  });
  var out =templ({data: data});
  $('main').empty().html(out);
}

coll.sort();