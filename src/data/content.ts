import type {
    BlogPost,
    FaqItem,
    PricingTier,
    ServiceItem,
    StatItem,
    Testimonial,
    Transformation,
    TrustBadge,
} from '../types/models'

export const siteName = 'Dietrix Nutrition'

export const nutritionistProfile = {
    name: 'Dn. Rimsha Naseer',
    role: 'Certified Clinical Nutritionist',
    mission:
        'To make evidence-based nutrition simple, sustainable, and personalized for every lifestyle across the globe.',
    story:
        'After helping family members reverse lifestyle disorders through structured food therapy, I turned my clinical background into a remote-first nutrition practice. Today, I coach clients in 14+ countries with plans built for real work schedules, travel, and medical needs.',
    philosophy:
        'No crash diets. No guesswork. Every protocol combines clinical insight, habit psychology, and practical meals your routine can actually sustain.',
    experience: '9+ years',
}

export const certifications: string[] = [
    'M.Sc. Clinical Nutrition',
    'Certified Diabetes Educator',
    'PCOS & Hormonal Health Specialist',
    'Sports Nutrition Foundation Credential',
]

export const trustBadges: TrustBadge[] = [
    { id: 'tb1', label: 'Clinical & Certified', subtitle: 'Globally recognized credentials' },
    { id: 'tb2', label: '1,800+ Clients Coached', subtitle: 'Across 14 countries' },
    { id: 'tb3', label: 'Evidence-Based Plans', subtitle: 'Nutrition science first' },
    { id: 'tb4', label: 'Remote Friendly', subtitle: '100% online consultation model' },
]

export const stats: StatItem[] = [
    { id: 'st1', label: 'Average Fat Loss in 12 Weeks', value: '6.8 kg' },
    { id: 'st2', label: 'Client Retention Rate', value: '89%' },
    { id: 'st3', label: 'Improved Blood Markers', value: '92%' },
]

export const services: ServiceItem[] = [
    {
        id: 'srv1',
        title: 'Weight Loss Accelerator',
        summary: 'Structured fat-loss roadmap for busy professionals with weekly accountability.',
        features: ['Metabolic assessment', 'Weekly progress review', 'Travel-friendly meal swaps'],
        priceFrom: '$149',
        ctaText: 'Start Weight Loss Plan',
    },
    {
        id: 'srv2',
        title: 'Medical Nutrition Therapy',
        summary: 'Condition-specific planning for PCOS, diabetes, thyroid, gut and inflammatory issues.',
        features: ['Clinical symptom tracker', 'Lab-based adjustments', 'Medication-food timing support'],
        priceFrom: '$189',
        ctaText: 'Get Clinical Guidance',
    },
    {
        id: 'srv3',
        title: 'Custom Diet Blueprint',
        summary: 'Personalized plans aligned with your culture, schedule, and food preferences.',
        features: ['Macro-personalized menu', 'Recipe packs', 'Habit reset framework'],
        priceFrom: '$119',
        ctaText: 'Build My Plan',
    },
]

export const pricingTiers: PricingTier[] = [
    {
        id: 'pr1',
        name: 'Starter Reset',
        price: '$99',
        billing: 'one-time',
        description: 'Ideal for first-time clients needing a clear action plan.',
        features: ['1 consultation (45 min)', '14-day meal structure', 'Email support for 7 days'],
        highlighted: false,
        scarcity: 'Only 12 slots this month',
        ctaText: 'Book Starter Reset',
    },
    {
        id: 'pr2',
        name: 'Transformation Plus',
        price: '$249',
        billing: 'monthly',
        description: 'Most popular package for sustainable fat loss and behavior change.',
        features: ['4 consultations per month', 'Weekly plan revisions', 'WhatsApp accountability'],
        highlighted: true,
        scarcity: 'Limited to 20 active clients',
        ctaText: 'Choose Transformation Plus',
    },
    {
        id: 'pr3',
        name: 'Clinical Care Pro',
        price: '$359',
        billing: 'monthly',
        description: 'For medical conditions requiring close monitoring and nutrition therapy.',
        features: ['Bi-weekly deep reviews', 'Lab report interpretation', 'Priority messaging support'],
        highlighted: false,
        scarcity: 'High-touch care, limited onboarding',
        ctaText: 'Apply for Clinical Care',
    },
]

