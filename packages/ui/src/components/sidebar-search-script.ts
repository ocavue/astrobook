import { compressTerms } from './compress-terms'

const TREE_ID = 'astrobook-sidebar-tree'
const SEARCH_INPUT_ID = 'astrobook-search-input'
const SEARCH_TOGGLE_ID = 'astrobook-search-toggle'
const SEARCH_PANEL_ID = 'astrobook-search-panel'
const STYLE_ID = 'astrobook-search-style'

function getStyleElement(): HTMLStyleElement {
  let styleEl = document.getElementById(STYLE_ID) as HTMLStyleElement | null
  if (!styleEl) {
    styleEl = document.createElement('style')
    styleEl.id = STYLE_ID
    document.head.appendChild(styleEl)
  }
  return styleEl
}

function updateQuery(query: string): void {
  const trimmed = query.trim()
  const el = getStyleElement()

  if (!trimmed) {
    el.textContent = ''
    return
  }

  const terms = compressTerms(trimmed.split(/\s+/))
  const rules = terms.map((term) => {
    return `#${TREE_ID} [data-search-text]:not([data-search-text*="${CSS.escape(term)}"]) { display: none !important; }`
  })
  el.textContent = rules.join('\n')
}

function addListener(
  searchInput: HTMLInputElement,
  searchToggle: HTMLElement,
  searchPanel: HTMLElement,
): void {
  function openPanel(): void {
    searchPanel.setAttribute('data-open', '')
    searchToggle.setAttribute('data-active', '')
    requestAnimationFrame(() => searchInput.focus())
  }

  function closePanel(): void {
    searchInput.value = ''
    updateQuery('')
    searchPanel.removeAttribute('data-open')
    searchToggle.removeAttribute('data-active')
  }

  function handleInput(): void {
    updateQuery(searchInput.value)
  }

  searchToggle.addEventListener('click', () => {
    if (searchPanel.hasAttribute('data-open')) {
      closePanel()
    } else {
      openPanel()
    }
  })

  searchInput.addEventListener('input', handleInput)
}

export function initSearch(): void {
  const searchInput = document.getElementById(
    SEARCH_INPUT_ID,
  ) as HTMLInputElement | null
  const searchToggle = document.getElementById(SEARCH_TOGGLE_ID)
  const searchPanel = document.getElementById(SEARCH_PANEL_ID)
  if (!searchInput || !searchToggle || !searchPanel) return

  addListener(searchInput, searchToggle, searchPanel)
}
