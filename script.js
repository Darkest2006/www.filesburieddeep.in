document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for fading in sections
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Random glitch effect intensifier on click
    // Glitch effect removed for Analog Theme


    // Flashlight Effect
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        document.documentElement.style.setProperty('--x', `${x}px`);
        document.documentElement.style.setProperty('--y', `${y}px`);
    });

    // Hidden Clue Interaction
    // We rely on CSS :hover interactions now, keeping the flashlight active.

    // =========================================
    // SPLASH SCREEN SEQUENCE
    // =========================================
    function initSplashSequence() {
        console.log("Initializing Splash Sequence...");
        const splashScreen = document.getElementById('splash-screen');
        const splashTitle = document.querySelector('.splash-title');
        const ueLogo = document.querySelector('.ue-logo');
        const ueTextLower = document.querySelector('.ue-text-bottom');
        const mainContainer = document.querySelector('.container');
        const loadingWheel = document.querySelector('.loading-wheel');

        if (!splashScreen || !mainContainer) return;

        // --- RESET STATE ---
        mainContainer.style.opacity = '0';

        // Title: Visible
        if (splashTitle) {
            splashTitle.style.display = 'block';
            splashTitle.style.opacity = '1';
            splashTitle.classList.remove('fade-out', 'hidden');
        }

        // Logo: Hidden
        if (ueLogo) {
            ueLogo.style.display = 'none';
            ueLogo.style.opacity = '0';
            ueLogo.classList.remove('visible', 'fade-out', 'hidden');
        }

        // Lower Text: Hidden
        if (ueTextLower) {
            ueTextLower.classList.remove('visible');
            ueTextLower.style.opacity = '0';
        }

        // Loader: Visible Initially
        if (loadingWheel) {
            loadingWheel.classList.remove('hidden');
        }

        // --- SEQUENCE ---

        // 0. Wait a moment (simulate load or just buffer), then Hide Loader & Start Sequence
        setTimeout(() => {
            console.log("0. Hiding Loader");
            if (loadingWheel) loadingWheel.classList.add('hidden'); // Fade out loader

            // 1. Hold Title for 2s (after loader hidden)
            setTimeout(() => {
                console.log("1. Fading Title");
                if (splashTitle) {
                    splashTitle.style.transition = "opacity 2s ease-out";
                    splashTitle.style.opacity = '0';
                }

                // 2. Wait for Title Fade (2s) -> Switch to Logo
                setTimeout(() => {
                    console.log("2. Swapping to Logo (Black BG)");

                    // Hard Hide Title & Loader
                    if (splashTitle) splashTitle.style.display = 'none';
                    if (loadingWheel) loadingWheel.style.display = 'none';

                    // Show Logo (Image only first)
                    if (ueLogo) {
                        ueLogo.classList.remove('hidden');
                        ueLogo.style.display = 'flex';

                        // Force Reflow
                        void ueLogo.offsetWidth;

                        // Fade In Logo Container (Image appears)
                        ueLogo.style.transition = "opacity 1s ease-in";
                        ueLogo.style.opacity = '1';

                        // 3. Wait 1s (Logo Visible) -> Fade In Text
                        setTimeout(() => {
                            console.log("3. Fading In Text");
                            if (ueTextLower) {
                                ueTextLower.style.opacity = '1';
                                ueTextLower.classList.add('visible');
                            }

                            // 4. Hold Both (2s) -> Fade Out + Scale
                            setTimeout(() => {
                                console.log("4. Fading Out Logo (Scale Effect)");

                                // Add class to trigger CSS scale transform on children
                                ueLogo.classList.add('fade-out');

                                // Fade out opacity
                                ueLogo.style.transition = "opacity 3s ease-out";
                                ueLogo.style.opacity = '0';

                                // Fade out splash screen container (background)
                                splashScreen.style.transition = "opacity 3s ease-out";
                                splashScreen.style.opacity = '0';

                                // 5a. Reveal Site (Overlap - 0.5s into fade)
                                setTimeout(() => {
                                    console.log("5a. Trigger Dust Reveal");
                                    mainContainer.classList.add('dust-reveal');
                                }, 500);

                                // 5b. Remove Splash Overlay (after full 3s fade)
                                setTimeout(() => {
                                    console.log("5b. Remove Overlay");
                                    splashScreen.style.display = 'none';
                                    mainContainer.style.opacity = '1'; // Ensure opacity stays up
                                }, 3000);

                            }, 2000);

                        }, 1000);
                    }
                }, 2000); // End Title Fade
            }, 1000); // Hold Title Time
        }, 500); // Initial Buffer
    }

    // Trigger on Full Page Load (Wait for Fonts/Images)
    window.addEventListener('load', () => {
        initSplashSequence();
    });
});
