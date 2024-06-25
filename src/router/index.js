import { createRouter,createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
const routes = [
    {
        name: "Home",
        path: "/",
        component: Home,
        //meta:{requiresAuth:true}
    },
    {
        name: "LoginForm",
        path: "/login",
        component:  () => import("../pages/LoginForm.vue")
    },
    {
        name: "RegisterForm",
        path: "/register",
        component: () => import("../pages/RegisterForm.vue")
    },
    
    {
        name: "QuestionForm",
        path: "/question",
        component:() => import("../pages/Question/QuestionForm.vue"),
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});


router.beforeEach((to, from, next) => {
    const loggedIn = localStorage.getItem('token');
    if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
      next('/login');
    } else {
      next();
    }
  });
export default router;