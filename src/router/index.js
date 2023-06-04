import VueRouter from 'vue-router';
import Vue from "vue";
import share from "../components/pagecomponents/share.vue"
import create from '../components/pagecomponents/create.vue'
import result from '../components/pagecomponents/result.vue'
import login from '../components/pagecomponents/login.vue'
import home from '../components/pagecomponents/home.vue'
import signin from '../components/pagecomponents/signin.vue'
import signup from '../components/pagecomponents/signup.vue'
import userdata from "../components/pagecomponents/userdata.vue"
import test from "../components/pagecomponents/test.vue"

Vue.use(VueRouter)
const router = new VueRouter({
routes:[{path:'/',component:signin}, 
{path:'/signin',component:signin, name: "signin"}, 
{path:'/userdata',component:userdata,meta: { requiresAuth: true }}, 
{path:'/test',component:test}, 
{path:'/signup',component:signup}, 
{path:'/home',component:home,meta: { requiresAuth: true }}, 
{path:'/login',component:login,meta: { requiresAuth: true }}, 
{path:'/create',component:create,meta: { requiresAuth: true }},
{path:'/share',component:share,meta: { requiresAuth: true }}, 
{path:'/result',component:result,meta: { requiresAuth: true }},

]



});

// router.beforeEach((to, from, next) => {
//     const isAuthenticated = localStorage.getItem("username");
//     if (to.matched.some(record => record.meta.requiresAuth)) {
//       if (isAuthenticated) {
//         next();
//       } else {
//         alert("请先登录")
    
//         next({ name: "signin" });
//       }
//     } else {
//       next();
//     }
//   });
export default router