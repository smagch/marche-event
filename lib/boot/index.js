'use strict';
import Backbone from 'backbone';
import $ from 'jquery';
import moment from 'moment';
import eki14 from './eki-marche-09-14.json';
import eki15 from './eki-marche-09-14.json';
import ekimae14 from './ekimae-09-14.json';
import ekimae15 from  './ekimae-09-15.json';
import ryokudo14 from './ryokudo-marche-09-14.json';
import ryokudo15 from  './ryokudo-marche-09-15.json';
import tokiwa14 from  './tokiwa-marche-09-14.json';
import tokiwa15 from  './tokiwa-marche-09-15.json';
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

var data = mergeDataAll(ekimae14, ekimae15, eki14, eki15, ryokudo14, ryokudo15, tokiwa14, tokiwa15);
var EventCollection = Backbone.Collection.extend({});
var coll = new EventCollection(data);

console.dir(data);
coll.on('sort', function(data) {
  console.log('sort');
  console.dir(data);
});

