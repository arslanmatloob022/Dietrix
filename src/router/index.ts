import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/HomeView.vue'),
        meta: {
            title: 'Online Nutritionist for Weight Loss and Clinical Nutrition | Dietrix Nutrition',
            description:
                'Work with a certified online nutritionist for weight loss, PCOS, diabetes, and custom diet plans. Book your consultation today.',
        },
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue'),
        meta: {
            title: 'About Dn. Rimsha Naseer | Certified Online Nutritionist',
            description:
                'Learn about Dn. Rimsha Naseer, her certifications, mission, and evidence-based approach to online nutrition coaching.',
        },
    },
    {
        path: '/services',
        name: 'services',
        component: () => import('../views/ServicesView.vue'),
        meta: {
            title: 'Nutrition Services and Pricing | Weight Loss, PCOS, Diabetes',
            description:
                'Explore personalized nutrition services including weight loss plans, medical nutrition therapy, and custom diet coaching packages.',
        },
    },
    {
        path: '/booking',
        name: 'booking',
        component: () => import('../views/BookingView.vue'),
        meta: {
            title: 'Book Nutrition Consultation Online | Dietrix Nutrition',
            description:
                'Choose your preferred appointment slot and reserve your 1-on-1 online consultation with a certified nutritionist.',
        },
    },
    {
        path: '/blog',
        name: 'blog',
        component: () => import('../views/BlogView.vue'),
        meta: {
            title: 'Nutrition Blog | Weight Loss, Diet Plans, Health Conditions',
            description:
                'Read SEO-focused nutrition articles covering fat loss, practical diet plans, PCOS, diabetes, and gut health guidance.',
        },
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
        meta: {
            title: 'Client Success Stories and Reviews | Dietrix Nutrition',
            description:
                'See real nutrition coaching testimonials, before-after progress snapshots, and verified client results from around the world.',
        },
    },
    {
        path: '/contact',
        name: 'contact',
        component: () => import('../views/ContactView.vue'),
        meta: {
            title: 'Contact Online Nutritionist | Dietrix Nutrition',
            description:
                'Reach out for online diet consultations, WhatsApp support, and personalized nutrition coaching inquiries.',
        },
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('../views/NotFoundView.vue'),
        meta: {
            title: 'Page Not Found | Dietrix Nutrition',
            description: 'The requested page could not be found. Explore services, blog content, or book a consultation.',
        },
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
    const title = typeof to.meta.title === 'string' ? to.meta.title : 'Dietrix Nutrition'
    const description =
        typeof to.meta.description === 'string'
            ? to.meta.description
            : 'Online nutrition coaching for weight loss and health conditions.'

    document.title = title

    let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
    if (!metaDescription) {
        metaDescription = document.createElement('meta')
        metaDescription.name = 'description'
        document.head.appendChild(metaDescription)
    }

    metaDescription.content = description
})

export default router