export const transformations: Transformation[] = [
    {
        id: 'tr1',
        name: 'Nora, 34',
        timeline: '14 weeks',
        focus: 'Postpartum fat loss',
        beforeMetric: 'Body Fat: 38%',
        afterMetric: 'Body Fat: 29%',
        image:
            'https://images.unsplash.com/photo-1594824475317-a916f3d3f54a?auto=format&fit=crop&w=900&q=80',
    },
    {
        id: 'tr2',
        name: 'Ethan, 41',
        timeline: '16 weeks',
        focus: 'Type 2 diabetes management',
        beforeMetric: 'HbA1c: 8.2',
        afterMetric: 'HbA1c: 6.4',
        image:
            'https://images.unsplash.com/photo-1541534401786-2077eed87a72?auto=format&fit=crop&w=900&q=80',
    },
    {
        id: 'tr3',
        name: 'Mina, 29',
        timeline: '12 weeks',
        focus: 'PCOS symptom relief',
        beforeMetric: 'Cycle Irregularity: high',
        afterMetric: 'Cycle Regularity: stable',
        image:
            'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=80',
    },
]

export const testimonials: Testimonial[] = [
    {
        id: 'ts1',
        name: 'Hannah K.',
        location: 'Toronto, Canada',
        rating: 5,
        goal: 'Lose 10 kg after desk-job burnout',
        result: 'Lost 11.2 kg in 5 months and improved energy',
        quote:
            'I finally stopped dieting in cycles. The plan felt realistic, and weekly check-ins kept me consistent.',
        beforeLabel: 'Before: constant cravings',
        afterLabel: 'After: stable appetite + confidence',
        image:
            'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 'ts2',
        name: 'Karim D.',
        location: 'Dubai, UAE',
        rating: 5,
        goal: 'Control blood sugar naturally',
        result: 'Reduced fasting glucose by 24%',
        quote:
            'Clear food timing and smart carb strategy changed my numbers without feeling deprived.',
        beforeLabel: 'Before: glucose spikes',
        afterLabel: 'After: smoother daily readings',
        image:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 'ts3',
        name: 'Sofia R.',
        location: 'Madrid, Spain',
        rating: 5,
        goal: 'Fix gut issues and bloating',
        result: 'Bloating episodes dropped by 80%',
        quote:
            'The phased gut protocol worked better than anything I tried before. My sleep improved too.',
        beforeLabel: 'Before: daily discomfort',
        afterLabel: 'After: better digestion + sleep',
        image:
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    },
]

export const faqs: FaqItem[] = [
    {
        id: 'fq1',
        question: 'Do you provide fully online consultations?',
        answer:
            'Yes. Every session is conducted online with shared plans, progress tracking, and follow-up support.',
    },
    {
        id: 'fq2',
        question: 'Can you help with PCOS, diabetes, or thyroid issues?',
        answer:
            'Absolutely. Clinical nutrition therapy is tailored to your condition, medication schedule, and biomarkers.',
    },
    {
        id: 'fq3',
        question: 'How soon can I start?',
        answer:
            'Most clients begin within 3 to 5 days. Priority onboarding is available based on active slot capacity.',
    },
]

