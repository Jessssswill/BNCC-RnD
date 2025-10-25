document.addEventListener('DOMContentLoaded', () => {

    const cards = document.querySelectorAll('.content-block');
    const maxRotate = 8;

    cards.forEach((card) => {
        card.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)';
        
        card.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = card.getBoundingClientRect();
            const mouseX = e.clientX - left;
            const mouseY = e.clientY - top;
            const xPercent = (mouseX / width) - 0.5;
            const yPercent = (mouseY / height) - 0.5;
            const rotateX = maxRotate * yPercent * -1;
            const rotateY = maxRotate * xPercent;

            card.style.transform = `
                perspective(1500px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                scale(1.05)
                translateZ(20px)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `
                perspective(1500px) 
                rotateX(0deg) 
                rotateY(0deg) 
                scale(1)
                translateZ(0px)
            `;
        });
    });

    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); 
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const elementsToAnimate = document.querySelectorAll('.animate-in');

    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

    const bubbleBg = document.querySelector('.bubble-background');

    if (bubbleBg) {
        window.addEventListener('mousemove', (e) => {
            const { innerWidth, innerHeight } = window;
            const clientX = e.clientX;
            const clientY = e.clientY;

            document.documentElement.style.setProperty('--x', clientX + 'px');
            document.documentElement.style.setProperty('--y', clientY + 'px');

            const xPercent = (clientX / innerWidth) - 0.5; 
            const yPercent = (clientY / innerHeight) - 0.5;
            const maxMove = -30; 
            const xMove = xPercent * maxMove;
            const yMove = yPercent * maxMove;

            bubbleBg.style.transform = `translate(${xMove}px, ${yMove}px)`;
        });
    }

});