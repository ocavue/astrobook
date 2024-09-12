import { setTheme } from 'astro-theme-toggle'

if (typeof window !== 'undefined') {
  // Add message event listener to toggle the theme
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
