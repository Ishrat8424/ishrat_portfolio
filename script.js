
        // Initialize Lucide Icons
        lucide.createIcons();

        // Custom Cursor Motion Logic
        const cursor = document.getElementById('custom-cursor');
        const follower = document.getElementById('cursor-follower');
        
        let mouseX = 0, mouseY = 0; 
        let ballX = 0, ballY = 0;   
        let lastScrollY = 0;        
        const speed = 0.15; 

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.opacity = 1;
            follower.style.opacity = 1;
        });

        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = 0;
            follower.style.opacity = 0;
        });

        function animateCursor() {
            ballX += (mouseX - ballX) * speed;
            ballY += (mouseY - ballY) * speed;
            const scrollDelta = window.scrollY - lastScrollY;
            lastScrollY = window.scrollY;
            cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
            const stretch = Math.min(Math.abs(scrollDelta) * 0.1, 1.5);
            follower.style.transform = `translate3d(${ballX - 14}px, ${ballY - 14}px, 0) scaleY(${1 + stretch})`;
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Certificate Fullscreen Logic
        const imageModal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        const closeModal = document.getElementById('closeModal');

        document.querySelectorAll('.cert-item').forEach(item => {
            item.addEventListener('click', () => {
                const imgSrc = item.querySelector('img').src;
                modalImg.src = imgSrc;
                imageModal.classList.remove('hidden');
                setTimeout(() => imageModal.classList.add('active'), 10);
            });
        });

        const hideModal = () => {
            imageModal.classList.remove('active');
            setTimeout(() => {
                imageModal.classList.add('hidden');
                modalImg.src = '';
            }, 300);
        };

        closeModal.addEventListener('click', hideModal);
        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) hideModal();
        });

        // Typewriter Effect
        const typewriterElement = document.getElementById('typewriter');
        const phrases = ["Web Developer", "Data Scientist"];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 150;

        function type() {
            const currentPhrase = phrases[phraseIndex];
            if (isDeleting) {
                typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 80;
            } else {
                typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 150;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typeSpeed = 1500;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 400;
            }
            setTimeout(type, typeSpeed);
        }
        window.addEventListener('load', type);

        // Navbar Scroll Logic
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                navbar.classList.add('bg-black/80', 'py-2.5', 'backdrop-blur-md');
                navbar.classList.remove('py-4');
            } else {
                navbar.classList.remove('bg-black/80', 'py-2.5', 'backdrop-blur-md');
                navbar.classList.add('py-4');
            }
        });

        // REVEAL ANIMATIONS
        const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    const bars = entry.target.querySelectorAll('.skill-bar-fill');
                    bars.forEach(bar => { bar.style.width = bar.getAttribute('data-width'); });
                } else {
                    entry.target.classList.remove('active');
                    const bars = entry.target.querySelectorAll('.skill-bar-fill');
                    bars.forEach(bar => { bar.style.width = '0%'; });
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

        // Toggle Logic
        const toggleBtn = (btnId, itemsClass, textId, iconId) => {
            const btn = document.getElementById(btnId);
            if (!btn) return;
            const items = document.querySelectorAll(itemsClass);
            const text = document.getElementById(textId);
            const icon = document.getElementById(iconId);
            let expanded = false;
            btn.addEventListener('click', () => {
                expanded = !expanded;
                items.forEach(item => {
                    if (expanded) { 
                        item.classList.remove('hidden'); 
                        revealObserver.observe(item);
                    }
                    else { 
                        item.classList.add('hidden'); 
                        item.classList.remove('active'); 
                    }
                });
                text.innerText = expanded ? "Show Less" : "Show More";
                icon.style.transform = expanded ? "rotate(180deg)" : "rotate(0deg)";
            });
        };
        toggleBtn('toggleCertBtn', '.more-cert', 'btnText', 'btnIcon');
        toggleBtn('toggleProjectsBtn', '.more-project', 'projBtnText', 'projBtnIcon');

        // Mobile Menu
        const menuBtn = document.getElementById('menuBtn');
        const closeMenu = document.getElementById('closeMenu');
        const mobileMenu = document.getElementById('mobileMenu');
        menuBtn.addEventListener('click', () => { mobileMenu.classList.remove('hidden'); setTimeout(() => mobileMenu.classList.remove('opacity-0'), 10); });
        closeMenu.addEventListener('click', () => { mobileMenu.classList.add('opacity-0'); setTimeout(() => mobileMenu.classList.add('hidden'), 300); });

        // Form
       document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const form = e.target;
    const data = new FormData(form);

    btn.disabled = true; 
    btn.innerText = 'Sending...';

    const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
        btn.innerText = 'Message Sent!'; 
        btn.classList.add('bg-green-600'); 
        form.reset();
    } else {
        btn.innerText = 'Error! Try again.';
        btn.disabled = false;
    }
});


