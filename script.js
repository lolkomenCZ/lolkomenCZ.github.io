// DATA LOAD
document.addEventListener('DOMContentLoaded', () => {
  fetch('api.php')
    .then(response => {
      if (!response.ok) {
        throw new Error('Chyba při načítání dat z API.');
      }
      return response.json();
    })
    .then(data => {
      const grid = document.getElementById('exhibition-grid');
      const defaultImages = [
        "https://images.unsplash.com/photo-1600522194600-4b2aee08e6f3?q=80",
        "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80",
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80",
        "https://images.unsplash.com/photo-1518998053401-b223c7217e90?q=80"
      ];
      data.forEach((ex, index) => {
        const imgSource = (ex.image && ex.image.trim() !== '') ? ex.image : defaultImages[index % defaultImages.length];
        grid.innerHTML += `
          <div class="exhibition-card">
            <div class="img-placeholder" style="background: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url('${imgSource}') center/cover;">
              <span class="category-tag">${ex.category}</span>
            </div>
            <div class="card-body">
              <h3>${ex.title}</h3>
              <p>${ex.desc}</p>
            </div>
          </div>
        `;
      });
    })
    .catch(error => {
      document.getElementById('exhibition-grid').innerHTML = '<p style="text-align:center; padding: 50px;">Nelze načíst data výstav. Zkontrolujte PHP server.</p>';
    });

  // COUNTDOWN
  const countDownDate = new Date().getTime() + (45 * 24 * 60 * 60 * 1000);
  const countdownTimer = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDownDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("mins").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("secs").innerText = seconds < 10 ? "0" + seconds : seconds;
    if (distance < 0) {
      clearInterval(countdownTimer);
      document.getElementById("countdown").innerHTML = "<div class='time-box'><span style='font-size:2rem;'>OPEN</span></div>";
    }
  }, 1000);

  // CAROUSEL
  const track = document.getElementById('track');
  if (track) {
    const slides = Array.from(track.children);
    const nextButton = document.getElementById('nextBtn');
    const prevButton = document.getElementById('prevBtn');
    let currentIndex = 0;
    const updateCarousel = () => {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    };
    nextButton.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    });
    prevButton.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    });
  }

  // LANGUAGE TOGGLE
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const html = document.documentElement;
      if (html.getAttribute('lang') === 'cs') {
        html.setAttribute('lang', 'en');
        langToggle.textContent = 'CZ';
      } else {
        html.setAttribute('lang', 'cs');
        langToggle.textContent = 'EN';
      }
    });
  }

  // SUBMIT BOOKING
  const bookForm = document.querySelector('.book-form');
  if (bookForm) {
    bookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Rezervace úspěšná! / Booking confirmed!');
      bookForm.reset();
    });
  }
});