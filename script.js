lottie.loadAnimation({
    container: document.getElementById('partyLottie'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '/assets/lottie/party2.json'
});

// Countdown Timer
const countdownDate = new Date("July 05, 2025 20:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days.toString().padStart(2, '0');
    document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
    document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Navigation dots
const sections = document.querySelectorAll('.section');
const navDots = document.querySelectorAll('.nav-dot');
const container = document.getElementById('main-container');
const revealElements = document.querySelectorAll('.reveal-text');

function setActiveSection() {
    const scrollPosition = container.scrollTop;

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop - 100 && scrollPosition < sectionTop + sectionHeight - 100) {
            navDots.forEach(dot => dot.classList.remove('active'));
            navDots[index].classList.add('active');
        }
    });

    // Reveal elements when they come into view
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight * 0.85) {
            el.classList.add('active');
        }
    });
}

container.addEventListener('scroll', setActiveSection);

navDots.forEach(dot => {
    dot.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        container.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
        });
    });
});

// RSVP Form
const rsvpForm = document.getElementById('rsvpForm');
const confirmationMessage = document.getElementById('confirmationMessage');
const attendanceRadios = document.querySelectorAll('input[name="attendance"]');
const guestsField = document.getElementById('guestsField');

attendanceRadios.forEach(radio => {
    radio.addEventListener('change', function () {
        if (this.value === 'yes') {
            guestsField.style.display = 'block';
        } else {
            guestsField.style.display = 'none';
        }
    });
});


function showSuccessModal() {
    const modal = document.getElementById("successModal");
    modal.classList.remove("hidden");
    setTimeout(closeSuccessModal, 3000); // Cierra automáticamente después de 3 segundos
}

function closeSuccessModal() {
    const modal = document.getElementById("successModal");
    modal.classList.add("hidden");
}
// rsvpForm.addEventListener('submit', function(e) {
//     e.preventDefault();

//     // Simple form validation
//     const name = document.getElementById('name').value;
//     const phone = document.getElementById('phone').value;

//     if (name && phone) {
//         rsvpForm.style.display = 'none';
//         confirmationMessage.style.display = 'block';
//         confirmationMessage.classList.add('animate__animated', 'animate__fadeIn');
//     }
// });

// Song suggestion form
const songForm = document.getElementById('songForm');
const songList = document.getElementById('songList');

songForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('songTitle').value;
    const artist = document.getElementById('songArtist').value;

    if (title && artist) {
        // Create new song item
        const songItem = document.createElement('div');
        songItem.className = 'song-item bg-white bg-opacity-30 rounded-lg p-3 flex items-center glow-on-hover';
        songItem.style.opacity = '0';
        songItem.style.transform = 'translateY(20px)';
        songItem.innerHTML = `
                    <div class="bg-white rounded-full p-2 mr-3">
                        <i class="fas fa-music text-purple-800"></i>
                    </div>
                    <div>
                        <h4 class="font-semibold">${title}</h4>
                        <p class="text-sm">${artist}</p>
                    </div>
                `;

        // Add to list
        songList.prepend(songItem);

        // Animate the new item
        setTimeout(() => {
            songItem.style.transition = 'all 0.5s ease';
            songItem.style.opacity = '1';
            songItem.style.transform = 'translateY(0)';
        }, 10);

        // Clear form
        document.getElementById('songTitle').value = '';
        document.getElementById('songArtist').value = '';
        document.getElementById('songMessage').value = '';
    }
});

// Music toggle
const musicModal = document.getElementById('musicModal');
const activateMusicBtn = document.getElementById('activateMusicBtn');
const noMusicBtn = document.getElementById('noMusicBtn');
const backgroundMusic = document.getElementById('backgroundMusic');
const musicToggle = document.getElementById('musicToggle');
let isPlaying = false;

// 1. Mostrar modal al cargar (solo si el autoplay falla o es la primera vez)
document.addEventListener('DOMContentLoaded', () => {
  const isMusicDisabled = localStorage.getItem('musicDisabled') === 'true';
  
  if (!isMusicDisabled) {
    backgroundMusic.volume = 0.5;
    backgroundMusic.muted = true; // Autoplay muteado para cumplir políticas

    backgroundMusic.play()
      .then(() => {
        musicModal.style.display = 'none'; // Ocultar si el autoplay funciona
      })
      .catch(() => {
        musicModal.style.display = 'flex'; // Mostrar modal si falla
      });
  }
});

