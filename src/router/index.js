import Vue from "vue";
import Router from "vue-router"

Vue.use(Router)

import userLogin from "@/components/userLogin";
import userRegister from "@/components/userRegister";
// import userHome from "@/components/userHome";
import userFather from "@/components/userFather";
//import ChartsBlock from "@/components/ChartsBlock";


const router = new Router({
    routes: [
        {
            path: "/",
            redirect: "/login"
        },
        {
            path: "/login",
            component: userLogin,
        },
        {
            path: "/register",
            component: userRegister
        },
        {
            path: "/user",
            component: userFather,
            children: [
                {
                    path: "/",
                    redirect: "home"
                },
                {
                    path: "admin",
                    component: () => import('@/components/adminManage')
                },
                {
                    path: "watch",
                    component: () => import('@/components/ChartsBlock')
                },
                {
                    path: "home",
                    component: () => import('@/components/userHome'),
                    meta: {
                        isAuth: true,
                        title: "主页"
                    }
                },
                {
                    path: "feedback",
                    component: () => import('@/components/userFeedback'),
                    meta: {
                        isAuth: true,
                        title: '反馈'
                    }
                },
                {
                    path: "repertory",
                    component: () => import('@/components/userRepertory'),
                    meta: {
                        isAuth: true,
                        title: '库存'
                    }
                },
                {
                    path: "workOrder",
                    component: () => import('@/components/userWorkOrder'),
                    meta: {
                        isAuth: true,
                        title: '个人中心'
                    }
                }
            ]
        }
    ],
    mode: "history",
})

export default router