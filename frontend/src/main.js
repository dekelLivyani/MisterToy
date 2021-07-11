import Vue from 'vue'
import app from './app.vue'
import router from './router'
import store from './store'
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import './styles/styles.scss'
import * as VueGoogleMaps from 'vue2-google-maps'

const API_KEY = 'AIzaSyDPbW1HYUq5L2LnEBY - Se - PBxNfAFtAi68';

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(require('vue-moment'));
Vue.use(VueGoogleMaps, {
    load: {
        key: API_KEY,
        libraries: 'places',
    },
})

new Vue({
    router,
    store,
    render: h => h(app)
}).$mount('#app')