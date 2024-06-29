document.addEventListener("DOMContentLoaded", function () {
  // Обробка відео
  const buttons = document.querySelectorAll(".play-button");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const videoId = this.getAttribute("data-video");
      const video = document.getElementById(videoId);

      if (video.paused) {
        video.play();
        this.textContent = "Зупинити відео";
      } else {
        video.pause();
        this.textContent = "Відтворити відео";
      }
    });
  });

  // Обробка форми замовлення
  const orderButton = document.querySelector(".order-button");
  const orderFormContainer = document.getElementById("order-form-container");
  const orderForm = document.getElementById("order-form");
  const orderMessage = document.getElementById("order-message");

  orderButton.addEventListener("click", function () {
    orderFormContainer.classList.remove("hidden");
  });

  orderForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const lastName = document.getElementById("last-name").value;
    const firstName = document.getElementById("first-name").value;
    const middleName = document.getElementById("middle-name").value;
    const phoneNumber = document.getElementById("phone-number").value;

    const message = `Нове замовлення:\nПрізвище: ${lastName}\nІм'я: ${firstName}\nПо батькові: ${middleName}\nНомер телефону: ${phoneNumber}`;

    fetch(
      `https://api.telegram.org/bot<YOUR_TELEGRAM_BOT_TOKEN>/sendMessage?chat_id=<YOUR_TELEGRAM_CHAT_ID>&text=${encodeURIComponent(
        message
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        orderMessage.classList.remove("hidden");
        setTimeout(() => {
          orderFormContainer.classList.add("hidden");
          orderForm.reset();
          orderMessage.classList.add("hidden");
        }, 3000);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Виникла помилка при відправленні замовлення. Спробуйте ще раз.");
      });
  });

  // Обробка форми швидкого замовлення
  const quickOrderButton = document.querySelector(".order-button-footer");
  const quickOrderFormContainer = document.getElementById(
    "quick-order-form-container"
  );
  const quickOrderForm = document.getElementById("quick-order-form");
  const quickOrderMessage = document.getElementById("quick-order-message");

  quickOrderButton.addEventListener("click", function () {
    quickOrderFormContainer.classList.remove("hidden");
  });

  quickOrderForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const quickPhoneNumber =
      document.getElementById("quick-phone-number").value;

    const quickMessage = `Нове швидке замовлення:\nНомер телефону: ${quickPhoneNumber}`;

    fetch(
      `https://api.telegram.org/bot<YOUR_TELEGRAM_BOT_TOKEN>/sendMessage?chat_id=<YOUR_TELEGRAM_CHAT_ID>&text=${encodeURIComponent(
        quickMessage
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        quickOrderMessage.classList.remove("hidden");
        setTimeout(() => {
          quickOrderFormContainer.classList.add("hidden");
          quickOrderForm.reset();
          quickOrderMessage.classList.add("hidden");
        }, 3000);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Виникла помилка при відправленні замовлення. Спробуйте ще раз.");
      });
  });

  // Автоматична зміна слайдів галереї
  const slides = document.querySelectorAll(".slide");
  const slidesContainer = document.querySelector(".slides-container");
  let currentSlide = 0;
  const totalSlides = slides.length;

  function showSlide(index) {
    slidesContainer.style.transform = `translateX(-${100 * index}%)`;
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }

  showSlide(currentSlide);
  setInterval(nextSlide, 3000); // Змінює слайд кожні 3 секунди
});
