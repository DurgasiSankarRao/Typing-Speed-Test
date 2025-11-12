const sentences = [
`The sun rises over the quiet town, and people begin their day with calm energy. Birds fly across the bright sky, singing sweet melodies that make the morning peaceful. Children pack their school bags, while parents prepare breakfast and talk softly about their plans. A cool breeze moves the leaves, and the smell of tea spreads through the air. The streets slowly fill with people walking, smiling, and greeting each other. It is a gentle start that brings warmth, joy, and a sense of hope for the day ahead.`,
`Learning to type fast takes patience, focus, and daily practice. At first, your fingers may feel slow and clumsy, but with regular effort, speed will improve. Keep your eyes on the screen, not the keyboard, and let your mind guide your hands. Accuracy matters more than speed in the beginning, so take time to build correct habits. Once accuracy becomes natural, speed follows easily. A few minutes every day can make a big difference in your typing confidence and rhythm.`,
`Nature has a calm power that can heal and refresh the mind. When you walk through green fields or sit beside a river, you feel peace inside your heart. The sound of flowing water and the gentle rustle of trees bring balance to your thoughts. Every sunrise gives new light, and every sunset teaches you to rest. Spending time in nature reminds us that everything grows at its own pace and that patience leads to beauty.`,
`Books are silent teachers that never stop giving. They share ideas, emotions, and lessons from people across the world. A single page can change your mood or teach you something new. Reading opens doors to imagination, creativity, and knowledge. Every time you read, your mind travels to new places without leaving your chair. The more you read, the more you understand people, cultures, and the power of words.`,
`Success comes to those who stay consistent, not to those who work hard once and stop. Even small steps every day can lead to great achievements. Focus on your goals, ignore distractions, and keep moving forward with patience. Success is not a sudden event, but a journey built through discipline and dedication. Learn from mistakes, celebrate small wins, and always believe in your own progress.`,
`Technology makes life easier, faster, and more connected than ever. We can talk to anyone across the world in seconds, share ideas instantly, and learn almost anything online. But it is important to use technology wisely and not let it control us. Taking breaks from screens helps refresh the mind and body. Balance is the key to enjoying all the benefits technology offers without losing peace of mind.`,
`A healthy lifestyle begins with good habits. Eating balanced meals, drinking enough water, and sleeping well help the body stay strong. Exercise keeps the heart active and the mind clear. Avoid stress by spending time with people you care about and doing things you enjoy. Health is not only about the body but also about keeping a happy and calm mind.`,
`Music has the power to touch the soul and express emotions that words cannot. A song can make you smile, cry, or feel inspired. Different instruments create harmony that connects deeply with the heart. Listening to soft tunes in the morning or calm melodies at night brings relaxation and joy. Music reminds us that beauty can exist even in silence.`,
`Communication is the bridge between people. Clear and honest communication builds trust and removes confusion. Listening carefully is just as important as speaking clearly. When we respect others opinions and express our thoughts calmly, relationships grow stronger. Every good connection begins with understanding and ends with peace.`,
`Time is the most valuable gift you have. Once it passes, you can never get it back. Use every moment wisely, whether it is for learning, working, or resting. Planning your day helps reduce stress and increases productivity. Time management is not about doing more things, but about doing important things with focus and care.`,
`Confidence grows when you believe in your ability to learn and improve. Do not fear mistakes because they are signs that you are trying. Every time you fail, you discover what does not work, and that brings you closer to success. Speak positively to yourself and remember that confidence is built through experience, not luck.`,
`Travel teaches lessons that books cannot. Meeting new people, seeing new places, and tasting different foods expand your understanding of the world. Every journey adds stories to your life. Traveling also helps you appreciate what you already have at home. It is one of the best ways to grow and learn about life.`,
`Patience is a quiet strength that helps you stay calm even when things take time. Many people rush toward success, but the best results come to those who wait and keep working. When you are patient, you see things more clearly and make better decisions. The more patient you are, the more peaceful your mind becomes.`,
`A positive attitude can change your entire day. When you focus on what is good instead of what is missing, you feel lighter and happier. Positivity does not mean ignoring problems, but facing them with hope. Small acts of kindness, gratitude, and laughter can make even difficult days brighter.`,
`Teamwork turns individual effort into shared success. When people work together with respect and communication, great results follow. Each person brings unique ideas, and cooperation helps turn those ideas into reality. Good teams listen, support, and celebrate together. Unity always leads to strength.`,
`Discipline is the secret behind long term success. It means doing what needs to be done even when you do not feel like it. A disciplined person keeps promises, follows plans, and stays focused. Discipline builds habits, and habits shape your future. Without discipline, even the best goals remain dreams.`,
`Gratitude is a powerful feeling that changes how you see life. When you thank people, situations, or even small moments, you create happiness inside. Gratitude turns ordinary days into special memories. It teaches you to notice what is already good and helps remove negative thoughts from your mind.`,
`Curiosity keeps the mind young and active. Asking questions and exploring new topics helps you grow smarter and more creative. Every invention started with someone’s curiosity. Never stop learning because knowledge opens endless doors and brings confidence. Stay curious about everything around you.`,
`Helping others gives deep satisfaction that no money can buy. A small act of kindness can change someone’s day. Whether it is sharing time, advice, or support, helping creates connection and spreads joy. The more you give, the richer your heart becomes. Kindness is the language that everyone understands.`,
`Dreams give direction and meaning to life. When you dream big, you challenge yourself to go beyond limits. Hard work turns dreams into reality. Keep your dreams alive by taking small steps each day. Even if progress is slow, stay consistent and never lose faith. Every dreamer becomes an achiever through courage and effort.`
];

