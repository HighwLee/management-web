// import router from "@/router/index";
//
//
// //白名单
// const whiteList = ['/userLogin']
//
// router.beforeEach((to, from, next) => {
//     if (to.meta.requireAuth) {
//         if (sessionStorage.getItem('') !== null){
//             next()
//         }else {
//             next({
//                 path: '/userLogin'
//             })
//         }
//     }else {
//         if (whiteList.indexOf(to.path) !== -1){
//             next()
//         }else {
//             if (sessionStorage.getItem('') !== null){
//                 next('/?redirect=${to.path}')
//             }else {
//                 next('/userLogin?redirect=${to.path}')
//             }
//         }
//     }
// })