// 2. Al elegir "Sí, activar música"
activateMusicBtn.addEventListener('click', () => {
  backgroundMusic.muted = false;
  backgroundMusic.play()
    .then(() => {
      musicModal.style.display = 'none';
      musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
      isPlaying = true;
      localStorage.removeItem('musicDisabled'); // Guardar preferencia
    });
});

// 3. Al elegir "No, sin música"
noMusicBtn.addEventListener('click', () => {
  musicModal.style.display = 'none';
  musicToggle.style.opacity = '0.5'; // Atenuar botón de música
  musicToggle.style.pointerEvents = 'none'; // Deshabilitar clics
  localStorage.setItem('musicDisabled', 'true'); // Guardar preferencia
});

// 4. Control normal con el botón de música (si no está desactivado)
musicToggle.addEventListener('click', () => {
  if (isPlaying) {
    backgroundMusic.pause();
    musicToggle.innerHTML = '<i class="fas fa-music"></i>';
  } else {
    backgroundMusic.play();
    musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
  }
  isPlaying = !isPlaying;
});

// 3. Control normal con el botón de música
musicToggle.addEventListener('click', () => {
  if (isPlaying) {
    backgroundMusic.pause();
    musicToggle.innerHTML = '<i class="fas fa-music"></i>';
  } else {
    backgroundMusic.play();
    musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
  }
  isPlaying = !isPlaying;
});
//luvia de corazones 

// Particles effect
function createParticles() {
    const particlesContainer = document.getElementById('particles-container');
    const numParticles = 50;

    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;

        // Random size
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Random opacity
        particle.style.opacity = Math.random() * 0.5 + 0.3;

        // Animation
        const duration = Math.random() * 20 + 10;
        particle.style.animation = `float ${duration}s ease-in-out infinite`;
        particle.style.animationDelay = `${Math.random() * 5}s`;

        particlesContainer.appendChild(particle);
    }
}

// Create floating hearts
function createFloatingHearts(containerId, count) {
    const container = document.getElementById(containerId);

    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';

        // Random position
        const posX = Math.random() * 100;
        heart.style.left = `${posX}%`;

        // Random size
        const size = Math.random() * 10 + 5;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;

        // Random color
        const hue = Math.random() * 60 + 300; // Purple to pink range
        const lightness = Math.random() * 20 + 70; // Light colors
        heart.style.backgroundColor = `hsla(${hue}, 100%, ${lightness}%, 0.6)`;
        heart.style.boxShadow = `0 0 10px hsla(${hue}, 100%, ${lightness}%, 0.4)`;

        // Random animation duration
        const duration = Math.random() * 10 + 10;
        heart.style.animation = `floatHeart ${duration}s linear infinite`;
        heart.style.animationDelay = `${Math.random() * 10}s`;

        container.appendChild(heart);
    }
}



const container1 = document.querySelector('.falling-hearts');

const heartCount = 25; // cantidad de corazones

for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');

    // posición horizontal aleatoria
    heart.style.left = Math.random() * 100 + 'vw';

    // delay y duración aleatorios para que caigan de forma natural
    const delay = Math.random() * 10; // segundos
    const duration = 8 + Math.random() * 7; // entre 8 y 15 segundos

    heart.style.animationDelay = delay + 's';
    heart.style.animationDuration = duration + 's';

    container.appendChild(heart);
}

// Initialize animations
window.addEventListener('load', function () {
    createParticles();
    createFloatingHearts('floating-hearts-fecha', 15);
    createFloatingHearts('floating-hearts-canciones', 15);
    createFloatingHearts('floating-hearts-rsvp', 15);

    // Initial check for visible elements
    setTimeout(setActiveSection, 100);

    // Add ripple effect to buttons
    document.querySelectorAll('.ripple').forEach(button => {
        button.addEventListener('click', function (e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;

            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.width = '0';
            ripple.style.height = '0';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.background = 'rgba(255, 255, 255, 0.4)';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.style.width = '300px';
                ripple.style.height = '300px';
                ripple.style.opacity = '0';
                ripple.style.transition = 'all 0.6s ease-out';
            }, 10);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});