export const blogPosts: BlogPost[] = [
    {
        slug: 'best-high-protein-breakfast-for-fat-loss',
        title: 'Best High-Protein Breakfast Ideas for Sustainable Fat Loss',
        seoTitle: 'High-Protein Breakfast for Weight Loss | Dietrix Nutrition',
        seoDescription:
            'Discover practical high-protein breakfast ideas that improve satiety, reduce cravings, and support sustainable weight loss.',
        category: 'Weight Loss',
        excerpt:
            'A strategic breakfast can reduce evening cravings and improve total daily calorie control. Here is how to design one.',
        publishedAt: '2026-03-11',
        readTime: '7 min read',
        heroImage:
            'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
        sections: [
            {
                heading: 'Why Protein in the Morning Matters',
                paragraphs: [
                    'Morning protein intake increases satiety hormones and helps reduce snacking later in the day. For professionals with long work hours, this is one of the easiest behavior upgrades.',
                    'Aim for 25 to 35 grams of protein in your first meal. This can come from eggs, Greek yogurt, tofu, cottage cheese, or quality protein blends paired with fiber-rich foods.',
                ],
            },
            {
                heading: 'Build a Balanced Plate',
                subheading: 'Use the 3-part formula',
                paragraphs: [
                    'Combine lean protein, slow carbohydrates, and healthy fat. Example: spinach omelet + seeded toast + avocado slices.',
                    'Keep preparation simple. Repetition beats complexity when your goal is consistency over the next 12 weeks.',
                ],
            },
            {
                heading: 'Common Mistakes to Avoid',
                paragraphs: [
                    'Avoid ultra-processed breakfast bars marketed as healthy. Most are low in protein and high in sugar alcohols that can trigger hunger rebounds.',
                    'If your appetite is low in the morning, start with a lighter protein smoothie and scale up over 1 to 2 weeks.',
                ],
            },
        ],
        internalLinks: [
            { label: 'Explore our weight loss services', to: '/services' },
            { label: 'Book a 1-on-1 consultation', to: '/booking' },
        ],
    },
    {
        slug: 'pcos-diet-plan-basics-that-actually-work',
        title: 'PCOS Diet Plan Basics That Actually Work for Hormonal Balance',
        seoTitle: 'PCOS Diet Plan Online | Nutrition Coaching',
        seoDescription:
            'Learn the core nutrition principles for PCOS, including meal timing, insulin-friendly food choices, and practical habit strategies.',
        category: 'Health Conditions',
        excerpt:
            'PCOS nutrition is not about extreme restriction. It is about insulin-aware structure, anti-inflammatory foods, and stress management.',
        publishedAt: '2026-02-25',
        readTime: '9 min read',
        heroImage:
            'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80',
        sections: [
            {
                heading: 'Start With Insulin Stability',
                paragraphs: [
                    'Many PCOS symptoms are intensified by insulin resistance. Build meals that combine protein, fiber, and controlled carbohydrate portions.',
                    'Spacing meals 3 to 4 hours apart helps avoid repetitive grazing and supports a clearer hunger rhythm.',
                ],
            },
            {
                heading: 'Nutrients That Support Hormonal Health',
                subheading: 'Focus on quality first',
                paragraphs: [
                    'Magnesium-rich foods, omega-3 sources, and zinc-containing meals can support hormonal pathways and inflammation control.',
                    'Consistency for at least 8 to 12 weeks is essential before evaluating progress.',
                ],
            },
            {
                heading: 'Lifestyle Multipliers',
                paragraphs: [
                    'Sleep regularity and strength training are major multipliers for PCOS outcomes. Nutrition alone is powerful, but paired interventions perform better.',
                    'Track cycle length, energy, and cravings weekly to observe meaningful trend changes.',
                ],
            },
        ],
        internalLinks: [
            { label: 'See our medical nutrition therapy program', to: '/services' },
            { label: 'Speak with our nutritionist', to: '/contact' },
        ],
    },
    {
        slug: 'simple-weekly-diet-planning-for-busy-professionals',
        title: 'Simple Weekly Diet Planning Framework for Busy Professionals',
        seoTitle: 'Weekly Diet Planning for Busy Professionals',
        seoDescription:
            'A realistic weekly meal planning system for professionals who want healthy eating without spending hours in the kitchen.',
        category: 'Diet Plans',
        excerpt:
            'This 60-minute weekly planning method reduces food decisions and keeps you aligned with your health goals.',
        publishedAt: '2026-01-30',
        readTime: '6 min read',
        heroImage:
            'https://images.unsplash.com/photo-1467453678174-768ec283a940?auto=format&fit=crop&w=1200&q=80',
        sections: [
            {
                heading: 'The 60-Minute Planning Sprint',
                paragraphs: [
                    'Use one session weekly to define your protein anchors, grocery list, and fallback meals for high-stress days.',
                    'When time is limited, a good-enough plan outperforms a perfect plan that never gets implemented.',
                ],
            },
            {
                heading: 'Create Decision-Light Meals',
                subheading: 'Reduce friction during weekdays',
                paragraphs: [
                    'Choose two breakfast options, two lunch options, and three dinner templates. Rotate rather than reinvent.',
                    'Batch prep one protein and one fiber-rich carb source to simplify execution.',
                ],
            },
            {
                heading: 'Build Your Emergency Nutrition Kit',
                paragraphs: [
                    'Keep quick options at work and while traveling: nuts, protein sachets, fruit, and low-sugar yogurt.',
                    'Your environment should support your goals even on chaotic days.',
                ],
            },
        ],
        internalLinks: [
            { label: 'View custom diet blueprint service', to: '/services' },
            { label: 'Reserve a planning consultation', to: '/booking' },
        ],
    },
]
