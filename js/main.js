document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  const fadeTargets = document.querySelectorAll(
    '.about-copy, .about-sidebar, .info-card, .looking-copy, .looking-quote, ' +
    '.goal-card, .exp-copy, .exp-sidebar, .connection-inner, ' +
    '.extras-copy, .resume-highlights, .project-copy, .project-sidebar, .gallery-slot'
  );

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    fadeTargets.forEach(el => el.classList.add('fade-up'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    fadeTargets.forEach(el => observer.observe(el));

    document.querySelectorAll('.goal-card').forEach((card, i) => {
      card.style.transitionDelay = `${i * 0.1}s`;
    });

    document.querySelectorAll('.gallery-slot').forEach((slot, i) => {
      slot.style.transitionDelay = `${i * 0.06}s`;
    });
  }
});
