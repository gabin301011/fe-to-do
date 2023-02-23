import Vue from 'vue';
import Button from 'primevue/button';
import TabMenu from 'primevue/tabmenu';
import PrimeVue from 'primevue/config';
import Sidebar from 'primevue/sidebar';
import PanelMenu from 'primevue/panelmenu';
import Card from 'primevue/card';
import Badge from 'primevue/badge';
import SpeedDial from 'primevue/speeddial';
import SplitButton from 'primevue/splitbutton';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Editor from 'primevue/editor';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';
import RadioButton from 'primevue/radiobutton';
import ToastService from 'primevue/toastservice';
import Ripple from 'primevue/ripple';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'primevue/resources/themes/md-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(PrimeVue, { ripple: true });
Vue.directive('ripple', Ripple);
Vue.component('Badge', Badge);
Vue.component('Button', Button);
Vue.component('TabMenu', TabMenu);
Vue.component('Sidebar', Sidebar);
Vue.component('PanelMenu', PanelMenu);
Vue.component('Card', Card);
Vue.component('SpeedDial', SpeedDial);
Vue.component('SplitButton', SplitButton);
Vue.component('Dialog', Dialog);
Vue.component('InputText', InputText);
Vue.component('Editor', Editor);
Vue.component('Textarea', Textarea);
Vue.component('RadioButton', RadioButton);
Vue.component('Toast', Toast);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(ToastService);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
