function syncActiveStory(): void {
  const activeStory = document.documentElement.dataset.activeStory || ''

  const links: HTMLAnchorElement[] = Array.from(
    document.querySelectorAll<HTMLAnchorElement>(
      'a[data-astrobook-story-link][data-story-id]',
    ),
  )
  for (const link of links) {
    const active = link.dataset.storyId === activeStory
    link.classList.toggle('astrobook-sidebar-story-link-active', active)
    link.classList.toggle('astrobook-sidebar-story-link-inactive', !active)
  }
}

syncActiveStory()
document.addEventListener('astro:after-swap', syncActiveStory)
export {}
