// Создание анимированного фона
function createBackground() {
    const bgAnimation = document.getElementById('bgAnimation');
    if (!bgAnimation) return;
    
    const colors = ['#ff8c00', '#ffa500', '#ffd700', '#ffed4e'];
    
    for (let i = 0; i < 25; i++) {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        
        const size = Math.random() * 120 + 60;
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;
        
        circle.style.left = `${Math.random() * 100}%`;
        circle.style.top = `${Math.random() * 100}%`;
        
        circle.style.background = colors[Math.floor(Math.random() * colors.length)];
        circle.style.opacity = Math.random() * 0.3 + 0.1;
        
        const duration = Math.random() * 25 + 15;
        circle.style.animationDuration = `${duration}s`;
        circle.style.animationDelay = `${Math.random() * 5}s`;
        
        bgAnimation.appendChild(circle);
    }
}

// Игра 1: Кликер
let clickerScore = 0;
function incrementScore() {
    clickerScore++;
    const scoreElement = document.getElementById('clickerScore');
    if (scoreElement) {
        scoreElement.textContent = clickerScore;
    }
    
    // Анимация кнопки
    const btn = event.target;
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        btn.style.transform = 'scale(1)';
    }, 100);
}

// Игра 2: Угадай цвет
const colors = ['красный', 'оранжевый', 'желтый', 'зеленый', 'синий', 'фиолетовый'];
const colorValues = {
    'красный': '#FF0000',
    'оранжевый': '#FF8C00',
    'желтый': '#FFD700',
    'зеленый': '#00FF00',
    'синий': '#0000FF',
    'фиолетовый': '#800080'
};

let currentColor = '';
let currentColorName = '';

function generateRandomColor() {
    const colorBox = document.getElementById('colorBox');
    if (!colorBox) return;
    
    const randomIndex = Math.floor(Math.random() * colors.length);
    currentColorName = colors[randomIndex];
    currentColor = colorValues[currentColorName];
    colorBox.style.backgroundColor = currentColor;
}

function checkColor(isOrange) {
    const resultElement = document.getElementById('colorResult');
    if (!resultElement) return;
    
    if ((isOrange && currentColorName === 'оранжевый') || 
        (!isOrange && currentColorName !== 'оранжевый')) {
        resultElement.textContent = 'Правильно!';
        resultElement.style.color = 'green';
    } else {
        resultElement.textContent = 'Неправильно!';
        resultElement.style.color = 'red';
    }
    
    setTimeout(() => {
        resultElement.textContent = '-';
        resultElement.style.color = 'var(--primary)';
    }, 1500);
    
    generateRandomColor();
}

// Игра 3: Тест на реакцию
let reactionStartTime = 0;
let reactionTestActive = false;

function startReactionTest() {
    const reactionBox = document.getElementById('reactionBox');
    const reactionTimeElement = document.getElementById('reactionTime');
    if (!reactionBox || !reactionTimeElement) return;
    
    reactionBox.style.backgroundColor = '#FF8C00';
    reactionTimeElement.textContent = '0';
    reactionTestActive = false;
    
    // Случайная задержка перед изменением цвета
    const delay = Math.random() * 4000 + 1000; // от 1 до 5 секунд
    setTimeout(() => {
        if (!reactionTestActive) {
            reactionBox.style.backgroundColor = '#FFD700';
            reactionStartTime = new Date().getTime();
            reactionTestActive = true;
        }
    }, delay);
}

function reactionTest() {
    if (!reactionTestActive) {
        alert('Слишком рано! Дождитесь смены цвета.');
        return;
    }
    
    const reactionEndTime = new Date().getTime();
    const reactionTime = reactionEndTime - reactionStartTime;
    const reactionTimeElement = document.getElementById('reactionTime');
    const reactionBox = document.getElementById('reactionBox');
    
    if (!reactionTimeElement || !reactionBox) return;
    
    reactionTimeElement.textContent = reactionTime;
    reactionTestActive = false;
    
    // Изменяем цвет обратно
    reactionBox.style.backgroundColor = '#FF8C00';
    
    // Сообщение о результате
    let message = '';
    if (reactionTime < 200) message = 'Невероятно!';
    else if (reactionTime < 300) message = 'Отлично!';
    else if (reactionTime < 500) message = 'Хорошо!';
    else message = 'Можно лучше!';
    
    setTimeout(() => {
        alert(`${message} Ваше время реакции: ${reactionTime} мс`);
    }, 300);
}

// Игра 4: Игра на память
let memorySequence = [];
let memoryLevel = 1;
let memoryPlayerTurn = false;
let memoryCurrentStep = 0;
let memoryCards = [];

function startMemoryGame() {
    const memoryGrid = document.getElementById('memoryGrid');
    const memoryLevelElement = document.getElementById('memoryLevel');
    if (!memoryGrid || !memoryLevelElement) return;
    
    memorySequence = [];
    memoryLevel = 1;
    memoryPlayerTurn = false;
    memoryCurrentStep = 0;
    memoryLevelElement.textContent = memoryLevel;
    
    // Создаем сетку для игры
    memoryGrid.innerHTML = '';
    memoryCards = [];
    
    // Создаем пары карточек
    const symbols = ['🍊', '🎮', '🚀', '⭐', '🔥', '💡', '🎯', '🏆'];
    const cardValues = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < 16; i++) {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.textContent = '?';
        card.dataset.index = i;
        card.dataset.value = cardValues[i];
        card.addEventListener('click', () => memoryCardClick(i));
        memoryGrid.appendChild(card);
        memoryCards.push(card);
    }
    
    // Начинаем игру
    setTimeout(() => {
        generateMemorySequence();
        playMemorySequence();
    }, 1000);
}

function generateMemorySequence() {
    memory