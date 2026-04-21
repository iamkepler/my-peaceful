const themeCheckbox = document.getElementById('themeCheckbox');
const themeIcon = document.getElementById('themeIcon');
const enterBtn = document.getElementById('enterBtn');
const mainContent = document.getElementById('mainContent');
const worryInput = document.getElementById('worryInput');
const worryInputContainer = document.getElementById('worryInputContainer');
const messageOverlay = document.getElementById('messageOverlay');
const healingMessage = document.getElementById('healingMessage');
const particlesContainer = document.getElementById('particles');

const messages = [
    "别担心，月亮会替我抱抱那个疲惫的你。", "今天的云很好看，你也是。", "没关系的，你已经做得很好了，真的。", "在这片海边，允许你只做你自己。", "慢慢来，好戏都在烟火里。", "你是人间这一趟，最温柔的风景。", "所有不快乐，都会在今晚的梦里消散。", "要把心情照顾好，因为它才是你的全世界。", "晚风踩着云朵，说它也很心疼你。", "生活偶尔暗淡，但你是自带光芒的礼物。",
    "累了就睡一觉，醒来就是新的冒险。", "你值得被这世界温柔以待，毫无保留地。", "把烦恼丢进海里，它们会化作细碎的浪花。", "宇宙偶尔会漏气，所以才有了你这一抹清新。", "不必总是坚强，偶尔的脆弱也很迷人。", "别赶路，去感受路。", "希望明早叫醒你的，是温柔的阳光和好心情。", "你比你想象中更有力量，也更柔软。", "让心里的雨停一会儿，看看彩虹。", "今天辛苦了，你是最棒的小英雄。",
    "愿所有的不安，都能在这一刻被治愈。", "你很重要，不仅是对别人，更是对自己。", "世界很大，但我只希望你快乐。", "别让明天的焦虑，偷走今天的安稳。", "每一个夜晚的星光，都在为你祈祷。", "慢一点，灵魂才跟得上。", "你的善良，是这个世界最珍贵的宝藏。", "允许自己休息，这本身就是一种勇敢。", "别害怕阴影，那是因为背后有光。", "那些碎碎念，就让风带走吧。",
    "你可以失望，但别放弃那颗发光的心。", "做一个可爱的人，哪怕只是对自己可爱。", "今天的你，辛苦得闪闪发光。", "有些事想不通，那就暂时不想了。", "深呼吸，感受这一秒的宁静。", "你是宇宙中独一无二的星辰。", "把坏心情关在门外，今晚只准好梦入场。", "愿你眼里的星星，永远不会熄灭。", "没关系，你可以停下来歇一歇。", "生活虽苦，但你是甜的。",
    "把手放在胸口，感受那份独属于你的韵律。", "在这儿，你是自由的，也是安全的。", "每一个清晨海鸥的呼唤，都是在说爱你。", "你要相信，最美的故事往往在转角处。", "你不必完美，因为不完美才最生动。", "抱抱自己，跟那个努力的你说声谢谢。", "风会吹散阴霾，而你会等来花开。", "再小的光，也能照亮一隅安宁。", "做个好梦，梦里有你想见的风景。", "你是你自己的避风港。",
    "Take a deep breath; the stars are watching over you.", "You are enough, just as you are.", "It's okay to feel small sometimes.", "The tides will carry your worries away.", "Be gentle with your soul tonight.", "You've done a great job today, truly.", "Let the moonlight hug your tired heart.", "Slow down, the beauty is in the journey.", "You don't have to be perfect to be loved.", "The universe is rooting for you.",
    "Rest is a form of courage.", "Your heart is a soft place; keep it safe.", "Not all who wander are lost, take your time.", "Let the ocean breeze clear your mind.", "You are the poetry that the world needs.", "Stars can't shine without darkness.", "It’s okay to start over tomorrow.", "Listen to the rhythm of your own heart.", "You are precious, like a hidden pearl.", "Don't let yesterday take up too much of today.",
    "Peace begins with a single breath.", "The birds fly free, and so can you.", "Softness is your superpower.", "Every storm runs out of rain.", "You are stronger than your anxious thoughts.", "May your sleep be as sweet as your soul.", "The world is better because you're in it.", "Give yourself permission to just be.", "One step at a time is enough.", "Your existence is a beautiful miracle.",
    "Breathe in love, breathe out fear.", "The golden hour is waiting for you.", "You carry so much light within you.", "It’s okay to be a glowstick; sometimes we need to break to shine.", "Trust the timing of your life.", "Let go of what you cannot change.", "You are a masterpiece in progress.", "Quiet the mind, and the soul will speak.", "May you find peace in the little things.", "Your kindness is your greatest legacy.",
    "Be the sunshine in your own storm.", "The moon is a reminder that we all go through phases.", "You are braver than you believe.", "Keep your face to the sunshine.", "Flowers need time to bloom; so do you.", "You are a sky full of stars.", "Healing isn't linear, be patient with yourself.", "Everything will be okay in the end.", "Wrap yourself in kindness tonight.", "Sweet dreams, dear wanderer."
];

