document.addEventListener('DOMContentLoaded', function () {
  const track = document.querySelector('.carousel__track');
  const slides = Array.from(track.children);
  const prevButton = document.querySelector('.carousel__button--prev');
  const nextButton = document.querySelector('.carousel__button--next');
  const nav = document.querySelector('.carousel__nav');
  const dots = Array.from(nav.children);
  let currentIndex = 0;
  let intervalId = null;
  const AUTOPLAY_INTERVAL = 4000;

  // Position slides (100% width each)
  function setSlidePositions() {
    slides.forEach((slide, index) => {
      slide.style.left = `${index * 100}%`;
    });
  }

  function moveToIndex(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    track.style.transform = `translateX(-${index * 100}%)`;
    slides[currentIndex].classList.remove('current-slide');
    slides[index].classList.add('current-slide');
    dots[currentIndex].classList.remove('current-slide');
    dots[index].classList.add('current-slide');
    currentIndex = index;
  }

  prevButton.addEventListener('click', () => moveToIndex(currentIndex - 1));
  nextButton.addEventListener('click', () => moveToIndex(currentIndex + 1));

  nav.addEventListener('click', (e) => {
    const targetButton = e.target.closest('button');
    if (!targetButton) return;
    const targetIndex = dots.indexOf(targetButton);
    if (targetIndex !== -1) moveToIndex(targetIndex);
  });

  // Autoplay
  function startAutoplay() {
    stopAutoplay();
    intervalId = setInterval(() => moveToIndex(currentIndex + 1), AUTOPLAY_INTERVAL);
  }
  function stopAutoplay() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  const carousel = document.querySelector('.carousel');
  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);

  // Keyboard support
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') moveToIndex(currentIndex - 1);
    if (e.key === 'ArrowRight') moveToIndex(currentIndex + 1);
  });

  // Responsiveness: re-calc positions if needed (slides use % so not strictly necessary)
  window.addEventListener('resize', setSlidePositions);

  // Init
  setSlidePositions();
  startAutoplay();
});