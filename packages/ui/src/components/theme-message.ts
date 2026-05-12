import { setTheme } from 'astro-theme-toggle/client'

export function initThemeMessage(): void {
  if (typeof window === 'undefined') return

  window.addEventListener('message', (event) => {
    try {
      const { type, theme } = event.data as { type: string; theme: string }
      if (
        type === 'astrobook:set-theme' &&
        (theme === 'dark' || theme === 'light')
      ) {
        setTheme(theme)
      }
    } catch {
      // ignore
    }
  })
}
