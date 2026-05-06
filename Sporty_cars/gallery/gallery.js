function initGallerySwipe() {
  const slider = document.getElementById('gallery-slider');
  const track = document.getElementById('slides');
  const prev = document.getElementById('gallery-prev');
  const next = document.getElementById('gallery-next');
  const dotsWrap = document.getElementById('gallery-dots');
  if (!slider || !track) return;

  const slides = Array.from(track.querySelectorAll('.slide'));
  let index = 0;
  let startX = 0;
  let currentX = 0;
  let dragging = false;
  let autoTimer;

  const visibleCount = () => (window.innerWidth > 980 ? 2 : 1);
  const maxIndex = () => Math.max(0, slides.length - visibleCount());

  function makeDots() {
    dotsWrap.innerHTML = '';
    for (let i = 0; i <= maxIndex(); i++) {
      const b = document.createElement('button');
      b.className = 'dot';
      b.setAttribute('aria-label', `Go to slide ${i + 1}`);
      b.addEventListener('click', () => { index = i; update(true); restartAuto(); });
      dotsWrap.appendChild(b);
    }
  }

  function update(animate = true) {
    const width = slider.clientWidth / visibleCount();
    track.style.transition = animate ? 'transform .55s ease' : 'none';
    track.style.transform = `translate3d(${-index * width}px,0,0)`;
    [...dotsWrap.children].forEach((d, i) => d.classList.toggle('active', i === index));
    slides.forEach((s, i) => s.classList.toggle('is-active', i >= index && i < index + visibleCount()));
  }

  function clamp(i) { return Math.max(0, Math.min(i, maxIndex())); }
  function go(dir){ index = clamp(index + dir); update(true); restartAuto(); }

  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => {
      index = index >= maxIndex() ? 0 : index + 1;
      update(true);
    }, 3500);
  }
  function restartAuto(){ startAuto(); }

  slider.addEventListener('pointerdown', (e) => {
    dragging = true; startX = currentX = e.clientX;
    track.style.transition = 'none';
    slider.setPointerCapture(e.pointerId);
  });
  slider.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    currentX = e.clientX;
    const dx = currentX - startX;
    const width = slider.clientWidth / visibleCount();
    track.style.transform = `translate3d(${(-index * width) + dx}px,0,0)`;
  });
  function endDrag() {
    if (!dragging) return;
    dragging = false;
    const delta = currentX - startX;
    if (delta < -60) index = clamp(index + 1);
    if (delta > 60) index = clamp(index - 1);
    update(true); restartAuto();
  }

  prev?.addEventListener('click', () => go(-1));
  next?.addEventListener('click', () => go(1));
  slider.addEventListener('pointerup', endDrag);
  slider.addEventListener('pointercancel', endDrag);
  slider.addEventListener('mouseenter', () => clearInterval(autoTimer));
  slider.addEventListener('mouseleave', startAuto);

  window.addEventListener('resize', () => {
    index = clamp(index);
    makeDots();
    update(false);
  });

  makeDots();
  update(false);
  startAuto();
}
