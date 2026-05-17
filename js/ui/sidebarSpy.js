export class SidebarSpy {
  constructor({ links = '.sidebar-link', sections = '[data-section]' } = {}) {
    this.links = [...document.querySelectorAll(links)];
    this.sections = [...document.querySelectorAll(sections)];
    if (!this.links.length || !this.sections.length) return;
    this.byId = new Map(this.links.map((a) => [decodeURIComponent((a.getAttribute('href') || '').replace(/^#/, '')), a]));
    this.observer = new IntersectionObserver((entries) => this.onIntersect(entries), { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.25, 0.5, 1] });
    this.sections.forEach((section) => this.observer.observe(section));
  }
  onIntersect(entries) {
    const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    this.links.forEach((a) => a.classList.remove('active'));
    const active = this.byId.get(visible.target.id);
    active?.classList.add('active');
  }
}
