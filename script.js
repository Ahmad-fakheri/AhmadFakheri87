document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('videoModal');
  const modalIframe = document.getElementById('modalIframe');
  const closeBtn = document.querySelector('.close-btn');

  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const iframe = card.querySelector('iframe');
      if (!iframe) return; // اگر iframe نبود، ادامه نده

      const videoSrc = iframe.getAttribute('src');
      if (!videoSrc) return; // اگر src نداشت، ادامه نده

      // تبدیل لینک به فرمت embed با autoplay
      let embedUrl = videoSrc;
      if (!embedUrl.includes('autoplay')) {
        embedUrl += (embedUrl.includes('?') ? '&' : '?') + 'autoplay=1';
      }

      modalIframe.setAttribute('src', embedUrl);
      modal.classList.add('active');
    });
  });

  // بستن با دکمه ضربدر
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    modalIframe.setAttribute('src', '');
  });

  // بستن با کلیک بیرون از مودال
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      modalIframe.setAttribute('src', '');
    }
  });
});

// انتخاب المنت‌ها
const modalContent = document.querySelector('.modal-content');
const videoModal = document.querySelector('.video-modal');

// گوش دادن به حرکت موس
document.addEventListener('mousemove', (e) => {
  if (!videoModal.classList.contains('active')) return;

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const mouseX = (e.clientX / windowWidth) - 0.5;
  const mouseY = (e.clientY / windowHeight) - 0.5;

  const offsetX = -mouseX * 30;
  const offsetY = -mouseY * 30;

  modalContent.style.transform = `translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px)`;
});

// مدیریت باز و بسته شدن مودال
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    videoModal.classList.add('active');
    const iframe = modalContent.querySelector('iframe');
    iframe.src = card.querySelector('iframe').src;
  });
});

videoModal.addEventListener('click', (e) => {
  if (e.target.classList.contains('close-btn') || e.target.classList.contains('video-modal')) {
    modalContent.style.transform = `translate(-50%, -50%)`;
    videoModal.classList.remove('active');
    modalContent.querySelector('iframe').src = '';
  }
});