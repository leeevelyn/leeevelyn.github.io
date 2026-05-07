gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  const horizontalSections = gsap.utils.toArray('section.horizontal');

  horizontalSections.forEach((sec) => {
    const animWrap = sec.querySelector('.animation-wrap');
    const isRight = animWrap.classList.contains('to-right');

    const getTravelDistance = () => animWrap.scrollWidth - window.innerWidth;

    gsap.fromTo(animWrap,
      { x: isRight ? 0 : () => -getTravelDistance() },
      {
        x: isRight ? () => -getTravelDistance() : 0,
        ease: 'circ',
        scrollTrigger: {
          trigger: sec,
          start: 'top top',
          end: () => '+=' + getTravelDistance(),
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      }
    );
  });
});