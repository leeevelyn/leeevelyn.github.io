gsap.registerPlugin(ScrollTrigger);

gsap.to(".fade-text", {
  scrollTrigger: {
    trigger: ".fade-text", // Element that triggers the animation
    start: "top 80%",      // When top of text hits 80% from top of viewport
    end: "top 30%",        // Ends when top of text hits 30% from top
    scrub: true,           // Links animation to scroll
    markers: false         // Set to true to see trigger points
  },
  opacity: 1,
  duration: 1
});

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