const shapes = {
    light: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 50 Q 35 25 50 50 Q 65 25 85 50"/></svg>`,
    dark: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"><path d="M50 15 L80 85 L15 40 L85 40 L20 85 Z"/></svg>`,
    wobblyDot: `<svg viewBox="0 0 100 100" fill="currentColor"><path d="M50 8C30 10 10 30 12 50C14 70 34 90 54 88C74 86 94 66 92 46C90 26 70 6 50 8Z" /></svg>`
};

// Background Animation
function createParticle() {
    if (!particlesContainer) return;
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    particle.innerHTML = shapes[currentTheme];
    
    const size = Math.random() * 15 + 10; 
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;
    
    const duration = Math.random() * 8 + 8; 
    particle.style.animationDuration = `${duration}s`;
    
    particlesContainer.appendChild(particle);
    setTimeout(() => particle.remove(), duration * 1000);
}

// Dialog Fade Out
function dissolveToParticles() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const rect = worryInputContainer.getBoundingClientRect();
    for (let i = 0; i < 50; i++) {
        const p = document.createElement('div');
        p.classList.add('pixel-particle');
        p.innerHTML = shapes.wobblyDot;
        p.style.color = currentTheme === 'dark' ? 'rgba(255, 213, 79, 0.6)' : 'rgba(69, 90, 100, 0.4)';
        
        const size = Math.random() * 12 + 8; 
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.left = `${rect.left + Math.random() * rect.width}px`;
        p.style.top = `${rect.top + Math.random() * rect.height}px`;
        
        p.style.animationDuration = `${Math.random() * 4 + 4}s`;
        p.style.setProperty('--tx', `${(Math.random() - 0.5) * 80}px`);
        
        particlesContainer.appendChild(p);
        setTimeout(() => p.remove(), 8000);
    }
}

function initTheme() {
    const savedTheme = localStorage.getItem('websiteTheme');
    const currentHour = new Date().getHours();
    const isDark = savedTheme === 'dark' || (!savedTheme && (currentHour >= 19 || currentHour < 6));
    
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    if (themeCheckbox) {
        themeCheckbox.checked = isDark;
        themeIcon.innerText = isDark ? '☀️' : '🌙';
    }
}

if (themeCheckbox) {
    themeCheckbox.addEventListener('change', () => {
        const isDark = themeCheckbox.checked;
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        localStorage.setItem('websiteTheme', isDark ? 'dark' : 'light');
        themeIcon.innerText = isDark ? '☀️' : '🌙';
    });
}

if (enterBtn) {
    enterBtn.addEventListener('click', () => {
        const text = worryInput.value.trim();
        if (text === "") return;

        enterBtn.disabled = true;
        enterBtn.style.opacity = "0.5";

        document.getElementById('mainTitle').classList.add('fade-soft');
        document.getElementById('mainSubtitle').classList.add('fade-soft');
        enterBtn.classList.add('fade-soft');

        worryInputContainer.classList.add('animating');

        setTimeout(() => {
            dissolveToParticles();
            worryInputContainer.style.display = "none";
        }, 600);

        setTimeout(() => {
            const randomMsg = messages[Math.floor(Math.random() * messages.length)];
            healingMessage.innerText = randomMsg;
            messageOverlay.classList.remove('hidden');
            messageOverlay.classList.add('fade-in');

            const orbContainer = document.querySelector('.star-container');
            if (orbContainer) {
                orbContainer.style.transform = "scale(1.1)";
                setTimeout(() => { orbContainer.style.transform = "scale(1)"; }, 1000);
            }

            setTimeout(() => {
                messageOverlay.classList.replace('fade-in', 'fade-out');
                document.body.style.transition = "opacity 2s ease";
                document.body.style.opacity = "0";

                setTimeout(() => {
                    window.location.href = 'menu.html';
                }, 2000);
            }, 4000);

        }, 2200);
    });
}

const exitMenuBtn = document.getElementById('exitMenuBtn');

if (exitMenuBtn) {
    exitMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        const overlay = document.getElementById('messageOverlay');
        const msgText = document.getElementById('healingMessage');
        const mainWrapper = document.getElementById('mainContent'); 

        if (overlay && msgText) {
            msgText.innerText = "Nightyyyy Babe";
            
            if (mainWrapper) {
                mainWrapper.classList.add('dream-fade-out');
            }
            
            if (particlesContainer) {
                particlesContainer.style.transition = "opacity 2s ease";
                particlesContainer.style.opacity = "0";
            }

            overlay.classList.remove('hidden');
            setTimeout(() => {
                overlay.classList.add('fade-in');
            }, 50);
            setTimeout(() => {
                overlay.classList.replace('fade-in', 'fade-out');
                
                setTimeout(() => {
                    document.body.style.backgroundColor = "var(--bg-bot)";
                    window.location.href = 'index.html';
                }, 1500);
            }, 3000);
        } else {
            window.location.href = 'index.html';
        }
    });
}

initTheme();
setInterval(createParticle, 600); 