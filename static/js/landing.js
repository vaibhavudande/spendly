// landing.js — "See how it works" video modal (vanilla JS, no dependencies)

(function () {
    const openBtn = document.getElementById('how-it-works-btn');
    const modal = document.getElementById('video-modal');
    const closeBtn = document.getElementById('video-modal-close');
    const iframe = document.getElementById('video-modal-iframe');

    if (!openBtn || !modal || !closeBtn || !iframe) return;

    const videoSrc = iframe.dataset.videoSrc;

    function openModal() {
        // Load the video only when the modal opens, and autoplay it.
        const sep = videoSrc.includes('?') ? '&' : '?';
        iframe.src = videoSrc + sep + 'autoplay=1&rel=0';

        // Locking scroll hides the scrollbar; pad the body by its width
        // so the page behind the modal doesn't jump sideways.
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.paddingRight = scrollbarWidth + 'px';

        modal.hidden = false;
        document.body.classList.add('modal-open');
        closeBtn.focus();
        document.addEventListener('keydown', onKeydown);
    }

    function closeModal() {
        // Removing the src unloads the player, so the video stops
        // completely instead of carrying on in the background.
        iframe.src = '';
        iframe.removeAttribute('src');

        modal.hidden = true;
        document.body.classList.remove('modal-open');
        document.body.style.paddingRight = '';
        document.removeEventListener('keydown', onKeydown);
        openBtn.focus();
    }

    function onKeydown(e) {
        if (e.key === 'Escape') closeModal();
    }

    openBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);

    // Clicking the dark overlay (outside the dialog box) closes the modal.
    modal.addEventListener('click', function (e) {
        if (e.target === modal) closeModal();
    });
})();
