import Vue from 'vue';
import VueRouter from 'vue-router';
import vueResource from 'vue-resource';

import App from './App';
import goods from 'components/goods/';
import ratings from 'components/ratings/';
import seller from 'components/seller/';

import 'common/stylus/'

Vue.use(VueRouter);
Vue.use(vueResource);

function helloWorld(args) {
  alert('helloWorld!');
}

var routes = [{
  path: '/seller',
  component: seller
}, {
  path: '/goods',
  component: goods
}, {
  path: '/ratings',
  component: ratings
}];

let router = new VueRouter({
  routes
});

var app = new Vue({
  el: '#app',
  router,
  ...App
});
