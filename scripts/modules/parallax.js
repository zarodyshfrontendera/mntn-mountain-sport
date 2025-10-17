export function initParallax() {
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    document.body.style.backgroundPosition = `
      center ${1204 - y * 0.4}px,
      28% ${768 - y * 0.6}px,
      center ${250 - y * 0.3}px,
      center ${0 - y * 0.15}px,
      center ${-400 - y * 0.1}px
    `;
  });
}
