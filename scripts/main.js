(() => {
  const nav = document.querySelector(".nav-track");
  if (!nav) return;
  const links = [...nav.querySelectorAll("a")];
  const line = nav.querySelector(".line");
  const wrapper = nav.querySelector(".line-wrapper");
  if (!line || !wrapper || !links.length) return;

  const step = 60; // высота одной "позиции"
  const offsetTop = 0; // можно подправить, если нужно сместить вверх/вниз

  const moveTo = (index) => {
    const top = offsetTop + index * step;
    line.style.top = top + "px";
  };

  const setActive = (link) => {
    links.forEach((x) => x.classList.toggle("active", x === link));
    moveTo(links.indexOf(link));
  };

  links.forEach((l) =>
    l.addEventListener("click", (e) => {
      const href = l.getAttribute("href");
      if (href?.startsWith("#")) {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }
      setActive(l);
    })
  );

  const updateActiveByScroll = () => {
    let nearest = 0;
    let min = Infinity;
    links.forEach((l, i) => {
      const id = l.getAttribute("href");
      const sec = id && id.startsWith("#") ? document.querySelector(id) : null;
      if (!sec) return;
      const d = Math.abs(sec.getBoundingClientRect().top);
      if (d < min) (min = d), (nearest = i);
    });
    setActive(links[nearest]);
  };

  const init = () => setActive(nav.querySelector("a.active") || links[0]);

  window.addEventListener("load", init);
  window.addEventListener("resize", init);
  window.addEventListener("scroll", updateActiveByScroll, { passive: true });
})();
