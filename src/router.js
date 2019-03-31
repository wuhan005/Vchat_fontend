import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const router = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/Home.vue')
        },

        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/Login.vue')
        },

    ]
})

router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('token')

    if (!token || token == null) {
        // Not login
        if(to.name !== 'login'){
            next({
                name: 'login',
                query: {
                    'redirectTo': to.path,
                    'error' : 1
                }
            })
        }
        next()
    }else{
        // Is login
        if(to.name === 'login'){
            next({
                name: 'home'
            })
        }
        next()
    }

})

export default router