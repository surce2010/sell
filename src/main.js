import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import goods from 'components/goods/';
import ratings from 'components/ratings/';
import seller from 'components/seller/';

Vue.use(VueRouter);

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

new Vue({
    router,
    template: '<App/>',
    components: {App}
}).$mount('#app');
