import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import {Amplify} from 'aws-amplify'
import awsExports from './aws-exports'; 
import VueApexCharts from "vue3-apexcharts";
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import VueGoodTablePlugin from 'vue-good-table-next';

// import the styles
import 'vue-good-table-next/dist/vue-good-table-next.css'

Amplify.configure(awsExports)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueApexCharts)
app.use(autoAnimatePlugin)
app.use(VueGoodTablePlugin);
app.mount('#app')
