const questions = [
    "Do you remember our amazing week together at the marriage?",
    "Those 10-12 hours in the bus returning home were perfect for me, were they for you too?",
    "Can we have more journeys like that where we talk about everything?",
    "27th August 2025 - Ganpati at my home. The day I first saw you. Do you remember it too?",
    "That day I knew I loved you. Did you notice how I couldn't stop looking at you?",
    "Can we make more memories like that magical week we spent together?",
    "Do you think about our bus conversations as much as I think about them?",
    "Will you let me create more special moments with you?",
    "Can I prove that my feelings from 27th August 2025 are real and lasting?",
    "Will you take a chance on us and let me love you like I've wanted since that first day?"
];

let currentQuestion = 0;
let noButtonClicks = 0;
let yesButtonSize = 1;

const questionText = document.getElementById('questionText');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const questionCard = document.getElementById('questionCard');
const loveLetter = document.getElementById('loveLetter');
const progressBar = document.getElementById('progressBar');
const progressHearts = document.getElementById('progressHearts');
const progressText = document.getElementById('progressText');
const musicBtn = document.getElementById('musicBtn');
const backgroundMusic = document.getElementById('backgroundMusic');
const starsContainer = document.getElementById('starsContainer');
const particlesContainer = document.getElementById('particlesContainer');

function createStars() {
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = Math.random() * 4 + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 4 + 's';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        starsContainer.appendChild(star);
    }
    
    // Add van Gogh swirling stars
    for (let i = 0; i < 30; i++) {
        const swirlStar = document.createElement('div');
        swirlStar.className = 'swirl-star';
        swirlStar.style.left = Math.random() * 100 + '%';
        swirlStar.style.top = Math.random() * 100 + '%';
        swirlStar.style.animationDelay = Math.random() * 15 + 's';
        swirlStar.style.animationDuration = (Math.random() * 10 + 10) + 's';
        starsContainer.appendChild(swirlStar);
    }
    
    // Add cypress tree
    const cypressTree = document.createElement('div');
    cypressTree.className = 'cypress-tree';
    document.body.appendChild(cypressTree);
}

function createParticles(x, y) {
    const colors = ['#ff6b6b', '#e91e63', '#ff1744', '#f50057', '#ff4081', '#ffffff'];
    const shapes = ['❤️', '💕', '💖', '💗', '💝', '✨', '⭐', '💞', '💓', '💘'];
    const particleCount = 25; // Reduced from 50
    const fragment = document.createDocumentFragment();
    const particles = [];
    
    // Create all particles at once
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.innerHTML = shapes[Math.floor(Math.random() * shapes.length)];
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.fontSize = Math.random() * 20 + 12 + 'px';
        
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = Math.random() * 150 + 80;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity - 80;
        
        particle.style.setProperty('--vx', vx + 'px');
        particle.style.setProperty('--vy', vy + 'px');
        
        fragment.appendChild(particle);
        particles.push(particle);
    }
    
    // Append all particles at once
    particlesContainer.appendChild(fragment);
    
    // Remove all particles after animation
    setTimeout(() => {
        particles.forEach(particle => {
            if (particle.parentNode) {
                particle.remove();
            }
        });
    }, 2500);
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressHearts.style.width = progress + '%';
    progressText.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    
    progressHearts.innerHTML = '';
    const filledHearts = Math.floor((currentQuestion + 1) / questions.length * questions.length);
    for (let i = 0; i < questions.length; i++) {
        const heart = document.createElement('span');
        heart.className = 'heart-progress';
        heart.textContent = i < filledHearts ? '❤️' : '🤍';
        progressHearts.appendChild(heart);
    }
}

