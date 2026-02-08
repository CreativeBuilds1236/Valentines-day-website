const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const questionSection = document.getElementById('questionSection');
const successMessage = document.getElementById('successMessage');
const container = document.querySelector('.container');

// Create floating hearts background
function createFloatingHearts() {
    const heartBg = document.getElementById('heartBg');
    const hearts = ['💕', '💖', '💗', '💝', '💓', '💞'];
    
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 15 + 's';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heartBg.appendChild(heart);
    }
}

createFloatingHearts();

// Make the No button run away from mouse/touch
function moveNoButton() {
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    
    // Calculate maximum positions to keep button within container
    const maxX = containerRect.width - btnRect.width - 40;
    const maxY = 60; // Limit vertical movement
    
    // Generate random position
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

// Move button on hover (desktop)
noBtn.addEventListener('mouseover', moveNoButton);

// Move button on touch/click (mobile)
noBtn.addEventListener('touchstart', function(e) {
    e.preventDefault();
    moveNoButton();
});

noBtn.addEventListener('click', function(e) {
    e.preventDefault();
    moveNoButton();
});

// Handle Yes button click
yesBtn.addEventListener('click', function() {
    // Send email notification
    sendEmailNotification();
    
    // Show success message
    questionSection.style.display = 'none';
    successMessage.classList.add('show');
    
    // Create confetti effect
    createConfetti();
});

// Function to send email notification
function sendEmailNotification() {
    const templateParams = {
        to_email: 'abhinavhome1236@gmail.com',
        message: '💖 SHE SAID YES! 💖 Parukutty accepted your Valentine proposal!',
        date: new Date().toLocaleString()
    };
    
    emailjs.send('service_d60no54', 'template_ofnxtcp', templateParams)
        .then(function(response) {
            console.log('Email sent successfully!', response.status, response.text);
        }, function(error) {
            console.log('Email failed to send:', error);
        });
}

function createConfetti() {
    const colors = ['#ff1493', '#ff69b4', '#ffc0cb', '#ff6347', '#ff4500', '#ffd700'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = -10 + 'px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 30);
    }
}

// Initialize No button position
noBtn.style.position = 'absolute';
noBtn.style.left = '50%';
noBtn.style.transform = 'translateX(50px)';
