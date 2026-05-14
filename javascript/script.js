document.addEventListener('DOMContentLoaded', () => {
  const defaultImages = ['img/egypt.jpg', 'img/art.jpg', 'img/space.jpg', 'img/dino.jpg'];
  
  fetch('php/api.php')
    .then(response => {
      if (!response.ok) {
        throw new Error('Chyba');
      }
      return response.json();
    })
    .then(data => {
      const grid = document.getElementById('exhibition-grid');
      data.forEach((ex, index) => {
        const imgSource = (ex.image && ex.image.trim() !== '') ? ex.image : defaultImages[index % defaultImages.length];
        grid.innerHTML += `
          <div class="exhibition-card">
            <div class="img-placeholder" style="background: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.5)), url('${imgSource}') center/cover; background-size: cover; background-position: center; background-repeat: no-repeat;">
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
      document.getElementById('exhibition-grid').innerHTML = '<p class="error-message">Nelze načíst data výstav.</p>';
    });

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
      document.getElementById("countdown").innerHTML = "<div class='time-box'><span class='open-text'>OPEN</span></div>";
    }
  }, 1000);

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

  const bookForm = document.getElementById('booking-form');
  const successMessage = document.getElementById('booking-success');
  const newBookingBtn = document.getElementById('new-booking-btn');

  if (bookForm && successMessage && newBookingBtn) {
    bookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(bookForm);
      
      fetch('php/book.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.text())
      .then(data => {
        bookForm.style.display = 'none';
        successMessage.style.display = 'block';
        bookForm.reset();
      })
      .catch(error => {
        bookForm.style.display = 'none';
        successMessage.style.display = 'block';
        bookForm.reset();
      });
    });

    newBookingBtn.addEventListener('click', () => {
      successMessage.style.display = 'none';
      bookForm.style.display = 'grid';
    });
  }
});