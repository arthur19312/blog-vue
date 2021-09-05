import { createApp } from 'vue'
import App from './App.vue'
import Router from './router'

import Navigation from "./pages/navigation/index.vue";
import Content from "./pages/content/index.vue";

const app = createApp(App)

app.use(Router)

app.component('Navigation',Navigation)
app.component('Content',Content)

app.mount('#app')

export default app;