const sentenceEl = document.getElementById('sentence');
const inputEl = document.getElementById('input');
const timeEl = document.getElementById('time');
const wpmEl = document.getElementById('wpm');
const correctEl = document.getElementById('correct');
const mistakesEl = document.getElementById('mistakes');
const accuracyEl = document.getElementById('accuracy');
const charsEl = document.getElementById('chars');
const restartBtn = document.getElementById('restart');
const timeSelect = document.getElementById('timeSelect');
const toggleMode = document.getElementById('toggleMode');
const progressBar = document.getElementById('progressBar');

let totalTime = parseInt(timeSelect.value);
let time = totalTime;
let timer = null;
let started = false;
let currentSentence = '';
let words = [];
let currentWordIndex = 0;

// Get random sentence
function getRandomSentence() {
    return sentences[Math.floor(Math.random() * sentences.length)];
}

// Display sentence as words
function displaySentence() {
    sentenceEl.innerHTML = '';
    words = currentSentence.split(' ');
    words.forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word + ' '; // preserve space
        span.classList.add('word');
        if(index === 0) span.classList.add('current-word');
        sentenceEl.appendChild(span);
    });
    currentWordIndex = 0;
}

// Start timer
function startTimer() {
    if(!started) {
        started = true;
        timer = setInterval(() => {
            time--;
            timeEl.textContent = time;
            updateProgressBar();
            if(time <= 0) {
                clearInterval(timer);
                inputEl.disabled = true;
            }
        }, 1000);
    }
}

// Update progress bar
function updateProgressBar() {
    const elapsed = totalTime - time;
    const progress = (elapsed / totalTime) * 100;
    progressBar.style.width = progress + '%';
}

// Update words highlighting
function updateWords() {
    const typed = inputEl.value.trim();
    const typedWords = typed.split(' ');

    let mistakes = 0;
    let correctWordsCount = 0;

    words.forEach((word, index) => {
        const span = sentenceEl.children[index];
        span.classList.remove('correct', 'incorrect', 'current-word');

        if(index < typedWords.length){
            if(typedWords[index] === word){
                span.classList.add('correct');
                correctWordsCount++;
            } else {
                span.classList.add('incorrect');
                mistakes++;
            }
        }

        if(index === typedWords.length){
            span.classList.add('current-word'); // current typing word
        }
    });

    correctEl.textContent = correctWordsCount;
    mistakesEl.textContent = mistakes;
    charsEl.textContent = typed.length;

    calculateWPM(correctWordsCount);
    calculateAccuracy(correctWordsCount, mistakes);
}

// Calculate WPM
function calculateWPM(correctWordsCount) {
    const elapsedTime = totalTime - time;
    const wpm = elapsedTime > 0 ? Math.round((correctWordsCount / elapsedTime) * 60) : 0;
    wpmEl.textContent = wpm;
}

// Calculate Accuracy
function calculateAccuracy(correctWordsCount, mistakes) {
    const totalTyped = correctWordsCount + mistakes;
    const accuracy = totalTyped > 0 ? Math.round((correctWordsCount / totalTyped) * 100) : 100;
    accuracyEl.textContent = accuracy;
}

// Reset test
function resetTest() {
    clearInterval(timer);
    totalTime = parseInt(timeSelect.value);
    time = totalTime;
    timeEl.textContent = time;
    inputEl.value = '';
    wpmEl.textContent = 0;
    correctEl.textContent = 0;
    mistakesEl.textContent = 0;
    accuracyEl.textContent = 100;
    charsEl.textContent = 0;
    progressBar.style.width = '0%';
    started = false;
    inputEl.disabled = false;
    currentSentence = getRandomSentence();
    displaySentence();
}

inputEl.addEventListener('input', () => {
    startTimer();
    updateWords();
});

restartBtn.addEventListener('click', () => {
    resetTest();
    inputEl.focus(); // ✅ ensures typing starts right after restart
});

timeSelect.addEventListener('change', resetTest);

toggleMode.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    toggleMode.textContent = document.body.classList.contains('dark') ? 'Light Mode' : 'Dark Mode';
});

// Disable copy/paste
inputEl.addEventListener('paste', (e) => e.preventDefault());
inputEl.addEventListener('copy', (e) => e.preventDefault());

// Initialize
currentSentence = getRandomSentence();
displaySentence();