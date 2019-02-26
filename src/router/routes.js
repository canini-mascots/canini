
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
        path: '/catalog/:name?',
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
