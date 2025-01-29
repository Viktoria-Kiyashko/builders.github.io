let slideIndex = 1;
let slides = document.querySelectorAll('.slide');
let thumbnails = document.querySelectorAll('.thumbnails img');
let video = document.getElementById('slideVideo');

// Функция для отображения слайда
function showSlide(index) {
  if (index > slides.length) {
    slideIndex = 1;
  }
  if (index < 1) {
    slideIndex = slides.length;
  }

  slides.forEach((slide, i) => {
    slide.style.display = 'none';
    thumbnails[i].style.opacity = 0.5;
  });

  slides[slideIndex - 1].style.display = 'block';
  thumbnails[slideIndex - 1].style.opacity = 1;

  // Управление воспроизведением видео на первом слайде
  if (slideIndex === 1 && video) {
    video.play();
  } else if (video) {
    video.pause();
  }
}

// Перемещение слайдов
function moveSlide(n) {
  showSlide((slideIndex += n));
}

// Установка текущего слайда
function currentSlide(n) {
  showSlide((slideIndex = n));
}

// Инициализация
showSlide(slideIndex);

document.addEventListener('DOMContentLoaded', function () {
  const video = document.getElementById('slideVideo');
  const slider = document.querySelector('.slider');

  function adjustSliderHeight() {
    if (video.videoWidth && video.videoHeight) {
      const aspectRatio = video.videoWidth / video.videoHeight;
      slider.style.height = `${slider.offsetWidth / aspectRatio}px`;
    }
  }

  // Настраиваем высоту после загрузки метаданных видео
  video.addEventListener('loadedmetadata', adjustSliderHeight);

  // Перерасчет высоты при изменении размера окна
  window.addEventListener('resize', adjustSliderHeight);
});
