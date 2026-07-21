import type { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import { pageSeo } from '../data/pageSeo'

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/HomeView.vue'),
        meta: pageSeo.home,
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue'),
        meta: pageSeo.about,
    },
    {
        path: '/services',
        name: 'services',
        component: () => import('../views/ServicesView.vue'),
        meta: pageSeo.services,
    },
    {
        path: '/booking',
        name: 'booking',
        component: () => import('../views/BookingView.vue'),
        meta: pageSeo.booking,
    },
    {
        path: '/blog',
        name: 'blog',
        component: () => import('../views/BlogView.vue'),
        meta: pageSeo.blog,
    },
    {
        path: '/blog/:slug',
        name: 'blog-article',
        component: () => import('../views/BlogArticleView.vue'),
        meta: {
            title: 'Nutrition Blog Article | Dietrix Fit',
            description: 'Practical nutrition guidance from certified professionals to support your health and wellness goals.',
        },
    },
    {
        path: '/testimonials',
        name: 'testimonials',
        component: () => import('../views/TestimonialsView.vue'),
        meta: pageSeo.testimonials,
    },
    {
        path: '/contact',
        name: 'contact',
        component: () => import('../views/ContactView.vue'),
        meta: pageSeo.contact,
    },
    {
        path: '/404',
        name: 'not-found-document',
        component: () => import('../views/NotFoundView.vue'),
        meta: pageSeo.notFound,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('../views/NotFoundView.vue'),
        meta: pageSeo.notFound,
    },
]

export const routerOptions = {
    routes,
    scrollBehavior(to: RouteLocationNormalized) {
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth' as const,
            }
        }

        return {
            top: 0,
            behavior: 'smooth' as const,
        }
    },
}
