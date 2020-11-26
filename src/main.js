import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

//importamos los componentes
import NavigationDrawer from './assets/components/NavigationDrawer';

//Creación de los componentes
Vue.component('navegacion', NavigationDrawer);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
