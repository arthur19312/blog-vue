import { createRouter, createWebHashHistory } from "vue-router";

const lead = () => import('@/pages/lead/index.vue');
const diary = () => import('@/pages/diary/index.vue');

export const routes = [
	{
		path: "/lead",
		component: lead,
		alias:['/','/index','/home']
	},
  {
		path: "/diary",
		component: diary
	},
	
]

const Router = createRouter({
	history: createWebHashHistory(),
	routes
})

export default Router