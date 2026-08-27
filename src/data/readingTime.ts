import type { BlogPost } from '../types/models'

const WORDS_PER_MINUTE = 200

/**
 * Words actually rendered in the article body: paragraphs, lists, table cells
 * and callouts. Headings are excluded because they are navigation, not reading.
 */
function countWords(post: BlogPost) {
    const chunks: string[] = []

    for (const section of post.sections) {
        chunks.push(...section.paragraphs)
        chunks.push(...(section.bullets ?? []))
        chunks.push(...(section.steps ?? []))
        if (section.callout) chunks.push(section.callout)
        if (section.table) {
            chunks.push(...section.table.rows.flat())
            if (section.table.footnote) chunks.push(section.table.footnote)
        }
    }

    for (const faq of post.faqs ?? []) {
        chunks.push(faq.question, faq.answer)
    }

    return chunks.join(' ').split(/\s+/).filter(Boolean).length
}

/**
 * Rounds DOWN. A badge that overstates the read is the habit that made the
 * older posts look padded, so an honest floor is the default.
 */
export function readingTime(post: BlogPost) {
    if (post.readTime) {
        return post.readTime
    }

    const minutes = Math.max(1, Math.floor(countWords(post) / WORDS_PER_MINUTE))
    return `${minutes} min read`
}
