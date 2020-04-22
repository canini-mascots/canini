const routes = [{
    path: '/',
    component: () =>
        import ('layouts/MainLayout.vue'),
    children: [{
        name: '',
        path: '',
        component: () =>
            import ('pages/Index.vue')
    }, {
        name: 'home',
        path: 'home',
        component: () =>
            import ('pages/Index.vue')
    }, {
        name: 'catalog',
        path: 'catalog/:type?',
        component: () =>
            import ('pages/Catalog.vue')
    }, {
        name: 'orders',
        path: 'orders',
        component: () =>
            import ('pages/Orders.vue')
    }, {
        name: 'conditions',
        path: 'conditions',
        component: () =>
            import ('pages/Conditions.vue')
    }, {
        name: 'about',
        path: 'about',
        component: () =>
            import ('pages/About.vue')
    }, {
        name: 'account',
        path: 'account',
        component: () =>
            import ('pages/Account.vue')
    }, {
        name: 'suscriptions',
        path: 'suscriptions',
        component: () =>
            import ('pages/Suscriptions.vue')
    }, {
        name: 'myMascots',
        path: 'my-mascots',
        component: () =>
            import ('pages/MyMascots.vue')
    }]
}, {
    path: '/login',
    component: () =>
        import ('layouts/LoginLayout.vue'),
    children: [{
        name: 'login',
        path: '',
        component: () =>
            import ('pages/Login.vue')
    }, {
        name: 'rememberPassword',
        path: 'remember-password',
        component: () =>
            import ('pages/RememberPassword.vue')
    }, {
        name: 'setPassword',
        path: '/set-password',
        component: () =>
            import ('pages/SetPassword.vue')
    }, {
        name: 'register',
        path: 'register',
        component: () =>
            import ('pages/Register.vue')
    }]
}]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
    routes.push({
        path: '*',
        component: () =>
            import ('pages/Error404.vue')
    })
}

export default routes