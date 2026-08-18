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

export const siteName = 'Dietrix Fit'

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
        summary: 'Structured fat-loss roadmap for busy professionals with weekly accountability, appetite control, and flexible meals that survive real life.',
        features: [
            'Metabolic and routine assessment',
            'Protein, fiber and portion targets',
            'Weekly progress and plateau review',
            'Travel-friendly meal swaps',
            'Craving and weekend strategy',
        ],
        priceFrom: '$149',
        ctaText: 'Start Weight Loss Plan',
    },
    {
        id: 'srv2',
        title: 'Medical Nutrition Therapy',
        summary: 'Condition-specific planning for PCOS, diabetes, thyroid, gut and inflammatory concerns with symptom-aware food structure.',
        features: [
            'Clinical symptom tracker',
            'Lab-aware nutrition adjustments',
            'Medication-food timing support',
            'Insulin and inflammation strategy',
            'Doctor-friendly progress notes',
        ],
        priceFrom: '$189',
        ctaText: 'Get Clinical Guidance',
    },
    {
        id: 'srv3',
        title: 'Custom Diet Blueprint',
        summary: 'Personalized meal architecture aligned with your culture, schedule, budget, food preferences, family meals and cooking energy.',
        features: [
            'Macro-personalized menu',
            'Grocery and recipe packs',
            'Habit reset framework',
            'Dining-out decision guide',
            'Family meal adaptation',
        ],
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
        description: 'Ideal for first-time clients needing a clear action plan before committing to coaching.',
        features: [
            '1 consultation (45 min)',
            '14-day meal structure',
            'Goal and barrier audit',
            'Email support for 7 days',
            'Simple grocery starter list',
        ],
        highlighted: false,
        scarcity: 'Only 12 slots this month',
        ctaText: 'Book Starter Reset',
    },
    {
        id: 'pr2',
        name: 'Transformation Plus',
        price: '$249',
        billing: 'monthly',
        description: 'Most popular package for sustainable fat loss, habit coaching and measurable routine change.',
        features: [
            '4 consultations per month',
            'Weekly plan revisions',
            'WhatsApp accountability',
            'Progress dashboard review',
            'Plateau and craving fixes',
        ],
        highlighted: true,
        scarcity: 'Limited to 20 active clients',
        ctaText: 'Choose Transformation Plus',
    },
    {
        id: 'pr3',
        name: 'Clinical Care Pro',
        price: '$359',
        billing: 'monthly',
        description: 'For medical conditions requiring close monitoring, nutrition therapy and higher-touch guidance.',
        features: [
            'Bi-weekly deep reviews',
            'Lab report interpretation',
            'Priority messaging support',
            'Symptom and medication timing log',
            'Clinical nutrition progress summary',
        ],
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
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80',
    },
    {
        id: 'tr2',
        name: 'Ethan, 41',
        timeline: '16 weeks',
        focus: 'Type 2 diabetes management',
        beforeMetric: 'HbA1c: 8.2',
        afterMetric: 'HbA1c: 6.4',
        image:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80',
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
    {
        id: 'ts4',
        name: 'Ayesha M.',
        location: 'Lahore, Pakistan',
        rating: 5,
        goal: 'Manage PCOS cravings with family meals',
        result: 'Cycle tracking improved and cravings reduced',
        quote:
            'I did not need a separate diet from my family. The swaps worked with our usual food and made consistency possible.',
        beforeLabel: 'Before: intense evening cravings',
        afterLabel: 'After: calmer appetite rhythm',
        image:
            'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 'ts5',
        name: 'Emily W.',
        location: 'London, UK',
        rating: 5,
        goal: 'Rebuild energy after stress weight gain',
        result: 'Lost 7.4 kg and felt steady through workdays',
        quote:
            'The best part was how normal it felt. I could eat out, work late, and still know what to do the next day.',
        beforeLabel: 'Before: skipped meals + fatigue',
        afterLabel: 'After: steady meals + energy',
        image:
            'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 'ts6',
        name: 'Omar S.',
        location: 'Doha, Qatar',
        rating: 5,
        goal: 'Improve cholesterol and waist measurement',
        result: 'Waist down 9 cm with better lipid habits',
        quote:
            'I understood my portions for the first time. The plan was practical enough for business lunches and travel weeks.',
        beforeLabel: 'Before: random portions',
        afterLabel: 'After: controlled plates + routine',
        image:
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
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
    {
        id: 'fq4',
        question: 'How much does online nutrition coaching cost?',
        answer:
            'Plans start from $119, depending on your goals and the length of support you need. Every plan includes a personalized nutrition plan and ongoing check-ins.',
    },
    {
        id: 'fq5',
        question: 'What happens after I book a consultation?',
        answer:
            'You share your health background and goals, then receive a personalized nutrition blueprint built around your body, routine, and preferences, followed by weekly check-ins to track progress.',
    },
    {
        id: 'fq6',
        question: 'Do I need to visit in person?',
        answer:
            'No. Dietrix Fit is a 100% remote practice — consultations, plans, and check-ins all happen online, so you can work with a certified nutritionist from anywhere in the world.',
    },
    {
        id: 'fq7',
        question: 'How does ongoing support work after I get my plan?',
        answer:
            'You get weekly check-ins and plan adjustments based on your progress, with continuous support until you hit your target.',
    },
    {
        id: 'fq8',
        question: 'Can I book a consultation from outside Pakistan?',
        answer:
            'Yes. Dietrix Fit coaches clients across 14+ countries, including the USA, UK, Canada, Germany, France, Saudi Arabia, the UAE, and Australia, entirely online.',
    },
]

export const blogPosts: BlogPost[] = [
    {
        slug: 'best-high-protein-breakfast-for-fat-loss',
        title: 'Best High-Protein Breakfast Ideas for Sustainable Fat Loss',
        seoTitle: 'High-Protein Breakfast for Weight Loss | Dietrix Fit',
        seoDescription:
            'Discover high-protein breakfast ideas that improve fullness, reduce cravings, and support sustainable weight loss without crash dieting or meal stress.',
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
            {
                heading: 'High-Protein Breakfast Templates',
                subheading: 'Use repeatable meals instead of daily guesswork',
                paragraphs: [
                    'A strong breakfast template includes one protein anchor, one fiber source, one colorful plant food, and one satisfaction element such as avocado, olive oil, nuts, or seeds.',
                    'Examples include Greek yogurt with berries and chia, eggs with vegetables and seeded toast, tofu scramble with beans, or a protein smoothie paired with fruit and nuts.',
                ],
            },
            {
                heading: 'How to Adjust for Fat Loss',
                paragraphs: [
                    'For fat loss, keep the protein stable and adjust energy through portions of fats and carbohydrates. This preserves fullness while giving the body a controlled calorie signal.',
                    'Track afternoon hunger, evening cravings, and workout energy for two weeks. These signals often show whether breakfast needs more fiber, more protein, or a lighter portion.',
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
            'Learn PCOS diet plan basics with meal timing, insulin-friendly foods, protein, fiber, and habit strategies for hormonal balance and cravings naturally.',
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
            {
                heading: 'Build an Insulin-Friendly Plate',
                subheading: 'Make every meal easier to repeat',
                paragraphs: [
                    'Start with protein, add high-fiber vegetables, choose a controlled portion of slow carbohydrate, then include a small amount of healthy fat for satisfaction.',
                    'This structure helps reduce glucose swings and makes meals easier to adapt across Pakistani, Middle Eastern, European, or North American food routines.',
                ],
            },
            {
                heading: 'What to Track for Better Decisions',
                paragraphs: [
                    'PCOS progress is not measured by weight alone. Track cravings, energy dips, cycle length, acne changes, sleep quality, waist measurement, and lab markers when available.',
                    'A weekly review makes the plan feel less emotional. Instead of guessing whether the diet is working, you can adjust meals based on real patterns.',
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
            'Use a realistic weekly diet planning system for busy professionals who want healthy eating without spending hours in the kitchen every week at home.',
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
            {
                heading: 'Design a Flexible Grocery System',
                subheading: 'Shop by meal roles, not random recipes',
                paragraphs: [
                    'Choose two proteins, two fiber-rich carbohydrates, three vegetables, two fruits, and two flavor builders each week. This keeps variety high without making planning exhausting.',
                    'When groceries have clear roles, you can build plates quickly even when the exact recipe changes.',
                ],
            },
            {
                heading: 'Plan for Weekends Before They Happen',
                paragraphs: [
                    'Most busy professionals do well Monday to Thursday and lose structure on weekends. Decide your restaurant strategy, hydration target, and protein anchors before Friday arrives.',
                    'The goal is not to avoid social meals. The goal is to keep enough rhythm that one relaxed meal does not become three chaotic days.',
                ],
            },
        ],
        internalLinks: [
            { label: 'View custom diet blueprint service', to: '/services' },
            { label: 'Reserve a planning consultation', to: '/booking' },
        ],
    },
    {
        slug: 'diabetes-friendly-plate-method-for-busy-families',
        title: 'Diabetes-Friendly Plate Method for Busy Families',
        seoTitle: 'Diabetes-Friendly Plate Method | Online Nutritionist',
        seoDescription:
            'Learn a diabetes-friendly plate method for family meals, blood sugar stability, portion control, and easier weekly nutrition decisions at home safely.',
        category: 'Health Conditions',
        excerpt:
            'Blood sugar support becomes easier when meals follow a repeatable plate structure instead of strict food fear.',
        publishedAt: '2026-03-28',
        readTime: '8 min read',
        heroImage:
            'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80',
        sections: [
            {
                heading: 'Start With Meal Architecture',
                paragraphs: [
                    'A diabetes-friendly plate usually starts with non-starchy vegetables, adds lean protein, includes a measured slow carbohydrate, and finishes with a healthy fat or flavor element.',
                    'This structure lowers decision fatigue because the food can change while the plate logic stays the same.',
                ],
            },
            {
                heading: 'Choose Carbohydrates With Context',
                subheading: 'Portion and pairing matter',
                paragraphs: [
                    'Rice, roti, potatoes, oats, beans, and fruit can fit many diabetes plans when portions are intentional and paired with protein and fiber.',
                    'The question is not only what carbohydrate you eat, but how much, how often, and what surrounds it on the plate.',
                ],
            },
            {
                heading: 'Use Family Meals Strategically',
                paragraphs: [
                    'Separate diet food often fails because it isolates the client. A better approach is to adjust the shared meal: add salad, increase protein, reduce refined portions, and improve timing.',
                    'When the family meal supports the plan, consistency improves without extra cooking burden.',
                ],
            },
            {
                heading: 'Track Trends, Not Single Readings',
                paragraphs: [
                    'One glucose reading is information, not a verdict. Review patterns around breakfast, late dinners, stress, sleep, and walking after meals.',
                    'These trends help a nutritionist refine meal timing and food pairings with much more confidence.',
                ],
            },
        ],
        internalLinks: [
            { label: 'Explore medical nutrition therapy', to: '/services' },
            { label: 'Book diabetes nutrition support', to: '/booking' },
        ],
    },
    {
        slug: 'gut-health-meal-rhythm-for-bloating-relief',
        title: 'Gut Health Meal Rhythm for Bloating Relief',
        seoTitle: 'Gut Health Meal Rhythm for Bloating Relief',
        seoDescription:
            'Use meal timing, fiber progression, hydration, and symptom tracking to support better digestion and reduce bloating with calm daily structure at home.',
        category: 'Diet Plans',
        excerpt:
            'Gut health plans work better when fiber, timing, hydration, stress, and symptom tracking move together.',
        publishedAt: '2026-04-09',
        readTime: '7 min read',
        heroImage:
            'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=1200&q=80',
        sections: [
            {
                heading: 'Create a Predictable Meal Rhythm',
                paragraphs: [
                    'Irregular meals can make bloating harder to interpret. A consistent meal rhythm gives the gut clearer signals and makes symptom patterns easier to track.',
                    'Start by spacing meals in a way that prevents constant grazing while still avoiding extreme hunger.',
                ],
            },
            {
                heading: 'Increase Fiber Gradually',
                subheading: 'More is not always better at first',
                paragraphs: [
                    'Fiber is helpful, but sudden increases can worsen bloating. Add legumes, vegetables, seeds, and whole grains gradually while monitoring tolerance.',
                    'Hydration matters because fiber without enough fluid can increase discomfort.',
                ],
            },
            {
                heading: 'Identify Trigger Patterns',
                paragraphs: [
                    'Track symptoms alongside meal timing, stress, sleep, caffeine, dairy, legumes, cruciferous vegetables, and eating speed.',
                    'Patterns usually become clearer after two weeks of calm observation rather than one day of strict elimination.',
                ],
            },
            {
                heading: 'Know When to Get Support',
                paragraphs: [
                    'Persistent pain, unexplained weight loss, blood in stool, or severe symptoms should be discussed with a qualified medical professional.',
                    'Nutrition coaching can support day-to-day structure, but red-flag symptoms deserve clinical review.',
                ],
            },
        ],
        internalLinks: [
            { label: 'See custom diet blueprint service', to: '/services' },
            { label: 'Ask about gut nutrition support', to: '/contact' },
        ],
    },
    {
        slug: 'ramadan-nutrition-plan-for-energy-and-fat-loss',
        title: 'Ramadan Nutrition Plan for Energy and Fat Loss',
        seoTitle: 'Ramadan Nutrition Plan for Energy and Fat Loss',
        seoDescription:
            'Build a balanced Ramadan nutrition plan for suhoor, iftar, hydration, energy, digestion, and sustainable fat-loss support without rebound cravings daily.',
        category: 'Weight Loss',
        excerpt:
            'Fasting routines can support health goals when suhoor, iftar, hydration, and protein are planned with intention.',
        publishedAt: '2026-02-08',
        readTime: '8 min read',
        heroImage:
            'https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?auto=format&fit=crop&w=1200&q=80',
        sections: [
            {
                heading: 'Build a Strong Suhoor',
                paragraphs: [
                    'Suhoor should focus on protein, slow carbohydrates, fiber, and hydration. This combination supports fullness and steadier energy through the fasting window.',
                    'Good options include eggs with roti and vegetables, Greek yogurt with oats and fruit, lentils with salad, or chicken with whole grains.',
                ],
            },
            {
                heading: 'Break the Fast Calmly',
                subheading: 'Avoid turning iftar into a rebound meal',
                paragraphs: [
                    'Start with water and a small portion, pause briefly, then build a balanced plate. This reduces overeating after long fasting hours.',
                    'Keep fried foods occasional rather than daily, especially if fat loss, digestion, or blood sugar stability is a goal.',
                ],
            },
            {
                heading: 'Hydrate Between Iftar and Sleep',
                paragraphs: [
                    'Hydration is easier when spread across the evening rather than forced all at once. Include water, soups, fruits, and mineral-rich foods.',
                    'Caffeine timing matters. Late tea or coffee can reduce sleep quality, which affects cravings and next-day energy.',
                ],
            },
            {
                heading: 'Protect Protein and Movement',
                paragraphs: [
                    'Protein often drops during Ramadan because meals become snack-heavy. Anchor both suhoor and iftar with a clear protein source.',
                    'Light walking after iftar can support digestion and glucose control without adding pressure during fasting hours.',
                ],
            },
        ],
        internalLinks: [
            { label: 'Start a weight loss coaching plan', to: '/services' },
            { label: 'Book Ramadan nutrition consultation', to: '/booking' },
        ],
    },
]
