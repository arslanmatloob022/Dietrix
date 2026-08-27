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
        slug: 'how-many-calories-in-one-roti',
        title: 'How Many Calories in One Roti — And How Many You Can Eat While Losing Fat',
        seoTitle: 'How Many Calories in One Roti? The Honest Answer',
        seoDescription:
            'One roti has 100-200 calories depending on the atta you use. Here is how to measure it accurately and fit rotis into a fat-loss plan.',
        category: 'Weight Loss',
        excerpt:
            'Four websites give four different answers. Here is the number that is actually true for your kitchen, and how many rotis fit into a fat-loss day.',
        publishedAt: '2026-08-27',
        readTime: '8 min read',
        heroImage: '/media/roti-calories.webp',
        heroImageAlt: 'Stack of plain whole wheat rotis on a tawa',
        keyTakeaways: [
            'A roti made from 40g of atta is roughly 135 calories, 5.5g protein and 5g fibre.',
            'Weigh your atta once and divide by the number of rotis it makes. That number stays true.',
            'Every teaspoon of ghee or oil adds about 45 calories, which can double a plain roti.',
            'There is no roti limit. Give roti 20-30% of your daily calories and the count follows.',
            'The oil in the salan, the sugar in the chai and missing protein stall more people than roti does.',
        ],
        sections: [
            {
                heading: 'The Quick Answer',
                paragraphs: [
                    'If you have searched this question before, you have probably seen four different answers on four different websites: 70, 104, 120, 297. All of them are quoted confidently. None of them tell you which one applies to the roti sitting on your plate.',
                    'A plain roti made from 40g of atta contains roughly 135 calories, 5.5g of protein and 5g of fibre. Scale it to the roti you actually make.',
                ],
                table: {
                    caption: 'Roti calories by the weight of atta used',
                    columns: ['Atta used per roti', 'Calories', 'Protein', 'Fibre'],
                    rows: [
                        ['30g (small, ~6 inch)', '~100 kcal', '4.1g', '3.7g'],
                        ['40g (medium, ~7 inch)', '~135 kcal', '5.5g', '4.9g'],
                        ['50g (large, ~8 inch)', '~170 kcal', '6.9g', '6.1g'],
                        ['60g (thick or tandoori-style)', '~205 kcal', '8.2g', '7.3g'],
                    ],
                    footnote:
                        'Based on USDA composition data for whole-grain wheat flour: 339 kcal, 13.7g protein and 12.2g fibre per 100g. Your atta packet may say 350-365 kcal per 100g, which is normal variation between mills and wheat varieties.',
                },
                callout:
                    'Add roughly 45 calories for every teaspoon of ghee or oil, whether it goes into the dough or onto the finished roti.',
            },
            {
                heading: 'Why Every Website Gives You a Different Number',
                paragraphs: [
                    'Because they are measuring different things and rarely say which.',
                    'Roti size also varies enormously between households. A thin phulka in one home and a thick, hand-stretched roti in another can differ by 100 calories. Neither is wrong. They are just different portions of the same food. This is why a single universal number does not exist, and why any article confidently telling you one roti equals 104 calories is quietly guessing on your behalf.',
                ],
                bullets: [
                    'Some quote raw dough weight, some quote the cooked roti. A roti loses water on the tawa, so 40g of dough does not produce a 40g roti.',
                    'Some quote per 100g of cooked roti, giving figures near 300 kcal. Accurate as a density, useless in practice, because nobody weighs a cooked roti.',
                    'Some are quoting commercial frozen chapati, which often carries added oil at roughly five times the fat of a plain home-made roti.',
                ],
            },
            {
                heading: 'The Only Accurate Method: Weigh the Atta, Not the Roti',
                subheading: 'Do this once, not every day',
                paragraphs: [
                    'Water evaporates during cooking. Calories do not. The energy in a finished roti is almost entirely the energy of the atta that went into it, plus any fat you added. That makes flour the stable thing to measure.',
                    'Now you have a number that is true in your kitchen, made by your hands, at your usual size. You never need to weigh anything again unless your roti size changes. This takes about four minutes and it is more accurate than any chart on the internet, including the one above.',
                ],
                steps: [
                    'Weigh the atta you use for your household rotis for one meal. Say 240g.',
                    'Count how many rotis it produced. Say six.',
                    'Divide: 240 divided by 6 gives 40g of atta per roti.',
                    'Multiply by 3.39, or by your packet figure per gram: 40 x 3.39 = 136 calories per roti.',
                ],
            },
            {
                heading: 'What Ghee and Oil Actually Add',
                paragraphs: [
                    'This is where roti calories quietly double, and it is almost always the part people miss. One teaspoon of ghee or oil, about 5g, is roughly 45 calories. One tablespoon, about 15g, is roughly 135.',
                    'A dry-cooked phulka made from 40g of atta is about 135 calories. The same roti with a teaspoon of ghee brushed on is about 180. With a generous tablespoon it is about 270, roughly double. Three rotis a day with a teaspoon of ghee each adds around 135 calories daily, or about 4,000 calories a month. That single habit is often the difference between slow progress and none.',
                    'This is not an argument against ghee. Fat carries flavour, improves satiety and helps with fat-soluble vitamin absorption. It is an argument for knowing what you are spending. If ghee on roti is genuinely one of the pleasures of your day, keep it and take the calories from somewhere you care about less. If you are brushing it on out of habit and would not miss it, that is the easiest 4,000 calories a month you will ever save.',
                ],
            },
            {
                heading: 'Roti, Phulka, Tandoori Roti, Naan and Paratha Compared',
                paragraphs: [
                    'Ranges are wide on purpose. A restaurant naan and a home naan are different foods. Use these to rank your options, not as precise figures.',
                    'The practical takeaway: swapping one paratha for one roti at breakfast saves roughly 150-200 calories a day without changing anything else about how you eat. Over a month that is meaningful, and it is a far easier change to sustain than cutting roti out altogether.',
                ],
                table: {
                    caption: 'Typical calories by bread type',
                    columns: ['Type', 'Typical calories', 'Why'],
                    rows: [
                        ['Phulka (dry, puffed, no fat)', '90-130', 'Thin, smaller, no added fat'],
                        ['Plain roti (home, tawa)', '120-170', 'Standard size, little or no fat'],
                        ['Roti with ghee', '165-215', 'Add ~45 kcal per teaspoon'],
                        ['Tandoori roti', '180-250', 'Larger and thicker, often part maida'],
                        ['Naan', '260-330', 'Maida, plus oil, yoghurt or milk in the dough'],
                        ['Plain paratha', '250-330', 'Layered with fat, then fried in more fat'],
                        ['Stuffed paratha (aloo)', '300-450', 'Filling plus generous cooking fat'],
                    ],
                },
                links: [
                    {
                        label: 'A higher-protein breakfast makes the paratha swap easier to hold',
                        to: '/blog/best-high-protein-breakfast-for-fat-loss',
                    },
                ],
            },
            {
                heading: 'How Many Rotis Can You Eat While Losing Fat?',
                subheading: 'More than you have been told',
                paragraphs: [
                    'There is no calorie threshold above which roti becomes fattening. Roti is not the variable. Your total daily energy is. If your overall intake is below what you burn, you will lose fat whether those calories arrive as roti, rice or oats.',
                    'So the useful question is not how many rotis are allowed, but how much of your daily energy you want to spend on roti. Roti is your main starch, so a reasonable starting point is 20-30% of your daily calories, with the rest going to protein, vegetables, dal or meat, fruit, dairy and cooking fat. Take your daily target, take 25% of it, and divide by your per-roti figure.',
                    'Split them across meals however suits you. Two at lunch and two at dinner is the most common pattern. One at breakfast, two at lunch and one at dinner works just as well.',
                    'Two important caveats. First, these are illustrative arithmetic, not a prescription. Your daily target depends on your height, weight, age, activity, medical history and medications, and it should be set with a professional rather than picked off a chart. Very low intakes are not a shortcut; they cost you muscle, energy and hair, and they are the single most reliable predictor of regaining the weight later. Second, if you are more active, or you lift weights, or you do physical work, you need more starch, not less. Cutting roti hard while training hard is how people end up exhausted and stalled at the same time.',
                ],
                table: {
                    caption: 'Roti count at 25% of daily calories, at 135 kcal per roti',
                    columns: ['Daily target', 'Calories for roti', 'Rotis per day'],
                    rows: [
                        ['1,600 kcal', '400 kcal', 'About 3'],
                        ['1,800 kcal', '450 kcal', 'About 3-4'],
                        ['2,000 kcal', '500 kcal', 'About 4'],
                        ['2,400 kcal', '600 kcal', 'About 4-5'],
                    ],
                },
                links: [
                    {
                        label: 'If you have diabetes, portion the plate before you count the rotis',
                        to: '/blog/diabetes-friendly-plate-method-for-busy-families',
                    },
                ],
            },
            {
                heading: 'Where People Actually Go Wrong (It Is Rarely the Roti)',
                paragraphs: [
                    'In practice, when someone tells me they eat only two rotis and still cannot lose weight, the roti is almost never the problem.',
                    'If you fix the oil in the salan and the sugar in the chai, you will usually find you can keep every roti you were about to give up.',
                ],
                bullets: [
                    'The salan. A curry finished with half a cup of oil can carry 400-600 calories in the oil alone. Two rotis dipped into a heavily-tempered salan can easily become a 700-calorie meal. The bread is the visible part; the oil is the expensive part.',
                    'Chai. Two cups a day with full-fat milk and two teaspoons of sugar each is roughly 250-300 calories, and most people do not count it as food at all. Four cups doubles that.',
                    'What comes after the roti. Biscuits with chai, a handful of namkeen, dessert after dinner, the leftover half-plate finished standing at the counter.',
                    'Not enough protein. A roti-and-salan meal with a small amount of meat can land under 15g of protein, which leaves you hungry two hours later. Adding dahi, an egg, extra daal or more chicken often reduces total daily intake, because you stop grazing afterwards.',
                ],
                links: [
                    {
                        label: 'Planning the week ahead is what stops the after-dinner grazing',
                        to: '/blog/simple-weekly-diet-planning-for-busy-professionals',
                    },
                ],
            },
            {
                heading: 'Is Roti Better Than Rice for Weight Loss?',
                paragraphs: [
                    'Neither food causes or prevents fat loss. Portion and preparation decide the outcome. Gram for gram of dry weight, atta and raw rice are close in calories.',
                    'In practice roti tends to be easier to portion, because a roti is a discrete unit you can count, while rice is served by the ladle and expands dramatically when cooked. A cup of cooked rice and a heaped plate of it are wildly different portions that look similar.',
                    'Roti does bring more fibre and more protein than white rice, which helps with fullness. But if you love rice, weigh it once, learn what your portion looks like in your own bowl, and eat it. A plan you resent is a plan you abandon.',
                ],
                links: [
                    {
                        label: 'The full guide to white rice, basmati and portioning',
                        to: '/blog/is-white-rice-bad-for-weight-loss',
                    },
                ],
            },
            {
                heading: 'How to Estimate Without a Kitchen Scale',
                paragraphs: [
                    'A scale is better. But if you do not have one, use size and thickness as your guide.',
                    'Better still: buy a digital kitchen scale. In Pakistan they cost around Rs 1,500-3,000, and it is the single highest-return purchase anyone tracking their food can make. You will use it for two weeks, learn what portions actually look like, and then rarely need it again.',
                ],
                bullets: [
                    'One medium roti, about the size of a standard dinner plate and thin enough to fold easily: 130-150 kcal.',
                    'A small roti, about palm-and-fingers width across and noticeably thinner: 100-120 kcal.',
                    'A large or thick roti, larger than a dinner plate or thick enough that it does not fold cleanly: 180-220 kcal.',
                ],
            },
            {
                heading: 'The Short Version',
                paragraphs: [
                    'One roti is roughly 100-200 calories depending on its size, and doubles with generous ghee. Weigh your atta once, divide by the number of rotis it makes, and you will have a number that is accurate for your kitchen forever. Then give roti 20-30% of your daily calories and stop worrying about it.',
                    'The roti was almost never the problem. The oil in the salan, the sugar in the chai and the protein you are not eating usually are.',
                ],
            },
        ],
        faqs: [
            {
                question: 'How many calories are in 2 rotis?',
                answer:
                    'About 270 calories for two medium rotis made from 40g of atta each, with no added fat. Add roughly 45 calories per teaspoon of ghee or oil used.',
            },
            {
                question: 'How many calories are in 3 rotis?',
                answer:
                    'About 405 calories for three medium plain rotis. With a teaspoon of ghee on each, closer to 540.',
            },
            {
                question: 'Can I eat roti at night while losing weight?',
                answer:
                    'Yes. Meal timing does not determine fat loss; total daily intake does. If eating roti at dinner helps you sleep well and stops you snacking later, it is helping, not hurting.',
            },
            {
                question: 'Is multigrain or bajra roti better for weight loss?',
                answer:
                    'Slightly, and mostly because of fibre rather than calories. Millet and multigrain attas are similar in energy to wheat atta but often higher in fibre, which improves fullness. The difference is real but small. Portion still matters more than flour type.',
            },
            {
                question: 'Does maida roti have more calories than atta roti?',
                answer:
                    'Calories are close. The difference is fibre and protein, both of which are markedly lower in maida. Whole wheat will keep you full longer at the same calorie cost, which is the practical advantage.',
            },
            {
                question: 'Should I stop eating roti to lose weight faster?',
                answer:
                    'No. Cutting out a staple you have eaten your whole life produces fast initial results and near-certain regain. Portioning roti works better than removing it, and it is something you can still be doing in two years.',
            },
        ],
        sources: [
            {
                label: 'USDA FoodData Central — Wheat flour, whole-grain',
                detail: 'Composition per 100g used for the calorie, protein and fibre figures.',
            },
            {
                label: 'USDA FoodData Central — Ghee, butter oil and vegetable oils',
                detail: 'Fat energy density used for the per-teaspoon figures.',
            },
            {
                label: 'Dietary Guidelines for Americans, 2020-2025',
                detail: 'Dietary fibre intake recommendations.',
            },
            {
                label: 'National Institutes of Health, Office of Dietary Supplements',
                detail: 'Whole grains and dietary fibre.',
            },
        ],
        relatedSlugs: [
            'is-white-rice-bad-for-weight-loss',
            'biryani-and-weight-loss-portion-guide',
            'best-high-protein-breakfast-for-fat-loss',
        ],
        internalLinks: [
            { label: 'See nutrition programs', to: '/services' },
            { label: 'Book a consultation', to: '/booking' },
        ],
    },
    {
        slug: 'is-white-rice-bad-for-weight-loss',
        title: 'Is White Rice Bad for Weight Loss? Basmati, Portioning and the Real Answer',
        seoTitle: 'Is White Rice Bad for Weight Loss? The Real Answer',
        seoDescription:
            'White rice does not stop fat loss. Portion size does. Here is what a real rice serving looks like, and how much you can eat while losing weight.',
        category: 'Weight Loss',
        excerpt:
            'Rice triples in weight when it cooks, which makes it the easiest food in the kitchen to over-serve. That, not the grain, is the actual problem.',
        publishedAt: '2026-08-27',
        readTime: '8 min read',
        heroImage: '/media/rice-portioning.webp',
        heroImageAlt: 'Cooked basmati rice served in a bowl beside a measuring cup',
        keyTakeaways: [
            'White rice does not prevent fat loss. Portion size does.',
            'Rice roughly triples in weight when cooked, so calories spread across three times the volume.',
            'Basmati tests lower on GI (50-58) than average white rice, and well below jasmine.',
            'Weigh your rice raw once. Most adults land at 50-75g per person.',
            'The oil in whatever goes on top usually costs more than the rice underneath.',
        ],
        sections: [
            {
                heading: 'The Quick Answer',
                paragraphs: [
                    'Almost every client who comes to me eating rice daily opens with an apology for it. Somewhere along the way, white rice became the food people feel guilty about, the thing they assume they will have to give up before anything can work. They usually do not have to.',
                    'Those first two figures describe the same food. Rice roughly triples in weight when it cooks, because it absorbs water. Water has no calories. So the calories do not change, they just spread across three times the volume, which is exactly why rice is so easy to over-serve.',
                    'If you are losing fat on your total daily intake, rice fits. If you are not, the rice is rarely the reason, but the size of the serving might be.',
                ],
                bullets: [
                    '100g of raw basmati is about 350 calories.',
                    '100g of cooked basmati is about 130 calories.',
                    'One standard cup of cooked rice, around 150g, is about 195 calories.',
                ],
                callout:
                    'White rice is not bad for weight loss. The problem with rice is almost never the grain. It is that rice is the single hardest food in a South Asian kitchen to judge by eye.',
            },
            {
                heading: 'Where the Fear of White Rice Came From',
                paragraphs: [
                    'Three ideas got blended together and turned into the belief that rice makes you fat. None of them add up to a reason to remove rice from your diet.',
                ],
                bullets: [
                    'White rice is a refined carb. True. Polishing removes the bran and germ, which takes most of the fibre with it. That is a genuine nutritional downgrade compared with brown rice. It is not the same as saying the food causes weight gain.',
                    'White rice has a high glycemic index. Partly true, and it depends heavily on the variety. A systematic review put the mean GI of white rice around 64 and brown rice around 55. But basmati specifically tests lower, around 50-58, which is low-to-moderate.',
                    'People who eat a lot of rice gain weight. Sometimes, but not because of the grain. Rice is the base of meals that also contain oil, cream, fried onions and meat cooked in ghee. When a rice meal is high in calories, it is usually the things sitting on the rice doing the work.',
                ],
            },
            {
                heading: 'Why Rice Portions Deceive You and Roti Does Not',
                paragraphs: [
                    'This is the part that actually matters, and almost nobody explains it. A roti is a unit you can count. You know if you ate two or four. The portion announces itself.',
                    'Rice is served by volume, from a pot, into a bowl of unknown size. Nothing about the act of serving tells you how much you took. And because cooked rice is roughly three-quarters water by weight, a serving that looks modest can be much larger than it appears.',
                    'The gap between a comfortable bowl and a generous plate is around 260 calories, roughly two rotis worth, and most people would not describe those two servings very differently if you asked them. This is the whole problem. Not the rice. The invisibility of the portion.',
                ],
                table: {
                    caption: 'What ordinary rice servings actually cost',
                    columns: ['Cooked rice', 'Looks like', 'Calories'],
                    rows: [
                        ['100g', 'Small side portion', '~130 kcal'],
                        ['150g', 'One standard cup', '~195 kcal'],
                        ['200g', 'A comfortable bowl', '~260 kcal'],
                        ['300g', 'A full plate', '~390 kcal'],
                        ['400g', 'A generous plate at a family dinner', '~520 kcal'],
                    ],
                },
                links: [
                    {
                        label: 'Roti is easier to count, and here is what one actually costs',
                        to: '/blog/how-many-calories-in-one-roti',
                    },
                ],
            },
            {
                heading: 'The Numbers, Raw and Cooked',
                paragraphs: [
                    'Use whichever column matches how you measure. Protein sits near 2.5-3g per 100g cooked, which is low. Rice is an energy source, not a protein source, and this is why what you serve with it matters so much.',
                    'The practical shortcut: weigh your rice raw, once. Most adults find that 50-75g of raw rice per person cooks up to a portion that satisfies them, and that lands between 175 and 260 calories. Measure it twice and you will recognise it by eye forever.',
                ],
                table: {
                    caption: 'Rice varieties, raw and cooked',
                    columns: ['Variety', 'Raw', 'Cooked'],
                    rows: [
                        ['Basmati (white)', '~350 kcal/100g', '~130 kcal/100g'],
                        ['Brown basmati', '~340 kcal/100g', '~123 kcal/100g'],
                        ['Sella / parboiled', '~350 kcal/100g', '~130 kcal/100g'],
                    ],
                },
            },
            {
                heading: 'Basmati, Sella, Brown, Jasmine: Does the Type Matter?',
                paragraphs: [
                    'A little. Less than the internet suggests.',
                    'The honest summary: switching from jasmine to basmati is a real improvement. Switching from basmati to brown is a small one. Neither matters as much as how much lands on your plate.',
                ],
                bullets: [
                    'Basmati is your best white-rice option. GI around 50-58, long grain, does not clump. If you eat rice daily and you are watching blood sugar, this is the one.',
                    'Brown basmati adds fibre and lowers GI further. Genuinely better nutritionally, but it takes longer to cook and many families will not eat it. A half-and-half mix is an easier sell than a full switch.',
                    'Sella, or parboiled, holds its shape well, which is why it is the standard for biryani. Nutritionally close to white basmati.',
                    'Jasmine and short-grain sticky rice test highest on GI, roughly 68-80. If you have diabetes or PCOS, these are the ones to limit.',
                ],
            },
            {
                heading: 'Does Glycemic Index Actually Matter for Weight Loss?',
                paragraphs: [
                    'Less than most articles imply, and this distinction is worth getting right, because the two situations are different.',
                    'For fat loss, total energy intake is what drives the outcome. A lower-GI meal can help indirectly, by keeping you full and steadier so you snack less, but GI itself is not the mechanism. You will not lose fat by eating low-GI foods in a surplus.',
                    'For blood sugar management, GI matters considerably more. If you have diabetes, prediabetes or PCOS with insulin resistance, the rice variety, the portion and what you eat alongside it all have a direct, measurable effect on your glucose response.',
                    'There is also a simpler lever than switching rice varieties: what you put with it. Pairing rice with protein and fibre, such as dal, chana, chicken, fish, an egg, raita or a salad, meaningfully blunts the glucose rise compared with eating rice alone. That is easier to sustain than changing the rice your whole family eats.',
                ],
                links: [
                    {
                        label: 'The plate method makes that pairing automatic',
                        to: '/blog/diabetes-friendly-plate-method-for-busy-families',
                    },
                ],
            },
            {
                heading: 'The Cooling and Resistant Starch Question',
                paragraphs: [
                    'You have probably seen the claim that cooking rice, refrigerating it overnight and reheating it cuts the calories substantially. The mechanism is real. Cooling cooked starch converts some of it into resistant starch, which behaves more like fibre and is less completely digested. The effect on glucose response is measurable.',
                    'But the calorie reduction is modest, not dramatic. Reported reductions vary considerably between studies and cooking methods, and none of them turn a 400-calorie plate into a 250-calorie one. Treat it as a small bonus if you already eat leftover rice, not as a strategy.',
                    'There is a genuine practical benefit though: cooked-and-cooled rice makes meal prep easier, and reheated leftover rice is far better than ordering food because nothing is ready. That is worth more than the resistant starch.',
                ],
                callout:
                    'One safety note: cooked rice left at room temperature for hours can grow Bacillus cereus. Refrigerate within an hour of cooking and reheat thoroughly.',
            },
            {
                heading: 'How Much Rice Can You Eat While Losing Fat?',
                paragraphs: [
                    'The same arithmetic as any other staple. Rice is not special. Give your main starch roughly 20-30% of your daily calories, then divide by the calorie figure for your portion.',
                    'Most people find it easiest to spend that on one rice meal rather than spreading it thin across two.',
                    'Two caveats worth stating plainly. These are illustrative sums, not a prescription. Your actual daily target depends on your body, activity, medical history and medications, and it should be set with a professional rather than picked from a table. And going lower is not better. Very low intakes cost you muscle and energy, and they are the most reliable predictor of regaining everything later.',
                ],
                table: {
                    caption: 'Rice at 25% of daily calories',
                    columns: ['Daily target', 'Calories for rice', 'Cooked rice per day'],
                    rows: [
                        ['1,600 kcal', '~400 kcal', 'About 300g, or 100g raw'],
                        ['1,800 kcal', '~450 kcal', 'About 340g'],
                        ['2,000 kcal', '~500 kcal', 'About 385g'],
                        ['2,400 kcal', '~600 kcal', 'About 460g'],
                    ],
                },
            },
            {
                heading: 'What Actually Makes Rice Meals High in Calories',
                paragraphs: [
                    'When someone tells me they gave up rice and nothing changed, this is usually why.',
                    'Fix the oil and add a real protein source, and the rice almost always stops being a problem.',
                ],
                bullets: [
                    'The oil in what goes on top. A korma or karahi finished with half a cup of oil carries 900+ calories in the oil alone, spread across the dish. The rice underneath is the cheap part of that meal.',
                    'Fried rice preparations. Yakhni pulao, fried rice and biryani all cook the rice in fat rather than in water. That can add 100-200 calories per serving before anything else happens.',
                    'Second helpings. Rice is the easiest food in the world to top up without registering it, because the first serving never felt like much.',
                    'Nothing with protein. A plate of rice and daal alone can come in under 15g of protein. You will be hungry within two hours and that hunger gets paid for later, usually with something you did not plan.',
                ],
                links: [
                    {
                        label: 'Biryani is the clearest example of rice cooked in fat',
                        to: '/blog/biryani-and-weight-loss-portion-guide',
                    },
                ],
            },
            {
                heading: 'Rice or Roti, Which Is Better?',
                paragraphs: [
                    'Neither. They are close enough in calories per gram of dry weight that the choice comes down to something more useful: which one you portion accurately.',
                    'Most people count rotis and guess at rice. If that is you, roti is the safer default on days you are not measuring, and rice is fine on days you are. If you genuinely prefer rice, keep it. A plan built on a food you resent has a short life expectancy.',
                ],
                links: [
                    {
                        label: 'See the full breakdown of roti calories and portions',
                        to: '/blog/how-many-calories-in-one-roti',
                    },
                ],
            },
            {
                heading: 'Portioning Rice Without a Kitchen Scale',
                paragraphs: [
                    'The most useful trick: serve rice onto your plate first, before anything else, and do not go back to the pot. Deciding the portion once, at the start, works far better than deciding repeatedly during a meal.',
                ],
                bullets: [
                    'One standard cup of cooked rice is about 150g, or roughly 195 kcal.',
                    'A cupped handful of cooked rice is roughly 100-130g, or 130-170 kcal.',
                    'A closed fist is a reasonable visual for one starch portion for most adults.',
                ],
            },
            {
                heading: 'The Short Version',
                paragraphs: [
                    'White rice is not the reason fat loss stalls. Rice triples in weight when cooked, which makes it the easiest food in the kitchen to over-serve, and that is the actual mechanism behind its reputation.',
                    'Weigh your raw rice once. Learn what 50-75g looks like in your bowl. Pair it with protein. Watch the oil in whatever goes on top. Then stop apologising for it.',
                ],
            },
        ],
        faqs: [
            {
                question: 'Can I eat rice every day and still lose weight?',
                answer:
                    'Yes, provided your total daily intake supports fat loss. Daily rice is normal across most of Asia, including in populations with low obesity rates. Frequency is not the issue; quantity is.',
            },
            {
                question: 'Is basmati better than regular white rice for weight loss?',
                answer:
                    'Calories are nearly identical. The lower GI of basmati, roughly 50-58 versus around 64 for average white rice, makes it the better choice for blood sugar, which matters most if you have diabetes or PCOS.',
            },
            {
                question: 'Should I switch to brown rice?',
                answer:
                    'Only if you will actually eat it. Brown rice adds fibre and lowers GI, both genuine benefits. But a half-and-half mix that your family accepts beats a full switch that ends with everyone eating white rice again three weeks later.',
            },
            {
                question: 'Is rice at night bad for weight loss?',
                answer:
                    'No. Meal timing does not determine fat loss. If rice at dinner helps you feel satisfied and sleep well, that is a point in its favour, not against it.',
            },
            {
                question: 'How much rice can a diabetic eat?',
                answer:
                    'That has to be individualised against your medication, HbA1c and glucose readings, so it is not something an article should answer. What applies generally: choose basmati or brown, keep the portion measured, and always pair it with protein and vegetables rather than eating it alone.',
            },
        ],
        sources: [
            {
                label: 'USDA FoodData Central — Rice, white, long-grain, regular, raw and cooked',
                detail: 'Raw and cooked composition figures.',
            },
            {
                label: 'University of Sydney Glycemic Index Database',
                detail: 'GI values for basmati, jasmine and brown rice.',
            },
            {
                label: 'Systematic review data on mean glycemic index of white and brown rice',
                detail: 'Source of the 64 and 55 mean GI figures.',
            },
            {
                label: 'UK Food Standards Agency',
                detail: 'Guidance on safe storage and reheating of cooked rice.',
            },
        ],
        relatedSlugs: [
            'how-many-calories-in-one-roti',
            'biryani-and-weight-loss-portion-guide',
            'diabetes-friendly-plate-method-for-busy-families',
        ],
        internalLinks: [
            { label: 'See nutrition programs', to: '/services' },
            { label: 'Book a consultation', to: '/booking' },
        ],
    },
    {
        slug: 'biryani-and-weight-loss-portion-guide',
        title: 'Biryani and Weight Loss: A Portion Guide That Does Not Say Do Not Eat Biryani',
        seoTitle: 'Biryani and Weight Loss: How Much You Can Actually Eat',
        seoDescription:
            'A plate of biryani runs 400-900 calories depending on how it is made. Here is how to estimate yours and fit it into a fat-loss week.',
        category: 'Weight Loss',
        excerpt:
            'A plan that requires you to refuse biryani is a plan that fails at the first wedding. Here is what it costs and how to keep it.',
        publishedAt: '2026-08-27',
        readTime: '8 min read',
        heroImage: '/media/biryani-portion.webp',
        heroImageAlt: 'A single plated portion of chicken biryani served with raita and salad',
        keyTakeaways: [
            'A 400g restaurant plate of chicken biryani is roughly 600-750 calories and 28-34g protein.',
            'Three of the four biggest calorie sources in biryani are fat, not rice.',
            'Weigh your usual plate once. Most people are serving 450g while thinking it is 300g.',
            'Measuring the oil in a home degh saves about 100 calories per serving.',
            'Once or twice a week, portioned, keeps biryani in your life permanently.',
        ],
        sections: [
            {
                heading: 'The Quick Answer',
                paragraphs: [
                    'Most nutrition advice about biryani is useless because it amounts to do not. Nobody follows that. Biryani is what gets cooked on Sunday, served at every shaadi, ordered when the family cannot agree on anything else, and eaten at 11pm because someone brought a degh. A plan that requires you to refuse it is a plan that fails at the first wedding.',
                    'A typical restaurant plate of chicken biryani, about 400g, contains roughly 600-750 calories and 28-34g of protein. Estimate yours from the ranges below, then multiply by your plate size.',
                    'The ranges are wide because biryani is not one dish. A home degh made with three tablespoons of oil and a commercial biryani finished with ghee and fried onions are genuinely different foods, and no single number covers both.',
                ],
                table: {
                    caption: 'Calories per 100g by preparation',
                    columns: ['Preparation', 'Calories per 100g'],
                    rows: [
                        ['Home-cooked, measured oil', '~140-160 kcal'],
                        ['Home-cooked, generous ghee', '~170-190 kcal'],
                        ['Restaurant / takeaway', '~170-200 kcal'],
                        ['Shaadi or degh biryani', '~180-210 kcal'],
                    ],
                },
            },
            {
                heading: 'Estimate Your Own Plate',
                paragraphs: [
                    'Plate size is the variable nobody standardises. A plate ranges from 300g to 600g depending on who is serving, and that range alone is 400+ calories.',
                ],
                table: {
                    caption: 'Calories by plate size',
                    columns: ['Plate', 'Weight', 'Home biryani', 'Restaurant biryani'],
                    rows: [
                        ['Small side portion', '200g', '~300 kcal', '~380 kcal'],
                        ['Standard plate', '350g', '~525 kcal', '~660 kcal'],
                        ['Full restaurant plate', '450g', '~675 kcal', '~850 kcal'],
                        ['Heaped shaadi plate', '600g', '~900 kcal', '~1,100 kcal'],
                    ],
                },
                callout:
                    'Weigh your usual serving once, on any kitchen scale, and note the number. You will never need to do it again. Most people are surprised: the plate they thought was 300g is usually closer to 450g.',
            },
            {
                heading: 'Why Every Website Gives a Different Biryani Number',
                paragraphs: [
                    'You will find figures from 140 to 200 calories per 100g, all quoted confidently. They are all defensible, because they are describing different biryanis.',
                ],
                bullets: [
                    'Oil is the biggest variable. Biryani rice is cooked in fat, then layered with more. The difference between a measured three tablespoons and a poured half-cup is roughly 400 calories spread across the pot, about 100 calories per serving on a four-person degh.',
                    'Rice-to-meat ratio changes everything. A meat-heavy biryani has more protein and fewer calories per gram than one that is mostly rice with two pieces of chicken buried in it. Commercial biryani skews heavily towards rice, because rice is cheap.',
                    'Fried onions, potatoes and nuts. Birista is deep-fried. Aloo absorbs oil. Both are traditional, both are delicious, and both add calories that the rice gets blamed for.',
                ],
            },
            {
                heading: 'Biryani Is a Better Choice Than You Think',
                paragraphs: [
                    'This is the part nobody says, and it changes how you should think about the whole dish. Biryani contains protein. A 400g plate of chicken biryani delivers roughly 28-34g of protein. That is a real meal, not a pile of empty starch.',
                    'Chicken tikka with roti wins on paper. But among the dishes people actually order, biryani is mid-table, not the disaster it is treated as, and it beats korma and nihari comfortably.',
                    'If you are choosing between biryani and something healthier that you will resent and abandon, order the biryani and manage the portion. That is a strategy you can repeat.',
                ],
                table: {
                    caption: 'Biryani against the rest of a typical desi menu',
                    columns: ['Dish', 'Approx. calories', 'Protein', 'Verdict'],
                    rows: [
                        ['Chicken biryani, 400g', '600-750', '28-34g', 'Reasonable protein for the calories'],
                        ['Chicken karahi + 2 naan', '900-1,200', '35-45g', 'Naan and oil carry most of it'],
                        ['Chicken korma + 1 naan', '800-1,000', '25-30g', 'Cream and oil, less protein per calorie'],
                        ['Nihari + 2 naan', '900-1,200', '30-40g', 'Very high fat'],
                        ['Chicken tikka + 1 roti', '450-600', '40-50g', 'The best option on most menus'],
                    ],
                },
            },
            {
                heading: 'Where the Calories Actually Hide',
                paragraphs: [
                    'Four places, in order of size. Notice that three of these four are fat, not rice. The rice is the visible part; the oil is the expensive part.',
                ],
                bullets: [
                    'The oil the rice is cooked in. This is the single biggest lever. Rice absorbs fat readily, and biryani rice is fried before it is layered. Cutting the oil in a home biryani from half a cup to three tablespoons saves roughly 400 calories across the pot without changing the spice profile at all.',
                    'Birista, or fried onions. A cup of deep-fried onions can carry 300-400 calories, almost entirely from absorbed oil. Oven-crisped or air-fried onions get you most of the texture for a fraction of the cost.',
                    'The ghee finish. The traditional drizzle before the dum stage is 45 calories per teaspoon and it is rarely just one teaspoon.',
                    'What comes with it. Raita is fine and actively useful. The problems are the extras that arrive alongside: shami kababs, a second salan, a bottle of soft drink, kheer afterwards. A 700-calorie plate becomes an 1,100-calorie meal without anyone touching more rice.',
                ],
            },
            {
                heading: 'How to Fit Biryani Into a Fat-Loss Week',
                subheading: 'Three approaches, pick whichever suits how you actually live',
                paragraphs: [
                    'Serve the plate once, at the start. Put your portion on the plate before you sit down, and do not return to the degh. Deciding your portion once, in advance, works far better than deciding repeatedly over twenty minutes with the pot on the table. Aim for a plate where rice covers about half the surface, with meat, raita and salad taking the rest. That single visual, half the plate rather than two-thirds, is usually worth 200 calories.',
                    'Build the day around it. If you know biryani is coming at dinner, eat lighter and higher-protein earlier. Eggs and dahi at breakfast, chicken and salad at lunch, no snacking in between. A 700-calorie dinner fits comfortably inside most days if breakfast and lunch were 350 each. This is normal, sustainable eating. It is not saving calories in the disordered sense, and you should not skip meals to make room, because arriving at a biryani genuinely hungry is the reliable way to eat 900g of it.',
                    'Use a weekly budget instead of a daily one. Fat loss responds to your intake across a week, not any single day. One 700-calorie biryani meal inside a normal week is unremarkable. Biryani three times a week, plus the extras, is a different picture. Once or twice a week, portioned, is a perfectly reasonable place to land for most people who love it. That framing keeps it in your life permanently, which is the actual goal.',
                ],
                links: [
                    {
                        label: 'A higher-protein breakfast is what makes the lighter day work',
                        to: '/blog/best-high-protein-breakfast-for-fat-loss',
                    },
                ],
            },
            {
                heading: 'Five Changes That Make Home Biryani Lighter Without Ruining It',
                paragraphs: [
                    'These are the ones that survive contact with a real kitchen. None of them involve brown rice or healthy biryani recipes that nobody finishes.',
                    'Together these take a 750-calorie serving to roughly 500 without anyone at the table noticing a diet version has been served. That matters, because food you have to apologise for at your own table does not last.',
                ],
                steps: [
                    'Measure the oil. Three tablespoons for a four-person degh instead of pouring by eye. Saves roughly 100 calories per serving. This is the single highest-return change.',
                    'Shift the ratio towards meat. More chicken, slightly less rice. Same plate size, more protein, fewer calories, and it tastes better.',
                    'Use skinless chicken. Chicken skin renders its fat straight into the rice. Saves 50-80 calories per serving with no change to the flavour of the masala.',
                    'Air-fry or oven-crisp the birista. You keep the texture and colour. You lose most of the absorbed oil.',
                    'Serve with a large raita and a kachumber salad. Dahi adds protein, the salad adds volume and fibre, and together they mean a smaller rice portion still feels like a full plate.',
                ],
            },
            {
                heading: 'Restaurants, Deghs and Shaadis',
                paragraphs: [
                    'A single large meal does not undo a week, and treating weddings as catastrophes is how people end up in the cycle of restriction and rebound that brought them to a nutritionist in the first place. Eat the biryani. Go back to normal the next morning, not with a detox.',
                ],
                bullets: [
                    'At a restaurant: order one plate between two if the portions are large, or ask for a half plate. Order raita. Skip the soft drink, because a regular bottle is 150-200 calories that add nothing to the meal.',
                    'At home with a degh: plate your portion in the kitchen, then bring the plate to the table. Leaving the degh in another room is not a trick, it is just removing a decision you would otherwise have to make eleven times.',
                    'At a shaadi: this is the one worth being relaxed about. Take a normal plate, eat it, enjoy it, and move on.',
                ],
            },
            {
                heading: 'If You Have Diabetes or PCOS',
                paragraphs: [
                    'Biryani is a rice-based dish with a moderate-to-high glycemic load, so it deserves a bit more care, but not exclusion.',
                    'Your specific portion should be set against your medication, HbA1c and glucose readings, which is not something an article can do for you. If you are managing either condition, that is worth working out properly with a professional rather than guessing.',
                ],
                bullets: [
                    'Eat the protein and raita first, rice second. Sequencing meaningfully blunts the glucose response.',
                    'Keep the portion measured rather than served from a communal dish.',
                    'Add a salad for fibre and volume.',
                    'Walk for 10-15 minutes afterwards. Light activity after a carbohydrate-heavy meal helps glucose clearance.',
                    'Choose the meat-heavier plate where there is a choice.',
                ],
                links: [
                    {
                        label: 'The plate method, applied to everyday family meals',
                        to: '/blog/diabetes-friendly-plate-method-for-busy-families',
                    },
                ],
            },
            {
                heading: 'The Short Version',
                paragraphs: [
                    'Biryani costs roughly 600-750 calories for a normal restaurant plate, and it gives you around 30g of protein for that, which makes it one of the more reasonable things on a desi menu rather than one of the worst.',
                    'Weigh your usual plate once. Serve it before you sit down, not from the pot. Measure the oil when you cook it at home. Then eat it once or twice a week without guilt, because a plan that bans biryani is a plan you will quietly stop following by the third weekend.',
                ],
                links: [
                    {
                        label: 'For the rice side of this, see our guide to white rice and portioning',
                        to: '/blog/is-white-rice-bad-for-weight-loss',
                    },
                ],
            },
        ],
        faqs: [
            {
                question: 'How many calories are in one plate of chicken biryani?',
                answer:
                    'Roughly 600-750 calories for a standard 400g restaurant plate. A lighter home version of the same size runs closer to 550-650. A heaped shaadi plate can exceed 1,000.',
            },
            {
                question: 'Is biryani good or bad for weight loss?',
                answer:
                    'Neither. It contains real protein and fits a fat-loss plan when portioned. What makes it a problem is serving size and the oil it is cooked in, not the dish itself.',
            },
            {
                question: 'Is mutton biryani higher in calories than chicken biryani?',
                answer:
                    'Usually yes, because mutton is fattier. Expect roughly 10-20% more for the same plate size. Veg biryani is often lower in calories but also much lower in protein, which makes it less filling.',
            },
            {
                question: 'Can I eat biryani at night?',
                answer:
                    'Yes. Meal timing does not determine fat loss; total intake does. A portioned biryani at dinner is fine.',
            },
            {
                question: 'Is biryani better than pizza or a burger?',
                answer:
                    'Generally yes, on protein per calorie. A 400g biryani gives you around 30g of protein. A medium fast-food burger and fries gives similar calories with less protein and far less volume.',
            },
            {
                question: 'How much biryani can I eat and still lose weight?',
                answer:
                    'Give it 30-40% of your calories for the day and portion accordingly. On an 1,800-calorie target, that is roughly a 550-700 calorie plate, which is a standard home serving or about two-thirds of a restaurant plate.',
            },
        ],
        sources: [
            {
                label: 'USDA FoodData Central',
                detail: 'Composition data for cooked rice, chicken and cooking oils.',
            },
            {
                label: 'Indian Food Composition Tables, National Institute of Nutrition (ICMR)',
                detail: 'Mixed rice dish composition.',
            },
            {
                label: 'University of Sydney Glycemic Index Database',
                detail: 'Basmati and mixed rice dishes.',
            },
            {
                label: 'Published data on meal sequencing and postprandial glucose response',
                detail: 'Protein and vegetables before carbohydrate.',
            },
        ],
        relatedSlugs: [
            'is-white-rice-bad-for-weight-loss',
            'how-many-calories-in-one-roti',
            'ramadan-nutrition-plan-for-energy-and-fat-loss',
        ],
        internalLinks: [
            { label: 'See nutrition programs', to: '/services' },
            { label: 'Book a consultation', to: '/booking' },
        ],
    },
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
        relatedSlugs: [
            'how-many-calories-in-one-roti',
            'simple-weekly-diet-planning-for-busy-professionals',
            'ramadan-nutrition-plan-for-energy-and-fat-loss',
        ],
        internalLinks: [
            { label: 'How many calories are in one roti, and how many fit your day', to: '/blog/how-many-calories-in-one-roti' },
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
        relatedSlugs: [
            'how-many-calories-in-one-roti',
            'best-high-protein-breakfast-for-fat-loss',
            'diabetes-friendly-plate-method-for-busy-families',
        ],
        internalLinks: [
            { label: 'Portion your roti without cutting it out', to: '/blog/how-many-calories-in-one-roti' },
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
        relatedSlugs: [
            'how-many-calories-in-one-roti',
            'best-high-protein-breakfast-for-fat-loss',
            'gut-health-meal-rhythm-for-bloating-relief',
        ],
        internalLinks: [
            { label: 'Work out your real roti calories before you plan the week', to: '/blog/how-many-calories-in-one-roti' },
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
        relatedSlugs: [
            'is-white-rice-bad-for-weight-loss',
            'how-many-calories-in-one-roti',
            'pcos-diet-plan-basics-that-actually-work',
        ],
        internalLinks: [
            { label: 'How many rotis fit a diabetes-friendly plate', to: '/blog/how-many-calories-in-one-roti' },
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
        relatedSlugs: [
            'simple-weekly-diet-planning-for-busy-professionals',
            'best-high-protein-breakfast-for-fat-loss',
            'pcos-diet-plan-basics-that-actually-work',
        ],
        internalLinks: [
            { label: 'Build the week around a repeatable meal rhythm', to: '/blog/simple-weekly-diet-planning-for-busy-professionals' },
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
        relatedSlugs: [
            'biryani-and-weight-loss-portion-guide',
            'how-many-calories-in-one-roti',
            'best-high-protein-breakfast-for-fat-loss',
        ],
        internalLinks: [
            { label: 'Know your roti calories before sehri and iftar', to: '/blog/how-many-calories-in-one-roti' },
            { label: 'Start a weight loss coaching plan', to: '/services' },
            { label: 'Book Ramadan nutrition consultation', to: '/booking' },
        ],
    },
]
