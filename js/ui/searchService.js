export class SearchService {
  constructor({ contentSelector = '.docs-content', searchInput = '#search-input', results = '#search-results', overlay = '#search-overlay' } = {}) {
    this.content = document.querySelector(contentSelector);
    this.input = document.querySelector(searchInput);
    this.results = document.querySelector(results);
    this.overlay = document.querySelector(overlay);
    if (!this.content || !this.input || !this.results) return;
    this.index = [...this.content.querySelectorAll('[data-section], h2, h3, p, li')]
      .map((node) => ({ node, text: node.textContent.trim(), section: node.closest('[data-section]') }))
      .filter((item) => item.text.length > 24);
    this.input.addEventListener('input', () => this.search());
    this.input.addEventListener('focus', () => this.search());
    this.overlay?.addEventListener('click', () => this.close());
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') this.close(); });
  }
  search() {
    const query = this.input.value.trim().toLowerCase();
    if (!query) return this.close(false);
    const matches = this.index.filter((item) => item.text.toLowerCase().includes(query)).slice(0, 12);
    this.results.innerHTML = matches.length ? matches.map((item) => {
      const section = item.section?.querySelector('h2, h3')?.textContent?.trim() || '문서';
      const id = item.section?.id || item.node.id || '';
      const text = item.text.replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));
      return `<a class="search-result" href="#${encodeURIComponent(id)}"><strong>${section}</strong><span>${text}</span></a>`;
    }).join('') : '<div class="search-empty">검색 결과가 없습니다.</div>';
    this.results.classList.add('active');
    this.overlay?.classList.add('active');
    this.results.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => this.close(false)));
  }
  close(clear = true) {
    if (clear) this.input.value = '';
    this.results.classList.remove('active');
    this.overlay?.classList.remove('active');
  }
}
