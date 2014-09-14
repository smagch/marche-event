'use strict';
import Backbone from 'backbone';
import $ from 'jquery';
import moment from 'moment';
import marche14 from './marche-09-14.json';
import ekimae14 from './ekimae-09-14.json';
import _ from 'underscore';

Backbone.$ = $;

function populatePlaceAndDate(data) {
  var placeName = data.name;
  var date = data.date;
  _.each(data.data, function(d) {
    d.place = placeName;
    d.date = date;
  });
  return data.data;
}

function mergeDataAll() {
  var args = Array.prototype.slice.call(arguments);
  var collections = _.map(args, populatePlaceAndDate);
  return [].concat.apply([], collections)
}

var data = mergeDataAll(marche14, ekimae14);
var EventCollection = Backbone.Collection.extend({});
var coll = new EventCollection(data);

console.dir(data);
coll.on('sort', function(data) {
  console.log('sort');
  console.dir(data);
});

