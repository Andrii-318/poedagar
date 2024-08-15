document.addEventListener("DOMContentLoaded", function () {
  // Facebook Pixel Code
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(
    window,
    document,
    "script",
    "https://connect.facebook.net/en_US/fbevents.js"
  );
  fbq("init", "783242727012354");
  fbq("track", "PageView");

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
  const closeButton = document.getElementById("close-button");

  orderButton.addEventListener("click", function () {
    orderFormContainer.classList.remove("hidden");
  });

  closeButton.addEventListener("click", function () {
    orderFormContainer.classList.add("hidden");
  });

  orderForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const lastName = document.getElementById("last-name").value;
    const firstName = document.getElementById("first-name").value;
    const middleName = document.getElementById("middle-name").value;
    const phoneNumber = document.getElementById("phone-number").value;
    const city = document.getElementById("city").value;
    const region = document.getElementById("region").value;
    const postOffice = document.getElementById("post-office").value;
    const dialColor = document.querySelector(
      'input[name="dial-color"]:checked'
    ).value;

    const message = `Нове замовлення:\nПрізвище: ${lastName}\nІм'я: ${firstName}\nПо батькові: ${middleName}\nНомер телефону: ${phoneNumber}\nНаселений пункт: ${city}\nОбласть: ${region}\nНомер відділення "Нової Пошти": ${postOffice}\nЦиферблат: ${dialColor}`;

    fetch(
      `https://api.telegram.org/bot7383790369:?chat_id=2&text=${encodeURIComponent(
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
  const quickCloseButton = document.getElementById("quick-close-button");

  quickOrderButton.addEventListener("click", function () {
    quickOrderFormContainer.classList.remove("hidden");
  });

  quickCloseButton.addEventListener("click", function () {
    quickOrderFormContainer.classList.add("hidden");
  });

  quickOrderForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const quickPhoneNumber =
      document.getElementById("quick-phone-number").value;
    const quickMessage = `Нове швидке замовлення:\nНомер телефону: ${quickPhoneNumber}`;

    fetch(
      `https://api.telegram.org/bot7383790369:/sendMessage?chat_id=&text=${encodeURIComponent(
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

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
  }

  let autoSlideInterval = setInterval(nextSlide, 3000);

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  document.getElementById("next-slide").addEventListener("click", function () {
    stopAutoSlide();
    nextSlide();
  });

  document.getElementById("prev-slide").addEventListener("click", function () {
    stopAutoSlide();
    prevSlide();
  });

  showSlide(currentSlide);
});
