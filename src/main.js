import Vue from 'vue'
import App from './App.vue'

import './plugins/element.js'
import router from "@/router"
// import './router/permission'
import axios from "axios"
Vue.prototype.$axios = axios
axios.defaults.baseURL = '/userApi'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    if (to.meta.isAuth){
        if (sessionStorage.getItem('status') !== '200'){
            next( '/login')
        }else {
            next()
        }
    }else {
        next()
    }
})

import ChartsBlock from '@/components/ChartsBlock.vue'
Vue.use(ChartsBlock)

new Vue({
    axios,
    router,
    render: h => h(App),
}).$mount('#app')
