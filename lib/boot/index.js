'use strict';
import $ from 'jquery';
import moment from 'moment';
import template from './template.html';
import _ from 'underscore';
import collection from 'data';
import reactive from 'reactive';

var now = moment();
var data = _.sortBy(collection, function(data) {
  var datetime = data.datetime_end;
  var m;
  if (!datetime) {
    m = moment(data.datetime).add(1, 'hour');
  } else {
    m = moment(datetime);
  }
  var diff = m.diff(now);
  return diff;
})

data = _.filter(data, function(d) {
  var isLiVe = moment(d.datetime).diff(now) >= 0;
  return isLiVe;
});

console.dir(data);

var view = reactive(template, {data: data});
$('main').append(view.el);
console.dir(view.el)
