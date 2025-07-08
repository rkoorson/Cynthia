function createHearts() {
    const container = document.getElementById('heartsContainer');
    const messageBox = document.getElementById('messageContainer');
    const heartCount = window.innerWidth <= 768 ? 60 : 100; // Menos corazones en móvil
    
    // Posición y tamaño del mensaje
    const messageRect = messageBox.getBoundingClientRect();
    const centerX = messageRect.left + messageRect.width/2;
    const centerY = messageRect.top + messageRect.height/2;
    const orbitRadius = Math.max(messageRect.width, messageRect.height) * 0.8;

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤';
        
        // Tamaño aleatorio
        const size = window.innerWidth <= 768 ? 
            Math.random() * 12 + 10 : 
            Math.random() * 20 + 15;
        heart.style.fontSize = `${size}px`;
        
        // Posición inicial en órbita
        const angle = Math.random() * Math.PI * 2;
        const distance = orbitRadius * (0.7 + Math.random() * 0.3);
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        heart.style.position = 'absolute';
        
        // Animación única para cada corazón
        heart.style.animation = `orbitHeart ${15 + Math.random() * 20}s linear infinite`;
        heart.style.setProperty('--center-x', `${centerX}px`);
        heart.style.setProperty('--center-y', `${centerY}px`);
        heart.style.setProperty('--start-angle`, `${angle}rad`);
        
        container.appendChild(heart);
    }
}

function createParticles() {
    const container = document.getElementById('particlesContainer');
    setInterval(() => {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = '100%';
        const duration = Math.random() * 5 + 3;
        particle.style.animationDuration = `${duration}s`;
        container.appendChild(particle);
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }, 100);
}

const MATRIX_TEXT = "TE AMO";
const matrixColumns = [];
let matrixAnimationId = null;
const columnWidth = 100;

function startMatrixEffect() {
    const container = document.getElementById('matrix-container');
    container.innerHTML = '';
    matrixColumns.length = 0;
    if (matrixAnimationId) {
        cancelAnimationFrame(matrixAnimationId);
        matrixAnimationId = null;
    }
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const COLUMN_COUNT = Math.ceil(screenWidth / columnWidth) + 1;
    const ITEMS_PER_COLUMN = Math.ceil(screenHeight / 40) + 5;
    
    for (let i = 0; i < COLUMN_COUNT; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = `${(i * columnWidth) + Math.random() * 20}px`;
        
        for (let j = 0; j < ITEMS_PER_COLUMN; j++) {
            const item = document.createElement('div');
            item.className = 'matrix-item';
            item.textContent = MATRIX_TEXT;
            column.appendChild(item);
        }
        
        const duration = 5 + Math.random() * 10;
        column.style.animationDuration = `${duration}s`;
        column.style.animationDelay = `${Math.random() * 5}s`;
        column.style.transform = `translateY(${Math.random() * -100}%)`;
        container.appendChild(column);
        
        matrixColumns.push({
            element: column,
            position: Math.random() * -100,
            speed: 0.5 + Math.random() * 2,
            height: column.offsetHeight
        });
    }
    animateMatrix();
}

function animateMatrix() {
    const screenHeight = window.innerHeight;
    matrixColumns.forEach(column => {
        column.position += column.speed;
        if (column.position > screenHeight) {
            column.position = -column.height;
        }
        column.element.style.transform = `translateY(${column.position}px)`;
    });
    matrixAnimationId = requestAnimationFrame(animateMatrix);
}

function stopMatrixEffect() {
    if (matrixAnimationId) {
        cancelAnimationFrame(matrixAnimationId);
        matrixAnimationId = null;
    }
}

function createPaintEffect(e) {
    if (!document.getElementById('matrix-container').classList.contains('active')) return;
    
    const paintContainer = document.getElementById('paint-effect');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('paint-particle');
        particle.textContent = MATRIX_TEXT;
        const size = 16 + Math.random() * 20;
        particle.style.fontSize = `${size}px`;
        particle.style.left = `${e.clientX}px`;
        particle.style.top = `${e.clientY}px`;
        
        const angle = Math.random() * Math.PI * 2;
        const distance = 100 + Math.random() * 300;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        
        const duration = 0.8 + Math.random() * 0.7;
        particle.style.animationDuration = `${duration}s`;
        paintContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    // Llama a createHearts después de que el mensaje esté posicionado
    setTimeout(createHearts, 100); 
    
    // Vuelve a generar corazones al redimensionar
    window.addEventListener('resize', () => {
        document.getElementById('heartsContainer').innerHTML = '';
        setTimeout(createHearts, 100);
    });
});
    
    hiddenImage.addEventListener('click', function() {
        this.classList.remove('active');
        messageContainer.classList.remove('hidden-message');
        matrixContainer.classList.remove('active');
        stopMatrixEffect();
    });
    
    document.body.addEventListener('click', function initAudio() {
        const audio = document.getElementById('romanticAudio');
        audio.play().catch(e => console.log("Audio: ", e));
        document.body.removeEventListener('click', initAudio);
    }, { once: true });
    
    document.addEventListener('click', createPaintEffect);
});

window.addEventListener('resize', () => {
    stopMatrixEffect();
    if (document.getElementById('matrix-container').classList.contains('active')) {
        startMatrixEffect();
    }
});
