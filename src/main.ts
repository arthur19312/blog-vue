import { createApp } from 'vue'
import App from './App.vue'
import Router from './router'

import Popper from "./components/navigation/popper.vue";
import Navigation from "./pages/navigation/index.vue";

const app = createApp(App)

app.use(Router)

app.component('Popper',Popper)
app.component('Navigation',Navigation)

app.mount('#app')
