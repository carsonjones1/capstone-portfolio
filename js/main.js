document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const fadeTargets = document.querySelectorAll(
    '.about-copy, .about-sidebar, .info-card, .looking-copy, ' +
    '.journey, .exp-copy, .exp-sidebar, .connection-inner, ' +
    '.extras-copy, .resume-highlights, .project-copy, .project-sidebar, .gallery-slot'
  );

  if (!reduceMotion) {
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

    document.querySelectorAll('.gallery-slot').forEach((slot, i) => {
      slot.style.transitionDelay = `${i * 0.06}s`;
    });
  }

  initJourneyTimeline(reduceMotion);
});

function initJourneyTimeline(reduceMotion) {
  const journey = document.querySelector('[data-journey]');
  if (!journey) return;

  const fill = journey.querySelector('[data-journey-fill]');
  const marker = journey.querySelector('[data-journey-marker]');

  // Past sophomore, entering junior — just past the halfway mark
  const CURRENT_PROGRESS = 54;

  const setProgress = (percent) => {
    // Rail spans node centers: 12.5% → 87.5% (75% of rail width)
    const railLeft = `${12.5 + (percent / 100) * 75}%`;
    if (fill) fill.style.width = `${(percent / 100) * 75}%`;
    if (marker) marker.style.left = railLeft;
  };

  const start = () => {
    journey.classList.add('is-ready');
    setProgress(CURRENT_PROGRESS);
  };

  if (reduceMotion) {
    start();
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        start();
        io.disconnect();
      }
    });
  }, { threshold: 0.35 });

  io.observe(journey);
}
