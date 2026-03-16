     lucide.createIcons();

        const sideNav = document.getElementById('sideNav');
        const navOverlay = document.getElementById('navOverlay');
        function toggleSidebar() { sideNav.classList.toggle('open'); navOverlay.classList.toggle('active'); document.body.style.overflow = sideNav.classList.contains('open') ? 'hidden' : 'auto' }

        const nav = document.getElementById('mainNav');
        const logoText = document.getElementById('logoText');
        const navIcons = document.querySelectorAll('.nav-icon');

        function updateNavStyles() {
            const scrolled = window.scrollY > 40;
            if (scrolled) {
                nav.classList.add('nav-scrolled');
                logoText.classList.replace('text-white', 'text-slate-900');
                navIcons.forEach(i => i.classList.replace('text-white', 'text-slate-700'));
            } else {
                nav.classList.remove('nav-scrolled');
                logoText.classList.replace('text-slate-900', 'text-white');
                navIcons.forEach(i => i.classList.replace('text-slate-700', 'text-white'));
            }
        }

        window.addEventListener('scroll', updateNavStyles);

        let currentSlide = 0;
        const slides = document.querySelectorAll('.hero-slide');
        const dots = document.querySelectorAll('.progress-dot');
        const slideCount = slides.length;
        let slideInterval;

        function showSlide(n) {
            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            currentSlide = (n + slideCount) % slideCount;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function nextSlide() { showSlide(currentSlide + 1) }

        function goToSlide(n) { clearInterval(slideInterval); showSlide(n); startAutoPlay() }

        function startAutoPlay() { slideInterval = setInterval(nextSlide, 5000) }

        startAutoPlay();
        updateNavStyles();