function toggleMusic() {
    const audio = document.getElementById('backgroundMusic');
    const musicBtn = document.getElementById('musicBtn');
    
    if (audio.paused) {
        // Try to play the audio
        audio.play().then(() => {
            musicBtn.textContent = '🔇 Pause Music';
            musicBtn.classList.add('playing');
            console.log('Romantic music started playing');
            createParticles(window.innerWidth / 2, 100); // Celebration particles!
        }).catch(error => {
            console.log('Music play failed:', error);
            alert('🎵 Click the music button once more to start the romantic melody!');
            // Try alternative approach
            audio.muted = false;
            audio.volume = 0.4;
        });
    } else {
        audio.pause();
        musicBtn.textContent = '🎵 Play Music';
        musicBtn.classList.remove('playing');
        console.log('Music paused');
    }
}

function createConfetti() {
    const colors = ['#ff6b6b', '#e91e63', '#ff1744', '#f50057', '#ff4081', '#4caf50', '#2196f3', '#ff9800'];
    const confettiCount = 100; // Reduced from 200
    const fragment = document.createDocumentFragment();
    const confettiElements = [];
    
    // Create all confetti at once
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '12px';
        confetti.style.height = '12px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-12px';
        confetti.style.opacity = '1';
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.transition = 'all 3s ease-out';
        confetti.style.zIndex = '10000';
        confetti.style.pointerEvents = 'none';
        
        fragment.appendChild(confetti);
        confettiElements.push(confetti);
    }
    
    // Append all confetti at once
    document.body.appendChild(fragment);
    
    // Animate all confetti after a short delay
    requestAnimationFrame(() => {
        confettiElements.forEach(confetti => {
            confetti.style.top = '100%';
            confetti.style.transform = `rotate(${Math.random() * 720}deg)`;
            confetti.style.opacity = '0';
        });
    });
    
    // Remove all confetti after animation
    setTimeout(() => {
        confettiElements.forEach(confetti => {
            if (confetti.parentNode) {
                confetti.remove();
            }
        });
    }, 3000);
}

function moveNoButton() {
    const container = document.querySelector('.buttons-container');
    const containerRect = container.getBoundingClientRect();
    
    const maxX = containerRect.width - noBtn.offsetWidth;
    const maxY = containerRect.height - noBtn.offsetHeight;
    
    let randomX, randomY;
    let attempts = 0;
    const maxAttempts = 100;
    
    do {
        randomX = Math.random() * maxX;
        randomY = Math.random() * maxY;
        attempts++;
    } while (attempts < maxAttempts && isOverlapping(randomX, randomY, containerRect));
    
    noBtn.style.position = 'absolute';
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
    
    noButtonClicks++;
    
    yesButtonSize = Math.min(yesButtonSize + 0.2, 2.5);
    
    yesBtn.style.transform = `scale(${yesButtonSize})`;
    
    if (noButtonClicks >= 3) {
        noBtn.textContent = 'Pretty please? 🥺';
    }
    if (noButtonClicks >= 5) {
        noBtn.textContent = 'I\'ll be sad 😢';
    }
    if (noButtonClicks >= 7) {
        noBtn.textContent = 'Just say yes! 💕';
    }
}

function isOverlapping(noX, noY, containerRect) {
    const noBtnWidth = noBtn.offsetWidth;
    const noBtnHeight = noBtn.offsetHeight;
    const yesBtnWidth = yesBtn.offsetWidth;
    const yesBtnHeight = yesBtn.offsetHeight;
    
    // Yes button is always positioned relatively in the center
    const yesLeft = (containerRect.width - yesBtnWidth) / 2;
    const yesRight = yesLeft + yesBtnWidth;
    const yesTop = (containerRect.height - yesBtnHeight) / 2;
    const yesBottom = yesTop + yesBtnHeight;
    
    // No button absolute position within container
    const noLeft = noX;
    const noRight = noLeft + noBtnWidth;
    const noTop = noY;
    const noBottom = noTop + noBtnHeight;
    
    const margin = 15; // Increased margin for better separation
    
    return !(noRight + margin < yesLeft || 
             noLeft - margin > yesRight || 
             noBottom + margin < yesTop || 
             noTop - margin > yesBottom);
}

