import VueRouter from 'vue-router';
import Vue from "vue";
import share from "../components/pagecomponents/share.vue"
import create from '../components/pagecomponents/create.vue'
import result from '../components/pagecomponents/result.vue'
import login from '../components/pagecomponents/login.vue'
import home from '../components/pagecomponents/home.vue'
import signin from '../components/pagecomponents/signin.vue'
import signup from '../components/pagecomponents/signup.vue'
Vue.use(VueRouter)
const router = new VueRouter({
routes:[{path:'/',component:signin}, 
{path:'/signin',component:signin}, 
{path:'/signup',component:signup}, 
   {path:'/home',component:home}, 
   {path:'/login',component:login}, 
   {path:'/create',component:create},
   {path:'/share',component:share}, 

{path:'/result',component:result},

]



})
export default router