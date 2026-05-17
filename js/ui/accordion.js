export class Accordion {
  constructor(selector = '[data-accordion]') {
    document.querySelectorAll(selector).forEach((root) => {
      const trigger = root.querySelector('[data-accordion-trigger]') || root.querySelector('summary, button');
      const panel = root.querySelector('[data-accordion-panel]');
      if (!trigger || !panel) return;
      trigger.addEventListener('click', () => {
        const open = root.classList.toggle('open');
        trigger.setAttribute('aria-expanded', String(open));
        panel.hidden = !open;
      });
    });
  }
}