function nextQuestion() {
    currentQuestion++;
    noButtonClicks = 0;
    yesButtonSize = 1;
    
    yesBtn.style.transform = `scale(${yesButtonSize})`;
    noBtn.textContent = 'No';
    noBtn.style.position = 'relative';
    noBtn.style.left = '0';
    noBtn.style.top = '0';
    
    updateProgress();
    
    if (currentQuestion >= questions.length) {
        showLoveLetter();
    } else {
        questionText.textContent = questions[currentQuestion];
        
        questionCard.style.animation = 'none';
        setTimeout(() => {
            questionCard.style.animation = 'fadeIn 0.5s ease-in';
        }, 10);
    }
}

function showLoveLetter() {
    console.log('Showing love letter...');
    
    // Use requestAnimationFrame to avoid forced reflow
    requestAnimationFrame(() => {
        questionCard.style.display = 'none';
        loveLetter.style.display = 'block';
        
        // Ensure buttons are visible
        const restartBtn = document.querySelector('.restart-btn');
        const downloadBtn = document.querySelector('.download-btn');
        if (restartBtn) restartBtn.style.display = 'inline-block';
        if (downloadBtn) downloadBtn.style.display = 'inline-block';
        
        // Stagger animations to prevent performance spikes
        setTimeout(() => createConfetti(), 100);
        setTimeout(() => createHeartExplosion(), 400);
    });
}

function restartQuiz() {
    currentQuestion = 0;
    noButtonClicks = 0;
    yesButtonSize = 1;
    
    questionText.textContent = questions[0];
    questionCard.style.display = 'block';
    loveLetter.style.display = 'none';
    
    yesBtn.style.transform = `scale(${yesButtonSize})`;
    noBtn.textContent = 'No';
    noBtn.style.position = 'relative';
    noBtn.style.left = '0';
    noBtn.style.top = '0';
    
    updateProgress();
}

yesBtn.addEventListener('click', (e) => {
    const rect = yesBtn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    createParticles(x, y);
    nextQuestion();
});

noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
});

noBtn.addEventListener('mouseenter', (e) => {
    if (noButtonClicks > 0) {
        moveNoButton();
    }
});

musicBtn.addEventListener('click', toggleMusic);

document.addEventListener('DOMContentLoaded', () => {
    createStars();
    updateProgress();
    
    // Set up audio for better compatibility
    const audio = document.getElementById('backgroundMusic');
    audio.volume = 0.4; // Set volume to 40% for romantic ambiance
    audio.muted = false;
    
    // Try to preload audio
    audio.load();
    
    console.log('Romantic music loaded and ready to play');
});

function createHeartExplosion() {
    const container = document.querySelector('.container');
    const colors = ['#ff6b6b', '#e91e63', '#ff1744', '#f50057', '#ff4081'];
    const heartShapes = ['❤️', '💕', '💖', '💗', '💝', '💞', '💓', '💘'];
    const fragment = document.createDocumentFragment();
    const hearts = [];
    
    // Create all hearts at once
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        const randomShape = heartShapes[Math.floor(Math.random() * heartShapes.length)];
        
        heart.innerHTML = randomShape;
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.top = window.innerHeight + 'px';
        heart.style.fontSize = Math.random() * 20 + 15 + 'px';
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];
        heart.style.zIndex = '1000';
        heart.style.pointerEvents = 'none';
        heart.style.animation = `heartFloat ${Math.random() * 3 + 2}s ease-out forwards`;
        
        fragment.appendChild(heart);
        hearts.push(heart);
    }
    
    // Append all hearts at once
    document.body.appendChild(fragment);
    
    // Remove all hearts after animation
    setTimeout(() => {
        hearts.forEach(heart => {
            if (heart.parentNode) {
                heart.remove();
            }
        });
    }, 5000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes heartFloat {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

function downloadWebsite() {
    const htmlContent = document.documentElement.outerHTML;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'valentine-love-letter-forever.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    createParticles(window.innerWidth / 2, window.innerHeight / 2);
    
    setTimeout(() => {
        alert('💕 Downloaded! You can now open this file anytime to remember our special moments. Save it somewhere safe!');
    }, 1000);
}

window.downloadWebsite = downloadWebsite;
window.restartQuiz = restartQuiz;
