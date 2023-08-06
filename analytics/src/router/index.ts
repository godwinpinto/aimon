import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SecuredView from '@/views/protected/SecuredView.vue'
import DashboardView from '@/views/protected/DashboardView.vue'
import TagView from '@/views/protected/TagView.vue'
import DomainView from '@/views/protected/DomainView.vue'
import UserView from '@/views/protected/UserView.vue'
import GeneratedTagsView from '@/views/protected/GeneratedTagsView.vue'
import GeneratedUrlView from '@/views/protected/GeneratedUrlView.vue'
import GeneratedAiDomainView from '@/views/protected/GeneratedAiDomainView.vue'
import AlertsView from '@/views/protected/AlertsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/secured',
      name: 'secured',
      component: SecuredView,
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: DashboardView
        }, {
          path: 'tag',
          name: 'tag',
          component: TagView
        }, {
          path: 'domain',
          name: 'domain',
          component: DomainView
        }, {
          path: 'user',
          name: 'user',
          component: UserView
        }, {
          path: 'generated-tags',
          name: 'generatedTags',
          component: GeneratedTagsView
        }, {
          path: 'generated-url',
          name: 'generatedUrl',
          component: GeneratedUrlView
        }, {
          path: 'generated-ai-domain',
          name: 'generatedAiDomain',
          component: GeneratedAiDomainView
        }, {
          path: 'alerts',
          name: 'alerts',
          component: AlertsView
        }

      ]
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
