import { createRouter, createWebHistory } from 'vue-router'
import { pageSeo } from '../data/pageSeo'
import { useSeo } from '../composables/useSeo'

const routes = [
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
            title: 'Nutrition Blog Article | Dietrix Nutrition',
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
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('../views/NotFoundView.vue'),
        meta: pageSeo.notFound,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to) {
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth',
            }
        }

        return {
            top: 0,
            behavior: 'smooth',
        }
    },
})

router.afterEach((to) => {
    if (typeof document === 'undefined') {
        return
    }

    useSeo({
        title: typeof to.meta.title === 'string' ? to.meta.title : pageSeo.home.title,
        description: typeof to.meta.description === 'string' ? to.meta.description : pageSeo.home.description,
        path: typeof to.meta.path === 'string' ? to.meta.path : to.path,
        keywords: Array.isArray(to.meta.keywords) ? (to.meta.keywords as string[]) : [],
        type: typeof to.meta.type === 'string' ? (to.meta.type as 'website' | 'article' | 'profile') : 'website',
        robots: typeof to.meta.robots === 'string' ? to.meta.robots : undefined,
    })
})

export default router
