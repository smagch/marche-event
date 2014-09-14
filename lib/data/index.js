'use strict';

import _ from 'underscore';
import eki14 from './eki-marche-09-14.json';
import eki15 from './eki-marche-09-14.json';
import ekimae14 from './ekimae-09-14.json';
import ekimae15 from  './ekimae-09-15.json';
import ryokudo14 from './ryokudo-marche-09-14.json';
import ryokudo15 from  './ryokudo-marche-09-15.json';
import tokiwa14 from  './tokiwa-marche-09-14.json';
import tokiwa15 from  './tokiwa-marche-09-15.json';

function populatePlaceAndDate(data) {
  var placeName = data.name;
  var date = data.date;
  _.each(data.data, function(d) {
    d.place = placeName;
    d.date = date;
    d.datetime = date + ' ' + d.time[0];
    if (d.time[1]) {
      d.datetime_end = date + ' ' + d.time[1];
    }
  });
  return data.data;
}

function mergeDataAll() {
  var args = Array.prototype.slice.call(arguments);
  var collections = _.map(args, populatePlaceAndDate);
  return [].concat.apply([], collections)
}

var data = mergeDataAll(ekimae14, ekimae15, eki14, eki15, ryokudo14, ryokudo15, tokiwa14, tokiwa15);
export default data;
