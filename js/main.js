function checkScroll() {
  const scrollThreshold = 400; 
  const element = document.getElementById('header__fixed');
  const scrollPosition = window.scrollY + window.innerHeight; 
  const pageHeight = document.documentElement.scrollHeight;

  if (window.scrollY >= scrollThreshold) {
      element.style.height = '90px';
  } else {
      element.style.height = '0';
  }

  if (scrollPosition >= pageHeight) {
      element.style.height = '0';
      element.classList.remove('active');
  } else {
      element.classList.add('active');
  }
}

// Добавляем обработчик для прокрутки
window.addEventListener('scroll', checkScroll);

document.addEventListener('DOMContentLoaded', function () {
  const nextButtons = document.querySelectorAll('.next-step');
  const prevButtons = document.querySelectorAll('.prev-step'); // Кнопки "Назад"
  const steps = document.querySelectorAll('.step');
  const progressBarFill = document.querySelector('.progress-bar-fill');
  let currentStep = 0;
  const totalSteps = steps.length;

  showStep(currentStep);
  updateProgressBar();

  nextButtons.forEach(button => {
    button.addEventListener('click', function () {
      const nextStep = button.getAttribute('data-next');
      currentStep = parseInt(nextStep) - 1;
      showStep(currentStep);
      updateProgressBar();
    });
  });

  function showStep(stepIndex) {
    steps.forEach((step, index) => {
      step.style.display = (index === stepIndex) ? 'flex' : 'none';
    });
  }

  function updateProgressBar() {
    const progress = (currentStep / (totalSteps - 1)) * 100;
    progressBarFill.style.width = progress + '%';
  }

  const form = document.getElementById('calcForm');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let formData = new FormData(form);
    let data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    alert('Ваша заявка:\n' + JSON.stringify(data, null, 2));
  });
});

document.querySelectorAll('.faq-question').forEach(item => {
  item.addEventListener('click', function () {
    const answer = item.nextElementSibling;
    const icon = item.querySelector('.faq-icon');
    answer.style.display = (answer.style.display === 'block') ? 'none' : 'block';
    icon.style.transform = (icon.style.transform === 'rotate(-90deg)') ? 'rotate(0deg)' : 'rotate(-90deg)';
  });
});

document.getElementById('phone').addEventListener('input', function (event) {
  let input = event.target;
  let value = input.value.replace(/\D/g, ''); // Убираем все нечисловые символы
  if (value.startsWith('7') || value.startsWith('8')) {
    value = '7' + value.substring(1); // Заменяем первую цифру на 7
  } else {
    value = '7' + value; // Добавляем +7, если пользователь начал ввод с другой цифры
  }
  
  // Применяем маску
  let formattedValue = '+7';
  if (value.length > 1) formattedValue += ' (' + value.substring(1, 4);
  if (value.length > 4) formattedValue += ') ' + value.substring(4, 7);
  if (value.length > 7) formattedValue += '-' + value.substring(7, 9);
  if (value.length > 9) formattedValue += '-' + value.substring(9, 11);
  
  input.value = formattedValue;
});


// Функция, которая будет срабатывать при пересечении области видимости
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

// Следим за элементом
document.querySelectorAll('.box').forEach(box => {
  observer.observe(box);
});

const upBtn = document.querySelector('.up__btn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 800) {
    upBtn.classList.add('visible');
  } else {
    upBtn.classList.remove('visible');
  }
});

upBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// main.js: Обновления для формы ремонта
document.addEventListener('DOMContentLoaded', function () {
  const steps = document.querySelectorAll('.step');
  const nextButtons = document.querySelectorAll('.next-step');
  const prevButtons = document.querySelectorAll('.prev-step'); // Кнопки "Назад"
  let currentStep = 0;

  let squareMeters = 75; // Значение по умолчанию
  let repairTypeCost = 0; // Стоимость ремонта

  function showStep(stepIndex) {
      steps.forEach((step, index) => {
          step.style.display = index === stepIndex ? 'flex' : 'none';
      });
  }

  function calculateRepairCost() {
      const totalCost = squareMeters * repairTypeCost;
      const repairCostValue = document.getElementById('repair-cost-value');
      repairCostValue.textContent = totalCost.toLocaleString(); // Разделители тысяч
  }

  function finishRepairCost() {
    const modal = document.getElementById('thank-you-modal');
    modal.style.display = 'block'; // Показываем модальное окно

    // Закрытие модального окна при нажатии на кнопку закрытия
    const closeButton = document.querySelector('.close-button');
    closeButton.onclick = function() {
        modal.style.display = 'none';
    }

    // Закрытие модального окна при клике вне его
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
}


  nextButtons.forEach(button => {
      button.addEventListener('click', function () {
          const nextStep = parseInt(button.getAttribute('data-next'), 10) - 1;

          if (currentStep === 1) {
              const areaRange = document.getElementById('areaRange');
              squareMeters = parseInt(areaRange.value, 10) || 0;
          }

          if (currentStep === 2) {
              const selectedRepairType = document.querySelector('input[name="repair_type"]:checked');
              if (selectedRepairType) {
                  repairTypeCost = {
                      designer: 18000,
                      capital: 12000,
                      white_box: 4000,
                  }[selectedRepairType.value] || 0;
              }
          }

          if (nextStep === 5) {
              calculateRepairCost();
          }

          currentStep = nextStep;
          showStep(currentStep);
      });
  });

  // Обработка кнопок "Назад"
  prevButtons.forEach(button => {
    button.addEventListener('click', function () {
        const prevStep = parseInt(button.getAttribute('data-prev'), 10) - 1;
        currentStep = prevStep;
        showStep(currentStep);
    });
});
    // Обработка кнопки "Отправить"
    const finishButton = document.querySelector('.finish-step');
    finishButton.addEventListener('click', finishRepairCost);

  showStep(currentStep); // Показываем начальный шаг
});


document.addEventListener("DOMContentLoaded", function () {
  let lastScrollTop = 0; // Последняя позиция скролла
  const header = document.getElementById("header__fixed"); // Находим меню

  window.addEventListener("scroll", function () {
      let scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
          // Если скроллим вниз — показываем меню
          header.style.height = "70px"; // Меняем высоту на видимую
          header.style.overflow = "visible";
      } else {
          // Если скроллим вверх — скрываем меню
          header.style.height = "0";
          header.style.overflow = "hidden";
      }

      lastScrollTop = scrollTop;
  });
});


