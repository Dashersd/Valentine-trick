document.addEventListener("DOMContentLoaded", () => {
    const btnYes = document.getElementById("btn-yes");
    const btnNo = document.getElementById("btn-no");
    const mainTitle = document.getElementById("main-title");
    const mainSubtitle = document.getElementById("main-subtitle");
    const mainGif = document.getElementById("main-gif");
    const nameInput = document.getElementById("name-input");
    const moodButtons = document.querySelectorAll(".mood-selector button");
    const musicControl = document.getElementById("music-control");
    const bgMusic = document.getElementById("bg-music");
    const particlesContainer = document.getElementById("particles-container");
    const letterModal = document.getElementById("letter-modal");
    const closeLetterBtn = document.getElementById("close-letter");
    const letterDate = document.getElementById("letter-date");
    const letterName = document.getElementById("letter-name");

    let noClickCount = 0;
    let yesBtnScale = 1;
    let musicPlaying = false;

    // Fun phrases to show when the "No" button escapes
    const noPhrases = [
        "EHHH? 😳",
        "Nooo pls 😭",
        "Waittt 🥺",
        "I brought snacks 🍓",
        "Give me a chance! 🥺",
        "Don't do it... 💔",
        "I'll be extra good 🥺",
        "Are you sure? 😭"
    ];

    // Happy GIF URL
    const happyGifUrl = "https://media.giphy.com/media/1hqb8LwPS2xCNCpWH8/giphy.gif";
    // Preload happy gif so it switches instantly
    const img = new Image();
    img.src = happyGifUrl;

    // --- Background Particles ---
    function createParticle() {
        if (!particlesContainer) return;
        const type = Math.random() > 0.5 ? 'heart' : 'sparkle';
        const el = document.createElement("div");
        el.className = type === 'heart' ? 'floating-heart' : 'floating-sparkle';
        el.innerHTML = type === 'heart' ? (Math.random() > 0.5 ? '💖' : '💕') : '✨';

        // Random horizontal positions
        el.style.left = Math.random() * 100 + "vw";
        // Random duration between 4s and 7s
        el.style.animationDuration = (Math.random() * 3 + 4) + "s";

        particlesContainer.appendChild(el);

        // Remove particle from DOM after it floats up
        setTimeout(() => el.remove(), 7000);
    }
    // Add a new particle every 500ms
    setInterval(createParticle, 500);


    // --- Name Input / Title Updater ---
    nameInput.addEventListener("input", (e) => {
        let name = e.target.value.trim();
        if (name) {
            mainTitle.innerHTML = `Will you be my Valentine, <span style="color:var(--text-color)">${name}</span>? 💌`;
        } else {
            mainTitle.innerHTML = `Will you be my Valentine? 💌`;
        }
    });

    // --- Mood Selector ---
    moodButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            moodButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            document.body.className = `mood-${btn.dataset.mood}`;
        });
    });

    // --- Music Control ---
    function toggleMusic() {
        if (!musicPlaying) {
            bgMusic.muted = false; // Unmute for actual playback
            bgMusic.play().then(() => {
                musicControl.innerText = "🔊 Playing Music";
                musicPlaying = true;
            }).catch(e => console.log("Audio play failed, browser policy issue:", e));
        } else {
            bgMusic.pause();
            musicControl.innerText = "🎵 Play Music";
            musicPlaying = false;
        }
    }

    musicControl.addEventListener("click", toggleMusic);

    // Auto-play attempt on first user interaction (since most browsers block pure autoplay)
    const startAudioOnInteraction = () => {
        if (!musicPlaying) {
            bgMusic.muted = false;
            bgMusic.play().then(() => {
                musicControl.innerText = "🔊 Playing Music";
                musicPlaying = true;
                // Remove listeners after success
                document.removeEventListener('click', startAudioOnInteraction);
                document.removeEventListener('touchstart', startAudioOnInteraction);
            }).catch(() => {
                // Keep listeners if failed (e.g. didn't actually interact with anything meaningful)
            });
        }
    };

    document.addEventListener('click', startAudioOnInteraction);
    document.addEventListener('touchstart', startAudioOnInteraction);

    // --- No Button Escape Logic ---
    function moveNoButton() {
        // Move to body to prevent .card's transform/backdrop-filter from clipping fixed position
        if (btnNo.parentNode !== document.body) {
            const rect = btnNo.getBoundingClientRect();
            btnNo.style.transition = "none"; // Disable transition before moving
            document.body.appendChild(btnNo);
            btnNo.style.position = "fixed";
            btnNo.style.left = `${rect.left}px`;
            btnNo.style.top = `${rect.top}px`;
            void btnNo.offsetWidth; // Force reflow
            btnNo.style.transition = "all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)";
        }

        // Calculate random position inside viewport minus button dimensions
        // Keep a safe margin (40px)
        const btnWidth = btnNo.offsetWidth || 100;
        const btnHeight = btnNo.offsetHeight || 50;
        const limitX = Math.max(window.innerWidth - btnWidth - 40, 0);
        const limitY = Math.max(window.innerHeight - btnHeight - 40, 0);

        const x = Math.random() * limitX;
        const y = Math.random() * limitY;

        btnNo.style.left = `${x}px`;
        btnNo.style.top = `${y}px`;

        // Screen shake effect
        document.body.classList.remove("shake-effect");
        void document.body.offsetWidth; // Trigger reflow to restart animation
        document.body.classList.add("shake-effect");

        // Grow Yes button slightly each time
        yesBtnScale += 0.15;
        btnYes.style.transform = `scale(${yesBtnScale})`;

        // Show a tiny popup text
        showTinyPopup(x, y);
        noClickCount++;
    }

    function showTinyPopup(x, y) {
        const popup = document.createElement("div");
        popup.className = "tiny-popup";
        popup.innerText = noPhrases[Math.floor(Math.random() * noPhrases.length)];

        // Position it somewhat randomly near the old spot
        popup.style.left = `${x + 20}px`;
        popup.style.top = `${y - 30}px`;
        document.body.appendChild(popup);

        setTimeout(() => popup.remove(), 1000); // Wait for transition fade to finish
    }

    // Trigger on touch/click
    btnNo.addEventListener("click", (e) => {
        e.preventDefault();
        moveNoButton();
    });


    // --- Yes Button Hover Particles ---
    btnYes.addEventListener("mousemove", (e) => {
        if (Math.random() > 0.8) {
            const heart = document.createElement("div");
            heart.innerText = "💖";
            heart.style.position = "fixed";
            heart.style.left = (e.clientX - 10) + "px";
            heart.style.top = (e.clientY - 10) + "px";
            heart.style.pointerEvents = "none";
            heart.style.fontSize = "1rem";
            heart.style.zIndex = 100;
            heart.style.transition = "all 0.5s ease-out";
            document.body.appendChild(heart);

            // Allow DOM to update before applying translate
            requestAnimationFrame(() => {
                heart.style.transform = `translate(${Math.random() * 40 - 20}px, -${Math.random() * 50 + 20}px)`;
                heart.style.opacity = "0";
            });

            setTimeout(() => heart.remove(), 500);
        }
    });


    // --- New Flow Logic ---
    const mainButtons = document.getElementById("main-buttons");
    const optionsContainer = document.getElementById("options-container");
    const flowerContainer = document.getElementById("flower-container");
    const btnLetter = document.getElementById("btn-letter");
    const btnFlowers = document.getElementById("btn-flowers");
    const btnBack = document.getElementById("btn-back");

    // --- Yes Button Click Logic ---
    btnYes.addEventListener("click", () => {
        // Update content to Happy State
        mainGif.src = happyGifUrl;
        mainTitle.innerText = "Yayyy!! Choose your surprise 💕✨";
        mainSubtitle.innerText = "";

        // Hide the original buttons, input, and show the options
        mainButtons.classList.add("hidden");
        document.querySelector(".name-input-section").classList.add("hidden");
        optionsContainer.classList.remove("hidden");

        // Start music if not started already
        if (!musicPlaying) {
            bgMusic.play().catch(() => console.log("Audio not played automatically due to browser policy"));
            musicControl.innerText = "🔊 Playing Music";
            musicPlaying = true;
        }

        triggerConfettiBurst();
    });

    // --- Option 1: Letters ---
    btnLetter.addEventListener("click", () => {
        // Confetti Burst!
        triggerConfettiBurst();

        // Update card immediately
        mainTitle.innerText = "A special letter just for you! 💌💕";

        // Show Sweet Modal Letter after a short delay
        setTimeout(() => {
            const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            letterDate.innerText = `Date: ${today}`;
            letterName.innerText = nameInput.value.trim() || "My Cutie";
            letterModal.classList.remove("hidden");
        }, 800);
    });

    // --- Option 2: Flowers ---
    btnFlowers.addEventListener("click", () => {
        optionsContainer.classList.add("hidden");
        flowerContainer.classList.remove("hidden");
        mainTitle.innerText = "Just for you... 🥺✨";
        mainGif.classList.add("hidden");

        // Force reflow/restart of CSS animations by cloning and replacing
        const oldFlower = document.querySelector('.flower');
        const newFlower = oldFlower.cloneNode(true);
        oldFlower.parentNode.replaceChild(newFlower, oldFlower);
    });

    // --- Back Button ---
    btnBack.addEventListener("click", () => {
        flowerContainer.classList.add("hidden");
        optionsContainer.classList.remove("hidden");
        mainTitle.innerText = "Yayyy!! Choose your surprise 💕✨";
        mainGif.classList.remove("hidden");
    });

    // --- Modal Logic ---
    closeLetterBtn.addEventListener("click", () => {
        letterModal.classList.add("hidden");
        // Keep shooting confetti occasionally
        setInterval(triggerConfettiBurst, 5000);
    });

    // --- Confetti helper function ---
    function triggerConfettiBurst() {
        if (typeof confetti !== 'undefined') {
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#ffc0cb', '#ff69b4', '#fffafa', '#ff1493'],
                disableForReducedMotion: true
            });
            setTimeout(() => {
                confetti({
                    particleCount: 100,
                    spread: 120,
                    origin: { y: 0.3 },
                    colors: ['#ffc0cb', '#ff69b4', '#fffafa', '#ff1493'],
                    disableForReducedMotion: true
                });
            }, 400);
        }
    }

    // --- PWA & Install Message Logic ---
    const installBanner = document.getElementById("install-banner");
    const installInstructions = document.getElementById("install-instructions");
    const btnInstall = document.getElementById("btn-install");
    const btnCloseInstall = document.getElementById("btn-close-install");
    let deferredPrompt;

    // Register Service Worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(reg => console.log('Service Worker registered!'))
                .catch(err => console.log('Service Worker registration failed:', err));
        });
    }

    // Detect if already installed/standalone
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

    // Detect Device OS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isAndroid = /Android/.test(navigator.userAgent);

    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;

        // Only show if not already installed and on mobile
        if (!isStandalone && (isAndroid || isIOS)) {
            showInstallBanner('android');
        }
    });

    function showInstallBanner(os) {
        if (isStandalone) return;

        installBanner.classList.remove("hidden");

        if (os === 'ios') {
            installInstructions.innerHTML = "Tap the <span style='font-weight:bold'>Share</span> button and then <span style='font-weight:bold'>'Add to Home Screen'</span> 🎀";
            btnInstall.classList.add("hidden"); // Can't trigger native prompt on iOS
        } else {
            installInstructions.innerText = "Install this app on your home screen for a better experience! ✨";
            btnInstall.classList.remove("hidden");
        }
    }

    // Check for iOS specifically since it doesn't support beforeinstallprompt
    if (isIOS && !isStandalone) {
        showInstallBanner('ios');
    }

    btnInstall.addEventListener('click', () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                }
                installBanner.classList.add("hidden");
                deferredPrompt = null;
            });
        }
    });

    btnCloseInstall.addEventListener('click', () => {
        installBanner.classList.add("hidden");
    });
});
