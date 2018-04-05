import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Foo = {
  template: '<div>{{title}}</div>',
  data () {
    return {title: ''}
  },
  beforeRouteEnter (to, from, next) {
    setTimeout(() => {
      next(vm => vm.setTitle(to.meta.title))
    }, 1000)
  },
  beforeRouteUpdate (to, from, next) {
    this.title = ''
    setTimeout(() => {
      next(vm => vm.setTitle(to.meta.title))
    }, 1000)
  },
  beforeRouteLeave (to, from, next) {
    this.title = ''
    next()
  },
  methods: {
    setTitle (title) {
      this.title = title
    }
  }
}

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      component: Foo,
      meta: {title: 'Home'}
    },
    {
      path: '/other',
      component: Foo,
      meta: {title: 'Other'}
    }
  ]
})

new Vue({
  router,
  template: `
    <div id="app">
      <h1>Shared Views</h1>
      <ul>
        <li><router-link to="/">/</router-link></li>
        <li><router-link to="/other">/other</router-link></li>
      </ul>
      <router-view></router-view>
    </div>
  `
}).$mount('#app')
