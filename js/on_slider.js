let slider__currentSlide = 0;
const slider__slides = document.querySelectorAll('.slider__slide');
const slider__container = document.getElementById('for__work__container');
const slider__totalSlides = slider__slides.length;

const slider__backgrounds = [
    'url(/img/bg1.jpg)',
    'url(/img/bbbg2.jpg)', 
    'url(/img/bg.jpg)' 
];

function changeSlide(direction) {
    slider__currentSlide += direction;
    if (slider__currentSlide < 0) slider__currentSlide = slider__totalSlides - 1;
    if (slider__currentSlide >= slider__totalSlides) slider__currentSlide = 0;

    // Сдвигаем слайды
    document.querySelector('.slider__slider').style.transform = `translateX(-${slider__currentSlide * 100}%)`;

    // Меняем фон родительского блока
    const newBackground = slider__backgrounds[slider__currentSlide];
    slider__container.style.backgroundImage = newBackground;

    // Обновляем счетчик слайдов
    document.getElementById('current__slide').textContent = slider__currentSlide + 1;
}

// Инициализируем начальный фон и счетчик
slider__container.style.backgroundImage = slider__backgrounds[slider__currentSlide];
document.getElementById('current__slide').textContent = slider__currentSlide + 1;
document.getElementById('total__slides').textContent = slider__totalSlides;


let slideIndex = 1;
showSlides(slideIndex);

function moveSlide(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let slides = document.querySelectorAll(".slide");
    let dots = document.querySelectorAll(".dot");

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    slides.forEach(slide => slide.style.display = "none");
    dots.forEach(dot => dot.classList.remove("active"));

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add("active");
}

let teamSlideIndex = 1;
showTeamSlides(teamSlideIndex);

function moveTeamSlide(n) {
    showTeamSlides(teamSlideIndex += n);
}

function currentTeamSlide(n) {
    showTeamSlides(teamSlideIndex = n);
}

function showTeamSlides(n) {
    let slides = document.querySelectorAll(".team-slide");
    let dots = document.querySelectorAll(".team-dot");

    if (n > slides.length) { teamSlideIndex = 1 }
    if (n < 1) { teamSlideIndex = slides.length }

    slides.forEach(slide => slide.style.display = "none");
    dots.forEach(dot => dot.classList.remove("active"));

    slides[teamSlideIndex - 1].style.display = "block";
    dots[teamSlideIndex - 1].classList.add("active");
}
