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
        name: "AnswerForm",
        path: "/answer",
        component: () => import("../pages/Answers/AnswerForm.vue")
    },
    {
        name: "QuestionForm",
        path: "/question",
        component:() => import("../pages/Question/QuestionForm.vue"),
    },
    {
        name:'ListUsers',
        path:'/listUsers',
        component: () => import("../pages/Users/ListUsers.vue")
    },
    {
        name:'Questiondetails',
        path:'/questiondetails/:id?',
        component: () => import("../pages/Question/Questiondetails.vue")
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