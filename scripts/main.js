(() => {
  const nav = document.querySelector(".nav-track");
  if (!nav) return;
  const links = [...nav.querySelectorAll("a")];
  const line = nav.querySelector(".line");
  const wrapper = nav.querySelector(".line-wrapper");
  if (!line || !wrapper || !links.length) return;

  const step = 60;
  const offsetTop = 0;
  let lock = false;

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
        const target = document.querySelector(href);
        if (target) {
          lock = true;
          document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
          setActive(l);
          setTimeout(() => (lock = false), 700);
        }
      } else {
        setActive(l);
      }
    })
  );

  const updateActiveByScroll = () => {
    if (lock) return;
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
