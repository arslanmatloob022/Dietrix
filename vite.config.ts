import { defineConfig, type UserConfig } from 'vite'
import type { ViteSSGOptions } from 'vite-ssg'
import vue from '@vitejs/plugin-vue'
import { blogPosts } from './src/data/content'

// https://vite.dev/config/
const config: UserConfig & { ssgOptions: ViteSSGOptions } = {
  plugins: [vue()],
  ssgOptions: {
    dirStyle: 'nested',
    formatting: 'minify',
    includedRoutes(paths: string[]) {
      const concretePaths = paths.filter((path) => !path.includes(':') && !path.includes('*'))

      return Array.from(new Set([...concretePaths, ...blogPosts.map((post) => `/blog/${post.slug}`)]))
    },
  },
}

export default defineConfig(config)
