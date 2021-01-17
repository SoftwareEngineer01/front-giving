import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueAxios from 'vue-axios';
import axios from 'axios';

//Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

//FontAwesome
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

//Validación formularios
import Vuelidate from 'vuelidate';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Vuelidate);
Vue.use(VueAxios, axios);

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
