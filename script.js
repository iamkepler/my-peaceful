/**
 * 屿你 - 最终整合版 Script
 */

const getEl = (id) => document.getElementById(id);

// DOM 元素获取
const themeCheckbox = getEl('themeCheckbox');
const themeIcon = getEl('themeIcon');
const muteBtn = getEl('muteBtn');
const enterBtn = getEl('enterBtn');
const mainContent = getEl('mainContent');
const worryInput = getEl('worryInput');
const worryInputContainer = getEl('worryInputContainer');
const messageOverlay = getEl('messageOverlay');
const healingMessage = getEl('healingMessage');
const particlesContainer = getEl('particles');
const bgMusic = getEl('bgMusic');


const messages = [
    "别担心，月亮会替我抱抱那个疲惫的你。", "今天的云很好看，你也是。", 
    "没关系的，你已经做得很好了，真的。", "在这片海边，允许你只做你自己。", 
    "要把心情照顾好，因为它才是你的全世界。", "晚风踩着云朵，说它也很心疼你。",
    "Take a deep breath; the stars are watching over you.", 
    "You are enough, just as you are.", "The universe is rooting for you.",
    "Rest is a form of courage.", "Your heart is a soft place; keep it safe."
];

const shapes = {
    light: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 50 Q 35 25 50 50 Q 65 25 85 50"/></svg>`,
    dark: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"><path d="M50 15 L80 85 L15 40 L85 40 L20 85 Z"/></svg>`,
    wobblyDot: `<svg viewBox="0 0 100 100" fill="currentColor"><path d="M50 8C30 10 10 30 12 50C14 70 34 90 54 88C74 86 94 66 92 46C90 26 70 6 50 8Z" /></svg>`
};

// ============================================================
// 2. 主题管理 (Theme Management)
// ============================================================
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

// ============================================================
// 3. 音乐逻辑与衔接 (Music & Continuity)
// ============================================================

// 获取记忆音量，默认 0.3
function getStoredVolume() {
    const vol = localStorage.getItem('userVolume');
    return vol !== null ? parseFloat(vol) : 0.3;
}

function updateMuteIcon(vol) {
    if (!muteBtn) return;
    muteBtn.innerText = (vol === 0) ? '🔇' : '🔊';
}

function handleMusicContinuity() {
    if (!bgMusic) return;

    const savedTime = localStorage.getItem('bgMusicTime');
    const isMusicActive = localStorage.getItem('isMusicActive');
    const targetVol = getStoredVolume();

    if (isMusicActive === 'true') {
        if (savedTime) bgMusic.currentTime = parseFloat(savedTime);
        bgMusic.volume = targetVol;
        updateMuteIcon(targetVol);

        const resumeAudio = () => {
            bgMusic.play().catch(() => {});
            document.removeEventListener('click', resumeAudio);
            document.removeEventListener('touchstart', resumeAudio);
        };
        document.addEventListener('click', resumeAudio);
        document.addEventListener('touchstart', resumeAudio);
        bgMusic.play().catch(() => {});
    }
}

if (muteBtn && bgMusic) {
    muteBtn.addEventListener('click', () => {
        if (bgMusic.volume > 0) {
            localStorage.setItem('userVolume', '0');
            bgMusic.volume = 0;
            updateMuteIcon(0);
        } else {
            const restoreVol = 0.3; 
            localStorage.setItem('userVolume', restoreVol.toString());
            bgMusic.volume = restoreVol;
            updateMuteIcon(restoreVol);
            bgMusic.play().catch(() => {});
        }
    });
}

window.addEventListener('beforeunload', () => {
    if (bgMusic) {
        localStorage.setItem('bgMusicTime', bgMusic.currentTime);
        localStorage.setItem('userVolume', bgMusic.volume.toString());
    }
});

// ============================================================
// 4. 粒子系统 (Particle System)
// ============================================================
function fadeInAudio(audio, targetVolume) {
    if (!audio) return;
    audio.volume = 0;
    audio.play().catch(() => {});
    let vol = 0;
    const interval = setInterval(() => {
        if (vol < targetVolume) {
            vol += 0.02;
            audio.volume = Math.min(vol, targetVolume);
        } else {
            clearInterval(interval);
        }
    }, 100);
}

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

// Landing Page 进入按钮逻辑
if (enterBtn) {
    enterBtn.addEventListener('click', () => {
        if (!worryInput || worryInput.value.trim() === "") return;
        if (bgMusic) {
            fadeInAudio(bgMusic, getStoredVolume());
            localStorage.setItem('isMusicActive', 'true');
        }
        enterBtn.disabled = true;
        // 粒子消失等后续动画...
        setTimeout(() => window.location.href = 'menu.html', 6000);
    });
}

// ============================================================
// 5. 交互逻辑 (Interaction)
// ============================================================

if (enterBtn) {
    enterBtn.addEventListener('click', () => {
        const text = worryInput.value.trim();
        if (text === "") return;

        if (bgMusic) {
            const targetVol = getStoredVolume();
            fadeInAudio(bgMusic, targetVol);
            localStorage.setItem('isMusicActive', 'true');
        }

        enterBtn.disabled = true;
        
        const fadeElements = ['mainTitle', 'mainSubtitle', 'enterBtn'];
        fadeElements.forEach(id => {
            const el = getEl(id);
            if (el) el.classList.add('fade-soft');
        });

        if (worryInputContainer) worryInputContainer.classList.add('animating');

        setTimeout(() => {
            dissolveToParticles();
            if (worryInputContainer) worryInputContainer.style.display = "none";
        }, 600);

        setTimeout(() => {
            if (healingMessage && messageOverlay) {
                healingMessage.innerText = messages[Math.floor(Math.random() * messages.length)];
                messageOverlay.classList.remove('hidden');
                messageOverlay.classList.add('fade-in');

                setTimeout(() => {
                    messageOverlay.classList.replace('fade-in', 'fade-out');
                    document.body.style.transition = "opacity 2s ease";
                    document.body.style.opacity = "0";

                    setTimeout(() => {
                        if (bgMusic) localStorage.setItem('bgMusicTime', bgMusic.currentTime);
                        window.location.href = 'menu.html';
                    }, 2000);
                }, 4000);
            }
        }, 2200);
    });
}

const exitMenuBtn = getEl('exitMenuBtn');

if (exitMenuBtn) {
    exitMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const overlay = getEl('messageOverlay');
        const msg = getEl('healingMessage');

        if (overlay && msg) {
            msg.innerText = "Nightyyyy Babe";
            
            overlay.classList.remove('hidden');
            void overlay.offsetWidth; 
            overlay.classList.add('fade-in');

            document.body.classList.add('dream-fade-out');

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3500); 
        }
    });
}

// ============================================================
// 6. 初始化启动
// ============================================================
initTheme();
handleMusicContinuity();
if (particlesContainer) setInterval(createParticle, 600);

window.addEventListener('beforeunload', () => {
    if (bgMusic) {
        localStorage.setItem('bgMusicTime', bgMusic.currentTime);
        localStorage.setItem('userVolume', bgMusic.volume.toString());
    }
});