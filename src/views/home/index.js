export default [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ './page/home.vue'),
    meta: {
      title: '首页'
    }
  },
]