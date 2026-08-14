import { compressTerms } from './compress-terms'

const TREE_ID = 'astrobook-sidebar-tree'
const SEARCH_INPUT_ID = 'astrobook-search-input'
const SEARCH_TOGGLE_ID = 'astrobook-search-toggle'
const SEARCH_PANEL_ID = 'astrobook-search-panel'
const STYLE_ID = 'astrobook-search-style'
const OPEN_KEY = 'astrobook-sidebar-search-open'
const QUERY_KEY = 'astrobook-sidebar-search-query'

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

  const terms = compressTerms(trimmed.split(/[\s\p{P}]+/u))
  const rules = terms.map((term) => {
    return `#${TREE_ID} [data-search-text]:not([data-search-text*="${CSS.escape(term)}"]) { display: none !important; }`
  })
  el.textContent = rules.join('\n')
}

function saveQuery(query: string): void {
  if (query) {
    sessionStorage.setItem(QUERY_KEY, query)
  } else {
    sessionStorage.removeItem(QUERY_KEY)
  }
}

function addListener(
  searchInput: HTMLInputElement,
  searchToggle: HTMLElement,
  searchPanel: HTMLElement,
): void {
  function openPanel(): void {
    searchPanel.setAttribute('data-open', '')
    searchToggle.setAttribute('data-active', '')
    sessionStorage.setItem(OPEN_KEY, '1')
    requestAnimationFrame(() => searchInput.focus())
  }

  function closePanel(): void {
    searchInput.value = ''
    saveQuery('')
    updateQuery('')
    searchPanel.removeAttribute('data-open')
    searchToggle.removeAttribute('data-active')
    sessionStorage.removeItem(OPEN_KEY)
  }

  function handleInput(): void {
    saveQuery(searchInput.value)
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

function restoreState(
  searchInput: HTMLInputElement,
  searchToggle: HTMLElement,
  searchPanel: HTMLElement,
): void {
  if (!sessionStorage.getItem(OPEN_KEY)) {
    return
  }

  const query = sessionStorage.getItem(QUERY_KEY) || ''
  searchPanel.setAttribute('data-open', '')
  searchToggle.setAttribute('data-active', '')
  searchInput.value = query
  updateQuery(query)
}

export function initSearch(): void {
  const searchInput = document.querySelector<HTMLInputElement>(
    `#${SEARCH_INPUT_ID}`,
  )
  const searchToggle = document.getElementById(SEARCH_TOGGLE_ID)
  const searchPanel = document.getElementById(SEARCH_PANEL_ID)
  if (!searchInput || !searchToggle || !searchPanel) return

  addListener(searchInput, searchToggle, searchPanel)
  restoreState(searchInput, searchToggle, searchPanel)
}
