(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduceMotion.matches || !('IntersectionObserver' in window)) return;

  const selectors = [
    '.intro-content > h2', '.intro-columns', '.intro-quote',
    '.split-heading', '.direction-card', '.directions-note',
    '.daily-heading', '.daily-steps > article',
    '.sequence-heading', '.sequence-list > div',
    '.roots-visual', '.roots-copy',
    '.program-list > details', '.program-aside',
    '.outcome-grid > div:first-child', '.outcome-list > div',
    '.author-image', '.author-copy',
    '.faq-grid > div:first-child', '.faq-list > details',
    '.final-inner > h2', '.final-inner > p', '.final-facts', '.final-inner > .button'
  ];
  const items = document.querySelectorAll(selectors.join(', '));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.01, rootMargin: '0px 0px -5% 0px' });

  items.forEach((item, index) => {
    // Leave anything already on screen visible, including direct links to a section.
    if (item.getBoundingClientRect().top < window.innerHeight) return;
    item.style.setProperty('--reveal-delay', `${(index % 3) * 80}ms`);
    item.classList.add('motion-reveal');
    observer.observe(item);
  });
})();
