document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  const horizontalSections = gsap.utils.toArray('.horizontal');

  horizontalSections.forEach((sec) => {
    const animWrap = sec.querySelector('.animation-wrap');
    const isRight = animWrap.classList.contains('to-right');

    const getTravelDistance = () =>
      animWrap.scrollWidth - window.innerWidth;

    gsap.fromTo(
      animWrap,
      {
        x: isRight ? 0 : -getTravelDistance()
      },
      {
        x: isRight ? -getTravelDistance() : 0,
        ease: "none",
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          end: () => `+=${getTravelDistance()}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true
        }
      }
    );
  });

  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });
});