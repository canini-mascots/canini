
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        name: '',
        path: '',
        component: () => import('pages/Index.vue')
      }, {
        name: 'home',
        path: '/home',
        component: () => import('pages/Index.vue')
      }, {
        name: 'catalog',
        path: '/catalog/:type?',
        component: () => import('pages/Catalog.vue')
      }, {
        name: 'orders',
        path: '/orders',
        component: () => import('pages/Orders.vue')
      }, {
        name: 'conditions',
        path: '/conditions',
        component: () => import('pages/Conditions.vue')
      }, {
        name: 'about',
        path: '/about',
        component: () => import('pages/About.vue')
      }, {
        name: 'register',
        path: '/register',
        component: () => import('pages/Register.vue')
      }
    ]
  }, {
    name: 'login',
    path: '/login',
    component: () => import('layouts/Login.vue')
  }, {
    name: 'rememberPassword',
    path: '/remember-password',
    component: () => import('layouts/RememberPassword.vue')
  }, {
    name: 'setPassword',
    path: '/set-password',
    component: () => import('layouts/SetPassword.vue')
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
