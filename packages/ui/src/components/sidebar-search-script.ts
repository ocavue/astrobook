import { compressTerms } from './compress-terms'

const TREE_ID = 'astrobook-sidebar-tree'
const SEARCH_INPUT_ID = 'astrobook-search-input'
const SEARCH_TOGGLE_ID = 'astrobook-search-toggle'
const SEARCH_PANEL_ID = 'astrobook-search-panel'
const STYLE_ID = 'astrobook-search-style'
const OPEN_KEY = 'astrobook-sidebar-search-open'
const QUERY_KEY = 'astrobook-sidebar-search-query'

function getStyleElement(doc: Document): HTMLStyleElement {
  let styleEl = doc.getElementById(STYLE_ID) as HTMLStyleElement | null
  if (!styleEl) {
    styleEl = doc.createElement('style')
    styleEl.id = STYLE_ID
    doc.head.appendChild(styleEl)
  }
  return styleEl
}

function updateQuery(doc: Document,query: string): void {
  const trimmed = query.trim()
  const el = getStyleElement(doc)

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

export function initSearch(): void {
  const searchInputElement = document.getElementById(
    SEARCH_INPUT_ID,
  ) as HTMLInputElement | null
  const searchToggleElement = document.getElementById(SEARCH_TOGGLE_ID)
  const searchPanelElement = document.getElementById(SEARCH_PANEL_ID)
  if (!searchInputElement || !searchToggleElement || !searchPanelElement) return


const searchInput = searchInputElement;
const searchToggle = searchToggleElement;
const searchPanel = searchPanelElement;


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


  const query = sessionStorage.getItem(QUERY_KEY)
  if (!query) {
    return
  }

  searchPanel.setAttribute('data-open', '')
  searchToggle.setAttribute('data-active', '')
  searchInput.value = query
  updateQuery(query)
}
