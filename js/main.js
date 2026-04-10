gsap.registerPlugin(ScrollTrigger);

gsap.from(".hero-content", {
  y: 50,
  opacity: 0,
  duration: 1,
  ease: "power3.out"
});

gsap.utils.toArray(".section").forEach((section) => {
  gsap.from(section, {   
    scrollTrigger: {
      trigger: section,
      start: "top 50%",
    },
    y: 50,
    opacity: 0,
    duration: 1,
  });
});

gsap.from(".project-card", {
  scrollTrigger: {
    trigger: "#projects",
    start: "top 80%",
  },
  y: 30,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2
});

gsap.utils.toArray(".timeline-item").forEach((item) => {
  gsap.from(item, {
    scrollTrigger: {
      trigger: item,
      start: "top 85%",
    },
    opacity: 0,
    y: 50,
    duration: 1,
  });
});